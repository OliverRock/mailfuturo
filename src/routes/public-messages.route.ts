import { Router } from 'express';
import PubMessageController from '@controllers/pubMessages.controller';
import { Routes } from '@interfaces/routes.interface';

class PubMessageRoute implements Routes {
  public path = '/public-messages';
  public router = Router();
  public PubMessageController = new PubMessageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.PubMessageController.index);
  }
}

export default PubMessageRoute;
