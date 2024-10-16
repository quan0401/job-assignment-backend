import { Model } from 'sequelize';
import { Comment, IComment } from '~/models/comment.model';
import { photoService } from './photo.service';
import { BadRequesetError } from '~/shared/globals/helpers/error-handler';

class CommentService {
  public async createComment(data: IComment): Promise<Model<IComment>> {
    const photo = await photoService.getPhotoById(data.photoId!);
    if (!photo) {
      throw new BadRequesetError('Photo not found');
    }

    const comment = await Comment.create({
      ...data
    });
    return comment;
  }

  public async getComments(): Promise<Model<IComment>[]> {
    const comments = await Comment.findAll();
    return comments;
  }

  public async getCommentById(id: number): Promise<Model<IComment>> {
    const comment = await Comment.findByPk(id);
    return comment!;
  }

  public async updateComment(id: number, data: IComment): Promise<[number]> {
    const comment = await Comment.update(data, {
      where: { id }
    });
    return comment;
  }
}

export const commentService = new CommentService();
