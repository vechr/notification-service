import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import appConfig from '@/config/app.config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: appConfig.EMAIL_HOST,
          port: appConfig.EMAIL_PORT,
          secure: false, // upgrade later with STARTTLS
          auth: {
            user: appConfig.EMAIL_ID,
            pass: appConfig.EMAIL_PASS,
          },
        },
        defaults: {
          from: `"Vechr Notification" <${appConfig.EMAIL_ID}>`,
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
        name: appConfig.NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: [appConfig.NATS_URL],
          maxReconnectAttempts: 10,
          tls: {
            caFile: appConfig.NATS_CA,
            keyFile: appConfig.NATS_KEY,
            certFile: appConfig.NATS_CERT,
          },
        },
      },
    ]),
  ],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
