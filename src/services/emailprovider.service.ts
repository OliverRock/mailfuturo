import nodemailer from 'nodemailer';
import { EMAIL_ADDRESS, EMAIL_PASSWORD } from '@config';
import { logger } from '@/utils/logger';

class EmailClient {
  private static instance: EmailClient;
  private transporter;

  private constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD,
      },
    });
  }

  public static getInstance() {
    if (!EmailClient.instance) {
      EmailClient.instance = new EmailClient();
    }
    return EmailClient.instance;
  }

  public sendVerificationEmail(address: string, messageId: string) {
    const mailOptions = {
      from: EMAIL_ADDRESS,
      to: 'oliver.rock@proton.me',
      subject: 'Sending Email using Node.js',
      html:
        '<h1>Verify your email</h1><p>Hello,\nThank you for using mailFuturo. You will receive your email on ... but first you need to confirm your email address, please click <a href="http://localhost:3000/email/verify/' +
        messageId +
        '">here to confirm you email address</a></p>',
    };
    this.sendEmail(mailOptions, 'Verification');
  }

  private async sendEmail(mailOptions, emailType: 'Verification') {
    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        logger.log(error);
      } else {
        logger.info(`${emailType} email sent: ${info.response}`);
      }
    });
  }
}

export default EmailClient;
