import { Module } from '@nestjs/common';
import { MailModule } from './modules/mails/mail.module';
import { NotificationEmailModule } from './modules/notification-email/notification-email.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    MailModule,
    NotificationEmailModule,

    // plugins
    PrismaModule,
  ],
})
export class NatsModule {}
