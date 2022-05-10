import nodemailer from 'nodemailer';
import { EMAIL_ADDRESS, EMAIL_PASSWORD } from '@config';

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
      html: '<h1>verify your email</h1><p>Click here to verify' + address + ' email' + messageId + '</p>',
    };
    this.sendEmail(mailOptions);
  }

  private async sendEmail(mailOptions) {
    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}

export default EmailClient;
