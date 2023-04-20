require("dotenv").config(); // this is important!
module.exports = {
  development: {
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER_NAME,
    password: process.env.POSTGRES_PASSWORD,
    database: "postgres",
    dialect: "postgres",
    port: 5432,
  },
  test: {
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER_NAME,
    password: process.env.POSTGRES_PASSWORD,
    database: "postgres",
    dialect: "postgres",
    port: 5432,
  },
  production: {
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER_NAME,
    password: process.env.POSTGRES_PASSWORD,
    database: "postgres",
    dialect: "postgres",
    port: 5432,
  },
};
