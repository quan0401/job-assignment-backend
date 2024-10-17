import { Request, Response } from 'express';
import { photoService } from '~/services/photo.service';
import HTTP_STATUS from 'http-status-codes';
import { UploadApiResponse } from 'cloudinary';
import { uploads } from '~/shared/globals/helpers/cloudinary-upload';
import { BadRequesetError } from '~/shared/globals/helpers/error-handler';
import { IPhoto } from '~/models/photo.model';

export class PhotoController {
  async createPhoto(req: Request, res: Response) {
    const { description, userId, image } = req.body;

    const result: UploadApiResponse = (await uploads(image)) as UploadApiResponse;

    if (!result?.public_id) throw new BadRequesetError('Image upload failed');

    const photo = await photoService.createPhoto({
      description,
      userId: parseInt(userId),
      url: result.url
    });
    res.status(HTTP_STATUS.CREATED).json({
      photo: {
        ...photo.dataValues,
        Comments: []
      }
    });
  }

  async getPhotos(req: Request, res: Response) {
    const photos = await photoService.getPhotos();
    res.status(HTTP_STATUS.OK).json({ photos });
  }

  async getPhotosWithComments(req: Request, res: Response) {
    const photos = await photoService.getPhotosWithComments();
    res.status(HTTP_STATUS.OK).json({ photos });
  }

  async editPhoto(req: Request, res: Response) {
    const { id, userId } = req.params;
    const { image, description } = req.body;
    const data: IPhoto = { description };
    if (image && image.trim() !== '') {
      const result: UploadApiResponse = (await uploads(image, `${userId}`, true, true)) as UploadApiResponse;
      data['url'] = result.url;

      if (!result?.public_id) throw new BadRequesetError('Image upload failed');
    }
    const photo = await photoService.updatePhoto(parseInt(id), parseInt(userId), data);
    if (!photo) throw new BadRequesetError('Photo not found');
    res.status(HTTP_STATUS.OK).json({ photo, message: 'Image updated successfuly' });
  }

  async deletePhoto(req: Request, res: Response) {
    const { id, userId } = req.params;

    const deleted = await photoService.deletePhoto(parseInt(id), parseInt(userId));
    if (!deleted) throw new BadRequesetError('Photo not found');
    res.status(HTTP_STATUS.OK).json({ message: 'Photo deleted successfully' });
  }
}
