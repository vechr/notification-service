import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationEmailService } from '../notification-email/notification-email.service';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import appConstant from '@/constants/app.constant';

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
          from: `"Vechr Notification" <${appConstant.EMAIL_ID}>`,
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
    ClientsModule.register([
      {
        name: appConstant.NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: [appConstant.NATS_URL],
        },
      },
    ]),
  ],
  providers: [MailService, NotificationEmailService],
  controllers: [MailController],
})
export class MailModule {}
