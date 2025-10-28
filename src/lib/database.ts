import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_USER, DB_HOST, DB_PASSWORD, DB_PORT } = process.env;

if (!DB_NAME || !DB_USER || !DB_HOST || !DB_PASSWORD) {
  console.error(
    'Fatal Error: One or more database environment variables (DB_NAME, DB_USER, DB_HOST, DB_PASSWORD) are not set.'
  );
  process.exit(1);
}

const dbPort = Number(DB_PORT) || 5432;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: dbPort,
  dialect: 'postgres',
  logging: false,
});

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

export default sequelize;

