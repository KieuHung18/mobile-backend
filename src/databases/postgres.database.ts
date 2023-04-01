import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const database = process.env.POSTGRES_DATABASE;
const userName = process.env.POSTGRES_USER_NAME;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;
const sequelize = new Sequelize(database, userName, password, {
  host: host,
  dialect: "postgres",
  port: 5432,
});

export default sequelize;
