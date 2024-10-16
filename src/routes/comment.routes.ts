import { Router } from 'express';
import { CommentController } from '~/controllers/comment';

class CommentRoutes {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.post('/', CommentController.prototype.createComment);
    return this.router;
  }
}

export const commentRoutes = new CommentRoutes();
