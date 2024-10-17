import { Model } from 'sequelize';
import { IUser, User } from '~/models/user.model';

class UserService {
  public async createUser(data: IUser): Promise<Model<IUser>> {
    let result: Model<IUser> | null;
    result = await User.findOne({
      where: {
        username: data.username
      }
    });
    if (!result) {
      result = await User.create({
        ...data,
        username: data.username
      });
    }
    return result;
  }

  public async getUsers(): Promise<Model<IUser>[]> {
    const users = await User.findAll();
    return users;
  }

  public async getUserById(id: number): Promise<Model<IUser>> {
    const user = await User.findByPk(id);
    return user!;
  }

  public async updateUser(id: number, data: IUser): Promise<[number]> {
    const user = await User.update(data, {
      where: { id }
    });
    return user;
  }
}

export const userService = new UserService();
