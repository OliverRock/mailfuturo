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
  public async deliverFinalMessage(address: string, message: string, dateCreated: Date) {
    const mailOptions = {
      from: EMAIL_ADDRESS,
      to: 'oliver.rock@proton.me',
      subject: 'A message from the past',
      html:
        '<h1>The day has finally come</h1><p>On ' +
        dateCreated +
        ' you sent an email to yourself, you  asked for the email to be delivered today. Here is you message:</p>' +
        '<p>' +
        message +
        '</p>',
    };
    return this.sendEmail(mailOptions, 'FinalMessageDelivered');
  }
  /**
   * Method is used to send an email
   * @param mailOptions should be a dict with fields: from, to, subj, and msg
   * @param emailType
   */
  private async sendEmail(mailOptions, emailType: 'Verification' | 'FinalMessageDelivered') {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          logger.log(error);
          reject();
        } else {
          logger.info(`${emailType} email sent: ${info.response}`);
          resolve('msg delivered');
        }
      });
    });
  }
}

export default EmailClient;
