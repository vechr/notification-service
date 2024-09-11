import { Module } from '@nestjs/common';
import { MailModule } from './mails/mail.module';

@Module({
  imports: [MailModule],
})
export class RegistrationModule {}
