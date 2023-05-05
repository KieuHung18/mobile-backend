import express from "express";
import AuthenService from "../../services/authen.service";
import authUser from "../../middlewares/auth.middleware";
import UserService from "../../services/user.service";
import { SessionData, getSession } from "../../middlewares/session.middleware";

const Authentication = express.Router();
const authenService = new AuthenService();

Authentication.post("/login", async (req, res, next) => {
  const session: SessionData = req.session;
  const { email, password } = req.body;
  try {
    const user = await authenService.authen(email, password);
    session.user = user;
    res.json({ response: session.id });
  } catch (error) {
    next(error);
  }
});
Authentication.use(authUser);
Authentication.get("/", async (req, res, next) => {
  const session: SessionData = await getSession(req);
  res.json({ response: session.user });
});

Authentication.post("/", async (req, res, next) => {
  const session: SessionData = await getSession(req);
  const userService = new UserService();
  const user = await userService.getUserById(session.user.id);
  session.user = user;
  res.json({ response: user });
});

export default Authentication;
