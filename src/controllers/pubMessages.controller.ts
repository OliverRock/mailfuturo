import { NextFunction, Request, Response } from 'express';

class pubMessageController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.render('public-messages');
    } catch (error) {
      next(error);
    }
  };
}

export default pubMessageController;
