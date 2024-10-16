import { Photo } from './photo.model';
import { User } from './user.model';
import { Comment } from './comment.model';

export const createASSOCIATIONS = () => {
  // Define Associations
  User.hasMany(Photo, { foreignKey: 'userId', onDelete: 'CASCADE' });
  Photo.belongsTo(User, { foreignKey: 'userId' });

  User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
  Photo.hasMany(Comment, { foreignKey: 'photoId', onDelete: 'CASCADE' });

  Comment.belongsTo(User, { foreignKey: 'userId' });
  Comment.belongsTo(Photo, { foreignKey: 'photoId' });
};
