import { DataTypes, ModelDefined, Optional } from 'sequelize';
import { sequelize } from '~/setupDatabase';

export interface IUser {
  id?: number; // Optional: if you have an auto-incrementing primary key
  username: string;
  createdAt?: Date; // Optional if auto-generated
}

type UserCreationAttributes = Optional<IUser, 'id'>;

// Define User model using `define`
export const User: ModelDefined<IUser, UserCreationAttributes> = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  },
  {
    tableName: 'users',
    timestamps: false
  }
);
