import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OtelInstanceCounter, OtelMethodCounter } from 'nestjs-otel';
import { CreateNotificationEmailDto, UpdateNotificationEmailDto } from './dto';
import { NotificationEmailService } from './notification-email.service';
import ListNotificationEmailValidator, {
  ListNotificationEmailQueryValidator,
} from './validators/list-notification-email.validator';
import ListNotificationEmailResponse from './serializers/list-notification-email.response';
import SuccessResponse from '@/shared/responses/success.response';
import { IContext } from '@/shared/interceptors/context.interceptor';
import UseList from '@/shared/decorators/uselist.decorator';
import Validator from '@/shared/decorators/validator.decorator';
import Serializer from '@/shared/decorators/serializer.decorator';
import { ApiFilterQuery } from '@/shared/decorators/api-filter-query.decorator';
import Context from '@/shared/decorators/context.decorator';
import Authentication from '@/shared/decorators/authentication.decorator';
import Authorization from '@/shared/decorators/authorization.decorator';

@ApiTags('Notification Email')
@ApiBearerAuth('access-token')
@Controller('notification/email')
@OtelInstanceCounter()
export class NotificationEmailController {
  constructor(
    private readonly notificationEmailService: NotificationEmailService,
  ) {}

  @Version('2')
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseList()
  @Authentication(true)
  @Authorization('email-notifications:read@auth')
  @Validator(ListNotificationEmailValidator)
  @Serializer(ListNotificationEmailResponse)
  @ApiFilterQuery('filters', ListNotificationEmailQueryValidator)
  @OtelMethodCounter()
  public async list(@Context() ctx: IContext): Promise<SuccessResponse> {
    const { result, meta } = await this.notificationEmailService.list(ctx);
    return new SuccessResponse('Success get all records!', result, meta);
  }

  @ApiOperation({
    summary: 'this API is used to create email notification',
  })
  @Post()
  @Authentication(true)
  @Authorization('email-notifications:create@auth')
  @OtelMethodCounter()
  async createNotificationEmail(
    @Context() ctx: IContext,
    @Body() dto: CreateNotificationEmailDto,
  ): Promise<SuccessResponse> {
    const result = await this.notificationEmailService.createNotificationEmail(
      ctx,
      dto,
    );
    return new SuccessResponse(
      `Success Create Notification Email ${result.name}!`,
      result,
    );
  }

  @ApiOperation({
    summary: 'this API is used to update email notification',
  })
  @Patch(':id')
  @Authentication(true)
  @Authorization('email-notifications:update@auth')
  @OtelMethodCounter()
  async updateNotificationEmailById(
    @Context() ctx: IContext,
    @Param('id') notificationEmailId: string,
    @Body() dto: UpdateNotificationEmailDto,
  ): Promise<SuccessResponse> {
    const result =
      await this.notificationEmailService.updateNotificationEmailById(
        ctx,
        notificationEmailId,
        dto,
      );
    return new SuccessResponse(
      `Success Update Notification Email ${result.name}!`,
      result,
    );
  }

  @ApiOperation({
    summary: 'this API is used to delete email notification',
  })
  @Delete(':id')
  @Authentication(true)
  @Authorization('email-notifications:delete@auth')
  @OtelMethodCounter()
  async deleteNotificationEmailById(
    @Context() ctx: IContext,
    @Param('id') notificationEmailId: string,
  ): Promise<SuccessResponse> {
    const result =
      await this.notificationEmailService.deleteNotificationEmailById(
        ctx,
        notificationEmailId,
      );
    return new SuccessResponse(
      `Success Delete Notification Email ${result.name}!`,
      result,
    );
  }

  @ApiOperation({
    summary: 'this API is used to get email notification by id',
  })
  @Get()
  @Authentication(true)
  @Authorization('email-notifications:read@auth')
  @OtelMethodCounter()
  async getNotificationEmails(): Promise<SuccessResponse> {
    const result = await this.notificationEmailService.getNotificationEmails();
    return new SuccessResponse('Success Get All Notification Email!', result);
  }

  @ApiOperation({
    summary: 'this API is used to get all email notification',
  })
  @Get(':id')
  @Authentication(true)
  @Authorization('email-notifications:read@auth')
  @OtelMethodCounter()
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
