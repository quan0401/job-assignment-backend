import { Model } from 'sequelize';
import { faker } from '@faker-js/faker';
import { IUser, User } from '~/models/user.model';

class UserService {
  public async createUser(data: IUser): Promise<Model<IUser>> {
    const user = await User.create({
      ...data,
      username: data.username || faker.internet.userName()
    });
    return user;
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
