import { Model, Sequelize } from 'sequelize';
import { Photo, IPhoto } from '~/models/photo.model';
import { Comment } from '~/models/comment.model';
import { User } from '~/models/user.model';
import { sequelize } from '~/setupDatabase';
import { BadRequesetError } from '~/shared/globals/helpers/error-handler';

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

  public async updatePhoto(id: number, userId: number, data: IPhoto): Promise<Model<IPhoto> | undefined> {
    const count = await Photo.update(data, {
      where: { id, userId }
    });
    if (count[0] === 0) return undefined;
    const photo = await this.getPhotoById(id);
    return photo;
  }

  public async getPhotosWithComments(): Promise<Model<IPhoto>[]> {
    const photos = await Photo.findAll({
      include: [
        {
          model: Comment,
          // as: 'comments'
          include: [
            {
              model: User,
              attributes: ['username']
            }
          ]
        }
      ]
    });

    const transformedPhotos = photos.map((photo: any) => {
      const transformedComments = photo.Comments.map((comment: any) => {
        const { User, ...commentData } = comment.get();
        return {
          ...commentData,
          username: User.username
        };
      });
      return {
        ...photo.get(),
        Comments: transformedComments
      };
    });
    transformedPhotos.sort((a: any, b: any) => b.createdAt - a.createdAt);

    return transformedPhotos;
  }

  public async deletePhoto(id: number, userId: number): Promise<number> {
    const transaction = await sequelize.transaction();

    try {
      // Delete associated comments
      await Comment.destroy({
        where: { photoId: id, userId },
        transaction
      });

      // Delete the photo
      const photo = await Photo.destroy({
        where: { id, userId },
        transaction
      });
      // Commit the transaction
      await transaction.commit();

      return photo;
    } catch (error) {
      // Rollback the transaction in case of error
      await transaction.rollback();
      throw new BadRequesetError('Failed to delete photo not your photo');
    }
  }
}

export const photoService = new PhotoService();
