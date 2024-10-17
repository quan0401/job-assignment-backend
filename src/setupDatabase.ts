import { Sequelize } from 'sequelize';
import Logger from 'bunyan';
import { config } from '~/config';

const log: Logger = config.createLogger('setupDatabase');

// Initialize Sequelize
export const sequelize = new Sequelize({
  host: config.DATABASE_HOST,
  database: config.DATABASE_NAME,
  username: config.DATABASE_USER,
  password: config.DATABASE_PASSWORD,
  dialect: 'postgres',
  logging: false, // Disable logging for SQL queries
  dialectOptions: {
    multipleStatements: true
  }
});

export default async () => {
  const databaseConnection = async (): Promise<void> => {
    try {
      // Authenticate and sync the models with the database
      await sequelize.authenticate();
      log.info('Connected to PostgreSQL database with Sequelize.');

      // Sync all models to the database (equivalent to creating the tables)
      await sequelize.sync({ force: false }); // Set to `true` to recreate tables on every run
      log.info('Tables created (or verified) successfully.');
    } catch (error) {
      log.error('Unable to connect to the database:', error);
    }
  };

  await databaseConnection();
};
