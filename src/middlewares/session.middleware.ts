import expressSession, { Session } from "express-session";
import redisStore from "../databases/redis.database";
import dotenv from "dotenv";
import { EXPRESS_SESSION_MAX_AGE } from "./constant";
import { UserProps } from "../models/user.model";

dotenv.config();

export interface SessionData extends Session {
  user?: UserProps;
}

const session = expressSession({
  store: redisStore,
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: EXPRESS_SESSION_MAX_AGE,
  },
});

export default session;
