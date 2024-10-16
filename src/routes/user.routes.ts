import { Router } from 'express';
import { UserController } from '~/controllers/user';

class UserRoutes {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.post('/signup', UserController.prototype.createUser);
    return this.router;
  }
}

export const userRoutes = new UserRoutes();
