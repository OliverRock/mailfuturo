import { Router } from 'express';
import EmailController from '@controllers/email.controller';
import { Routes } from '@interfaces/routes.interface';

class EmailRoute implements Routes {
  public path = '/email';
  public router = Router();
  public emailController = new EmailController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.emailController.index);
  }
}

export default EmailRoute;
