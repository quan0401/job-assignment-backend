import { Application, json, urlencoded, Response, Request, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieSession from 'cookie-session';
import HTTP_STATUS from 'http-status-codes';
import { Server } from 'socket.io';
// import { createClient } from 'redis';
// import { createAdapter } from '@socket.io/redis-adapter';
import compression from 'compression';
import 'express-async-errors';
import { config } from '~/config';
import applicationRoutes from '~/routes';
import Logger from 'bunyan';
import { CustomError, IErrorResponse } from '~/shared/globals/helpers/error-handler';
// import swStats from 'swagger-stats';

const SERVER_PORT = 5001;
const log: Logger = config.createLogger('server');

export class MyServer {
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    // this.apiMonitoring(this.app);
    this.routeMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.use(
      cookieSession({
        name: 'session',
        keys: [config.SECRET_KEY_ONE, config.SECRET_KEY_TWO],
        maxAge: 3600 * 1000,
        secure: config.NODE_ENV !== 'development'
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URI,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
  }

  private routeMiddleware(app: Application): void {
    applicationRoutes(app);
  }

  // private apiMonitoring(app: Application): void {
  //   // app.use(
  //   //   swStats.getMiddleware({
  //   //     uriPath: '/api-monitoring'
  //   //   })
  //   // );
  // }

  private globalErrorHandler(app: Application): void {
    // Handle unknow routes
    app.all('*', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });

    app.use((error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
      log.error(error);

      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializeErrors());
      }
      next();
    });
  }

  // Server
  private async startServer(app: Application): Promise<void> {
    if (!config.JWT_TOKEN) throw new Error('JWT_TOKEN must be provided.');
    try {
      const httpServer: http.Server = new http.Server(app);
      const socketIO: Server = await this.createSocketIO(httpServer);
      this.startHttpServer(httpServer);
      this.socketIOConnections(socketIO);
    } catch (error) {
      log.error(error);
    }
  }
  // Use server from socket.io instead of from http so as to not create conflict

  private async createSocketIO(httpServer: http.Server): Promise<Server> {
    const io = new Server(httpServer, {
      cors: {
        origin: config.CLIENT_URI,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      }
    });
    // const pubClient = createClient({ url: config.REDIS_HOST });
    // const subClient = pubClient.duplicate();
    // await Promise.all([pubClient.connect(), subClient.connect()]);
    // io.adapter(createAdapter(pubClient, subClient));
    return io;
  }

  private startHttpServer(httpServer: http.Server): void {
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Server is running on port and processid: ${SERVER_PORT}, ${process.pid}`);
    });
  }

  private socketIOConnections(io: Server): void {
    // const socketIOPostHandler: SocketIOPostHandler = new SocketIOPostHandler(io);
    // const socketIOFollowerHandler: SocketIOFollowerHandler = new SocketIOFollowerHandler(io);
    // const socketIOUser: SocketIOUserHandler = new SocketIOUserHandler(io);
    // const socketIONofitcation: SocketNofitication = new SocketNofitication();
    // const socketIOImage: SocketImage = new SocketImage();
    // const socketIOChat: SocketChat = new SocketChat(io);
    // socketIOPostHandler.listen();
    // socketIOFollowerHandler.listen();
    // socketIOUser.listen();
    // socketIONofitcation.listen(io);
    // socketIOImage.listen(io);
    // socketIOChat.listen();
  }
}
// docker cp assignment-postgres:/database.sql ./database.sql
//
// docker exec -i mysql_banking psql -U assignment -p 5432 -d assignment < database.sql
