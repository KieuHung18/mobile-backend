import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const userName = process.env.POSTGRES_USER_NAME;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;
const sequelize = new Sequelize("postgres", userName, password, {
  host: host,
  dialect: "postgres",
  port: 5432,
});

export default sequelize;
