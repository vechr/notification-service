import { ExceptionFilter } from '@/shared/filters/rpc-exception.filter';
import { Controller, UseFilters } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationEmailRPC } from './dto/notification-email-rpc.dto';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @UseFilters(new ExceptionFilter())
  @EventPattern('notification.email')
  async queryDBTopic(@Payload() dto: NotificationEmailRPC): Promise<any> {
    await this.mailService.sendMailBulk(dto);
  }
}
