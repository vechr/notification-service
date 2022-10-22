import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import AuthModule from './core/auth.module';
import AuditModule from './modules/audits/audit.module';
import { MailModule } from './modules/mails/mail.module';
import { NotificationEmailModule } from './modules/notification-email/notification-email.module';
import { PrismaModule } from './prisma/prisma.module';
import { logger } from './shared/utils/log.util';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: { logger },
    }),
    //Plugins
    PrismaModule,
    AuthModule,
    AuditModule,

    MailModule,
    NotificationEmailModule,
  ],
})
export class AppModule {}
