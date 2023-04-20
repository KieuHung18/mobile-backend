import RedisStore from "connect-redis";
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const userName = process.env.REDIS_USER_NAME;
const password = process.env.REDIS_PASSWORD;
const host = process.env.REDIS_HOST;

const redisClient = createClient({
  username: userName,
  password: password,
  url: host,
});

redisClient.connect().catch(console.error);

redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
  if (err) {
    console.log("Could not establish a connection with redis. " + err);
  }
});

const redisStore = new RedisStore({
  client: redisClient,
});

export default redisStore;
