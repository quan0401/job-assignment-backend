import { Router } from 'express';
import { PhotoController } from '~/controllers/photo';

class PhotoRoutes {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.post('/', PhotoController.prototype.createPhoto);
    this.router.get('/comments', PhotoController.prototype.getPhotosWithComments);
    this.router.get('/', PhotoController.prototype.getPhotos);
    this.router.delete('/:id/:userId', PhotoController.prototype.deletePhoto);
    this.router.put('/:id/:userId', PhotoController.prototype.editPhoto);
    return this.router;
  }
}

export const photoRoutes = new PhotoRoutes();
