import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import appConstant from '@/constants/app.constant';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public testingEmail(): void {
    this.mailerService
      .sendMail({
        to: 'isnaen70@gmail.com', // List of receivers email address
        from: appConstant.EMAIL_ID, // Senders email address
        subject: 'Kremes Notification Alert ✔', // Subject line
        text: 'kreMES', // plaintext body
        html: '<b>Notification from Kremes</b>', // HTML body content
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
