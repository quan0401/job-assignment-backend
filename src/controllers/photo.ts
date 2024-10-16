import { Request, Response } from 'express';
import { photoService } from '~/services/photo.service';
import HTTP_STATUS from 'http-status-codes';
import { IPhoto } from '~/models/photo.model';
import { UploadApiResponse } from 'cloudinary';
import { uploads } from '~/shared/globals/helpers/cloudinary-upload';
import { BadRequesetError } from '~/shared/globals/helpers/error-handler';

export class PhotoController {
  async createPhoto(req: Request, res: Response) {
    const { description, userId, image } = req.body;

    const result: UploadApiResponse = (await uploads(image, `${userId}`, true, true)) as UploadApiResponse;

    if (!result?.public_id) throw new BadRequesetError('Image upload failed');

    const photo = await photoService.createPhoto({
      description,
      userId: parseInt(userId),
      url: result.url
    });
    res.status(HTTP_STATUS.CREATED).json({ photo });
  }

  async getPhotos(req: Request, res: Response) {
    const photos = await photoService.getPhotos();
    res.status(HTTP_STATUS.OK).json({ photos });
  }

  async getPhotosWithComments(req: Request, res: Response) {
    const photos = await photoService.getPhotosWithComments();
    res.status(HTTP_STATUS.OK).json({ photos });
  }
}
