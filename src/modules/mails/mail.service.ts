import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NotificationEmailRPC, SendMailDto } from './dto';
import appConfig from '@/config/app.config';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendMailBulk(dto: NotificationEmailRPC): Promise<void> {
    dto.notificationEmails.forEach(async (el) => {
      await this.sendMail({
        sender: el.sender,
        recipient: el.recipient,
        body: dto.body,
        htmlBodyContent: dto.htmlBodyContent,
      });
    });
  }

  public async sendMail(dto: SendMailDto): Promise<any> {
    await this.mailerService
      .sendMail({
        to: dto.recipient, // List of receivers email address
        from: dto.sender ?? appConfig.EMAIL_ID, // Senders email address
        subject: 'Kremes Notification Alert ✔', // Subject line
        text: dto.body, // plaintext body
        html: dto.htmlBodyContent ?? '<b>Notification from Kremes</b>', // HTML body content
      })
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }
}
