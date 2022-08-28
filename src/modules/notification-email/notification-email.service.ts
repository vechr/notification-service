import PrismaService from '@/prisma/prisma.service';
import { UnknownException } from '@/shared/exceptions/common.exception';
import log from '@/shared/utils/log.util';
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
import {
  CreateNotificationEmailDto,
  DeleteEmailNotificationEventDto,
  UpdateNotificationEmailDto,
} from './dto';

@Injectable()
export class NotificationEmailService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('THINGS_SERVICE') private readonly notificationClient: ClientNats,
  ) {}

  async createNotificationEmail(
    dto: CreateNotificationEmailDto,
  ): Promise<NotificationEmail> {
    try {
      const result = await this.prisma.notificationEmail.create({
        data: {
          ...dto,
        },
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
