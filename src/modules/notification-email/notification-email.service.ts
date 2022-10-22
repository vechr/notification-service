import {
  ForbiddenException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import { NotificationEmail } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import AuditService from '../audits/audit.service';
import { AuditAction } from '../audits/types/audit-enum.type';
import {
  CreateNotificationEmailDto,
  DeleteEmailNotificationEventDto,
  UpdateNotificationEmailDto,
} from './dto';
import { TListNotificationEmailRequestQuery } from './requests/list-notification-email.request';
import log from '@/shared/utils/log.util';
import { UnknownException } from '@/shared/exceptions/common.exception';
import PrismaService from '@/prisma/prisma.service';
import { IContext } from '@/shared/interceptors/context.interceptor';
import { parseMeta, parseQuery } from '@/shared/utils/query.util';
import { Auditable } from '@/shared/types/auditable.type';

@Injectable()
export class NotificationEmailService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('NATS_SERVICE') private readonly notificationClient: ClientNats,
    private readonly auditService: AuditService,
  ) {}

  async list(ctx: IContext): Promise<{
    result: NotificationEmail[];
    meta: { count: number; total: number; page: number; totalPage: number };
  }> {
    console.log(ctx);
    const query = ctx.params.query as TListNotificationEmailRequestQuery;

    const { limit, offset, order, page } =
      parseQuery<TListNotificationEmailRequestQuery>(query);

    const selectOptions = {
      orderBy: order,
      where: query.filters.field,
    };

    const pageOptions = {
      take: limit,
      skip: offset,
    };

    const [total, notificationEmail] = await this.prisma.$transaction([
      this.prisma.notificationEmail.count(selectOptions),
      this.prisma.notificationEmail.findMany({
        ...pageOptions,
        ...selectOptions,
      }),
    ]);

    const meta = parseMeta<NotificationEmail>({
      result: notificationEmail,
      total,
      page,
      limit,
    });

    return {
      result: notificationEmail,
      meta,
    };
  }

  async createNotificationEmail(
    ctx: IContext,
    dto: CreateNotificationEmailDto,
  ): Promise<NotificationEmail> {
    try {
      const result = await this.prisma.notificationEmail.create({
        data: {
          ...dto,
        },
      });

      await this.auditService.sendAudit(ctx, AuditAction.CREATED, {
        id: result.id,
        incoming: result,
        auditable: Auditable.EMIAL_NOTIFICATION,
      });

      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        log.error(error.message);
        if (error.code === 'P2002') {
          throw new ForbiddenException({
            code: HttpStatus.FORBIDDEN.toString(),
            message: 'Notification Email already Exists!',
          });
        } else {
          throw new UnknownException({
            code: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
            message: `Error unexpected!`,
            params: { exception: error.message },
          });
        }
      }
      throw error;
    }
  }

  async updateNotificationEmailById(
    ctx: IContext,
    notificationEmailId: string,
    dto: UpdateNotificationEmailDto,
  ): Promise<NotificationEmail> {
    try {
      const notificationEmail = await this.prisma.notificationEmail.findUnique({
        where: {
          id: notificationEmailId,
        },
      });

      if (!notificationEmail) {
        throw new NotFoundException({
          code: HttpStatus.NOT_FOUND.toString(),
          message: 'Notification Email is not found!',
        });
      }

      const result = await this.prisma.notificationEmail.update({
        where: {
          id: notificationEmailId,
        },
        data: {
          ...dto,
        },
      });

      await this.auditService.sendAudit(ctx, AuditAction.UPDATED, {
        id: result.id,
        prev: notificationEmail,
        incoming: result,
        auditable: Auditable.EMIAL_NOTIFICATION,
      });

      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        log.error(error.message);
        throw new UnknownException({
          code: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
          message: `Error unexpected!`,
          params: { exception: error.message },
        });
      }
      throw error;
    }
  }

  async deleteNotificationEmailById(
    ctx: IContext,
    notificationEmailId: string,
  ): Promise<NotificationEmail> {
    try {
      const result = await this.prisma.notificationEmail.delete({
        where: {
          id: notificationEmailId,
        },
      });

      this.notificationClient.emit(
        'notification.email.deleted',
        new DeleteEmailNotificationEventDto(
          result.id,
          result.name,
          result.description,
          result.sender,
          result.recipient,
        ),
      );

      await this.auditService.sendAudit(ctx, AuditAction.DELETED, {
        id: result.id,
        prev: result,
        auditable: Auditable.EMIAL_NOTIFICATION,
      });

      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        log.error(error.message);
        throw new UnknownException({
          code: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
          message: `Error unexpected!`,
          params: { exception: error.message },
        });
      }
      throw error;
    }
  }

  async getNotificationEmails(): Promise<NotificationEmail[]> {
    try {
      const result = await this.prisma.notificationEmail.findMany();
      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        log.error(error.message);
        throw new UnknownException({
          code: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
          message: `Error unexpected!`,
          params: { exception: error.message },
        });
      }
      throw error;
    }
  }

  async getNotificationEmailMultipleId(
    notificationEmailIdList: string[],
  ): Promise<NotificationEmail[]> {
    try {
      const result = await this.prisma.notificationEmail.findMany({
        where: {
          id: {
            in: notificationEmailIdList,
          },
        },
      });
      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        log.error(error.message);
        throw new UnknownException({
          code: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
          message: `Error unexpected!`,
          params: { exception: error.message },
        });
      }
      throw error;
    }
  }

  async getNotificationEmailById(
    notificationEmailId: string,
  ): Promise<NotificationEmail> {
    try {
      const result = await this.prisma.notificationEmail.findUnique({
        where: {
          id: notificationEmailId,
        },
      });

      if (!result) {
        throw new NotFoundException({
          code: HttpStatus.NOT_FOUND.toString(),
          message: `Notification Email with ${notificationEmailId} is not found!`,
        });
      }

      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        log.error(error.message);
        throw new UnknownException({
          code: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
          message: `Error unexpected!`,
          params: { exception: error.message },
        });
      }
      throw error;
    }
  }
}
