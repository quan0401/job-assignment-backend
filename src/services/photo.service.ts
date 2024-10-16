import { Model } from 'sequelize';
import { faker } from '@faker-js/faker';
import { Photo, IPhoto } from '~/models/photo.model';
import { Comment } from '~/models/comment.model';

class PhotoService {
  public async createPhoto(data: IPhoto): Promise<Model<IPhoto>> {
    const photo = await Photo.create({
      ...data
    });
    return photo;
  }

  public async getPhotos(): Promise<Model<IPhoto>[]> {
    const photos = await Photo.findAll();
    return photos;
  }

  public async getPhotoById(id: number): Promise<Model<IPhoto>> {
    const photo = await Photo.findByPk(id);
    return photo!;
  }

  public async updatePhoto(id: number, data: IPhoto): Promise<[number]> {
    const photo = await Photo.update(data, {
      where: { id }
    });
    return photo;
  }
  public async getPhotosWithComments(): Promise<Model<IPhoto>[]> {
    const photos = await Photo.findAll({
      include: [
        {
          model: Comment
          // as: 'comments'
        }
      ]
    });
    return photos;
  }
}

export const photoService = new PhotoService();
