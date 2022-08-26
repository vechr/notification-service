import { Module } from '@nestjs/common';
import { NotificationEmailController } from './notification-email.controller';
import { NotificationEmailService } from './notification-email.service';

@Module({
  controllers: [NotificationEmailController],
  providers: [NotificationEmailService],
})
export class NotificationEmailModule {}
