import { Request, Response } from 'express';
import { userService } from '~/services/user.service';
import HTTP_STATUS from 'http-status-codes';

export class UserController {
  async createUser(req: Request, res: Response) {
    const user = await userService.createUser(req.body);
    res.status(HTTP_STATUS.CREATED).json({ user });
  }
}
