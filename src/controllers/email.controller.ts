import { NextFunction, Request, Response } from 'express';
import EmailClient from '@/services/emailprovider.service';
import DB from '@/database/db';

class EmailController {
  public submit = (req: Request, res: Response, next: NextFunction): void => {
    res.render('submit');
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
      res.render('confirm');
    } catch (error) {
      next(error);
    }
  };

  public sendAllEmails = (req: Request, res: Response, next: NextFunction): void => {
    try {
      DB.getInstance().getAllMEssagesToDeliverToday(new Date());
    } catch (error) {
      next(error);
    }
  };
}

export default EmailController;
