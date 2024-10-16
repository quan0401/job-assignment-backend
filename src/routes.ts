import { Application } from 'express';
import { userRoutes } from '~/routes/user.routes';
import { commentRoutes } from '~/routes/comment.routes';
import { photoRoutes } from '~/routes/photo.routes';

const BASE_URL = '/api/v1';

export default (app: Application) => {
  const routes = () => {
    app.use(`${BASE_URL}/user`, userRoutes.routes());
    app.use(`${BASE_URL}/photo`, photoRoutes.routes());
    app.use(`${BASE_URL}/comment`, commentRoutes.routes());
  };
  routes();
};
