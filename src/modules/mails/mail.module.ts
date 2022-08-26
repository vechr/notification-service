import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailController } from './mail.controller';
import appConstant from '@/constants/app.constant';
import { NotificationEmailService } from '../notification-email/notification-email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: appConstant.EMAIL_HOST,
          port: appConstant.EMAIL_PORT,
          secure: false, // upgrade later with STARTTLS
          auth: {
            user: appConstant.EMAIL_ID,
            pass: appConstant.EMAIL_PASS,
          },
        },
        defaults: {
          from: `"kreMES Notification" <${appConstant.EMAIL_ID}>`,
        },
        template: {
          dir: process.cwd() + '/templates/',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService, NotificationEmailService],
  controllers: [MailController],
})
export class MailModule {}
