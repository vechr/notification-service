import { Controller, UseFilters } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OtelInstanceCounter, OtelMethodCounter } from 'nestjs-otel';
import { NotificationEmailRPC } from './dto/notification-email-rpc.dto';
import { MailService } from './mail.service';
import { ExceptionFilter } from '@/core/base/frameworks/shared/filters/rpc-exception.filter';

@Controller()
@OtelInstanceCounter()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @UseFilters(new ExceptionFilter())
  @EventPattern('notification.email')
  @OtelMethodCounter()
  async queryDBTopic(@Payload() dto: NotificationEmailRPC): Promise<any> {
    await this.mailService.sendMailBulk(dto);
  }
}
