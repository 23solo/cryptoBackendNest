import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    await this.mailerService.sendMail({
      to, // Recipient
      subject, // Subject line
      text, // Plain text body
      // html: '<b>Hello world?</b>', // Optional: HTML body
    });
  }
}
