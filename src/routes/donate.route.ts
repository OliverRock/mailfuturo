import { Router } from 'express';
import DonateController from '@controllers/donate.controller';
import { Routes } from '@interfaces/routes.interface';

class DonateRoute implements Routes {
  public path = '/donate';
  public router = Router();
  public donateController = new DonateController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.donateController.donate);
  }
}

export default DonateRoute;
