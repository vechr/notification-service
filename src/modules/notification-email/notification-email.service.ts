import PrismaService from '@/prisma/prisma.service';
import { UnknownException } from '@/shared/exceptions/common.exception';
import log from '@/shared/utils/log.util';
import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NotificationEmail } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CreateNotificationEmailDto, UpdateNotificationEmailDto } from './dto';

@Injectable()
export class NotificationEmailService {
  constructor(private readonly prisma: PrismaService) {}

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
