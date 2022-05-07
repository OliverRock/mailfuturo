import { NextFunction, Request, Response } from 'express';
import emailClient from '@/services/emailprovider.service';

class EmailController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.json({ requestBody: req.body });
      const address = req.body.email;
      const message = req.body.messageContents;
      emailClient.sendEmail(address, 'subject', message);
    } catch (error) {
      next(error);
    }
  };

  public verifyEmail = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const emailId = req.params.id;
      console.log(emailId);
      res.send('Thank you for verifying your email.');
    } catch (error) {
      next(error);
    }
  };
}

export default EmailController;
