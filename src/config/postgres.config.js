require("dotenv").config(); // this is important!
module.exports = {
  development: {
    username: process.env.POSTGRES_USER_NAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    port: 5432,
  },
  test: {
    username: process.env.POSTGRES_USER_NAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    port: 5432,
  },
  production: {
    username: process.env.POSTGRES_USER_NAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    port: 5432,
  },
};
