import SuccessResponse from '@/shared/responses/success.response';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateNotificationEmailDto, UpdateNotificationEmailDto } from './dto';
import { NotificationEmailService } from './notification-email.service';

@Controller('notification-email')
export class NotificationEmailController {
  constructor(
    private readonly notificationEmailService: NotificationEmailService,
  ) {}

  @Post()
  async createNotificationEmail(
    @Body() dto: CreateNotificationEmailDto,
  ): Promise<SuccessResponse> {
    const result = await this.notificationEmailService.createNotificationEmail(
      dto,
    );
    return new SuccessResponse(
      `Success Create Notification Email ${result.name}!`,
      result,
    );
  }

  @Patch('id')
  async updateNotificationEmailById(
    @Param('id') notificationEmailId: string,
    @Body() dto: UpdateNotificationEmailDto,
  ): Promise<SuccessResponse> {
    const result =
      await this.notificationEmailService.updateNotificationEmailById(
        notificationEmailId,
        dto,
      );
    return new SuccessResponse(
      `Success Update Notification Email ${result.name}!`,
      result,
    );
  }

  @Delete('id')
  async deleteNotificationEmailById(
    @Param('id') notificationEmailId: string,
  ): Promise<SuccessResponse> {
    const result =
      await this.notificationEmailService.deleteNotificationEmailById(
        notificationEmailId,
      );
    return new SuccessResponse(
      `Success Delete Notification Email ${result.name}!`,
      result,
    );
  }

  @Get()
  async getNotificationEmails(): Promise<SuccessResponse> {
    const result = await this.notificationEmailService.getNotificationEmails();
    return new SuccessResponse('Success Get All Notification Email!', result);
  }

  @Get('id')
  async getNotificationEmailById(
    @Param('id') notificationEmailId: string,
  ): Promise<SuccessResponse> {
    const result = await this.notificationEmailService.getNotificationEmailById(
      notificationEmailId,
    );
    return new SuccessResponse(
      `Success Get Notification Email ${result.name}!`,
      result,
    );
  }
}
