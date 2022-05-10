import { NextFunction, Request, Response } from 'express';
import emailClient from '@/services/emailprovider.service';
import DB from '@/database/db';
import { MessageChannel } from 'worker_threads';

class EmailController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.json({ requestBody: req.body });
      DB.getInstance().addNewMessage(req.body.email, req.body.messageContents);
      // emailClient.sendEmail(req.body.email, 'subject', req.body.messageContents);
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
