import { NextFunction, Request, Response } from 'express';

class EmailController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      console.log(req.body);
      res.send('Email submitted');
    } catch (error) {
      next(error);
    }
  };
}

export default EmailController;
