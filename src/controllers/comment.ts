import { Request, Response } from 'express';
import { commentService } from '~/services/comment.service';
import HTTP_STATUS from 'http-status-codes';
import { IComment } from '~/models/comment.model';

export class CommentController {
  async createComment(req: Request, res: Response) {
    const { text, photoId, userId } = req.body;

    const data = {
      text,
      photoId: parseInt(photoId),
      userId: parseInt(userId)
    } as IComment;

    const comment = await commentService.createComment(data);
    res.status(HTTP_STATUS.CREATED).json({ comment });
  }

  async getComments(req: Request, res: Response) {
    const comments = await commentService.getComments();
    res.status(HTTP_STATUS.OK).json({ comments });
  }
}
