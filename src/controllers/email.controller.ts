import { NextFunction, Request, Response } from 'express';
import EmailClient from '@/services/emailprovider.service';
import DB from '@/database/db';

class EmailController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    res.json({ requestBody: req.body });
    DB.getInstance()
      .addNewMessage(req.body.email, new Date(req.body.deliveryDate), req.body.messageContents)
      .then(messageId => {
        EmailClient.getInstance().sendVerificationEmail(req.body.email, messageId.rows[0].pk);
      })
      .catch(error => {
        next(error);
      });
  };

  public verifyEmail = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const emailId = req.params.id;
      DB.getInstance().validateEmailAddress(+req.params.id);
      console.log(emailId);
      res.send('Thank you for verifying your email.');
    } catch (error) {
      next(error);
    }
  };
}

export default EmailController;
