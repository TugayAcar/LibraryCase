import { Sequelize } from 'sequelize';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 5432;
const DB_USER = process.env.DB_USER || "admin";
const DB_PASSWORD = process.env.DB_PASSWORD || "password";
const DB_NAME = process.env.DB_NAME || "dbname";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    port: Number(DB_PORT),
    logging: false,
});

export default sequelize;
