import { NextFunction, Request, Response } from 'express';

class donateController {
  public donate = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.render('donate');
    } catch (error) {
      next(error);
    }
  };
}

export default donateController;
