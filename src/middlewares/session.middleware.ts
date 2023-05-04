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
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: EXPRESS_SESSION_MAX_AGE,
    domain: "kieuhung18.github.io",
  },
});

export default session;
