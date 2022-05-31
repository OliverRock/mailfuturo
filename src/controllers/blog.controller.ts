import { NextFunction, Request, Response } from 'express';

class blogController {
  public blog = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.render('blog');
    } catch (error) {
      next(error);
    }
  };
}

export default blogController;
