import { DataTypes, ModelDefined, Optional } from 'sequelize';
import { sequelize } from '~/setupDatabase';
import { User } from './user.model';

export interface IPhoto {
  id?: number; // Optional: if you have an auto-incrementing primary key
  url?: string;
  description?: string; // Optional since it's not required
  userId?: number;
  createdAt?: Date; // Optional if auto-generated
}

type PhotoCreationAttributes = Optional<IPhoto, 'id'>;

// Define Photo model using `define`
export const Photo: ModelDefined<PhotoCreationAttributes, IPhoto> = sequelize.define(
  'Photo',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
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
    }
  },
  {
    tableName: 'photos',
    timestamps: false,
    indexes: [
      {
        fields: ['userId']
      }
    ]
  }
);
