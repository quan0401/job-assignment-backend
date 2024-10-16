import { DataTypes, ModelDefined, Optional } from 'sequelize';
import { sequelize } from '~/setupDatabase';
import { User } from './user.model';
import { Photo } from './photo.model';

export interface IComment {
  id?: number; // Optional: if you have an auto-incrementing primary key
  text: string;
  createdAt?: Date; // Optional if auto-generated
  photoId?: number;
  userId?: number;
}

type CommentCreationAttributes = Optional<IComment, 'id'>;

// Define Comment model using `define`
export const Comment: ModelDefined<IComment, CommentCreationAttributes> = sequelize.define(
  'Comment',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // Reference to the User model
        key: 'id' // Key in the referenced table
      },
      allowNull: false // Ensure userId cannot be null
    },
    photoId: {
      type: DataTypes.INTEGER,
      references: {
        model: Photo, // Reference to the Photo model
        key: 'id' // Key in the referenced table
      },
      allowNull: false // Ensure photoId cannot be null
    }
  },
  {
    tableName: 'comments',
    timestamps: false,
    indexes: [
      {
        fields: ['photoId', 'userId']
      }
    ]
  }
);
