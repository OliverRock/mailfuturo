import { NextFunction, Request, Response } from 'express';
import EmailClient from '@/services/emailprovider.service';
import DB from '@/database/db';
import { logger } from '@/utils/logger';

class EmailController {
  public submit = (req: Request, res: Response, next: NextFunction): void => {
    const deliveryDate = new Date(req.body.deliveryDate);
    res.render('submit', { date: deliveryDate.toDateString() });
    DB.getInstance()
      .addNewMessage(req.body.email, deliveryDate, req.body.messageContents)
      .then(messageId => {
        EmailClient.getInstance().sendVerificationEmail(req.body.email, messageId.rows[0].pk, deliveryDate);
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
    logger.info('Received POST to sendAllEmails');
    try {
      DB.getInstance()
        .getAllMessagesToDeliverToday(new Date())
        .then(listOfMsgs => {
          listOfMsgs.forEach(message => {
            this.deliverASingleMessage(message);
          });
        });
      res.send('We are sending all emails');
    } catch (error) {
      next(error);
    }
  };
  private deliverASingleMessage(message) {
    logger.info('Atempting to deliver message pk: ' + message.pk);
    EmailClient.getInstance()
      .deliverFinalMessage(message.email_address, message.message_text, message.created_timestamp)
      .then(resolve => {
        if (resolve) {
          DB.getInstance().validateDeliveryOfMessage(message.pk);
        }
      });
  }
}

export default EmailController;
