import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NotificationEmailService } from '../notification-email/notification-email.service';
import { NotificationEmailRPC, SendMailDto } from './dto';
import appConstant from '@/constants/app.constant';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly notificationEmailService: NotificationEmailService,
  ) {}

  public async sendMailBulk(dto: NotificationEmailRPC): Promise<void> {
    // console.dir(dto, { depth: null })
    const result =
      await this.notificationEmailService.getNotificationEmailMultipleId(
        dto.notificationEmailIdList,
      );
    result.forEach(async (el) => {
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
        from: dto.sender ?? appConstant.EMAIL_ID, // Senders email address
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
