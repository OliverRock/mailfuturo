import nodemailer from 'nodemailer';
import { EMAIL_ADDRESS, EMAIL_PASSWORD } from '@config';

const emailClient = {
  transporter: nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD,
    },
  }),
  sendEmail: function (address: string, subject: string, message: string) {
    console.log(address, message);

    const mailOptions = {
      from: EMAIL_ADDRESS,
      to: 'oliver.rock@proton.me',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
    };
    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return address + message;
  },
};

export default emailClient;
