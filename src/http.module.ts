import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { MailModule } from './modules/mails/mail.module';
import { logger } from './shared/utils/log.util';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: { logger },
    }),
    MailModule,
  ],
})
export class HttpModule {}
