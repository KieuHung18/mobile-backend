import express from "express";
import AuthenService from "../../services/authen.service";
import authUser from "../../middlewares/auth.middleware";
import UserService from "../../services/user.service";
import { SessionData, getSession } from "../../middlewares/session.middleware";
import { UserProps } from "../../models/user.model";

const Authentication = express.Router();
const authenService = new AuthenService();
const userService = new UserService();

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

Authentication.post("/register", async (req, res, next) => {
  try {
    const user: UserProps = await userService.create(req.body);
    const session: SessionData = req.session;
    session.user = user;
    res.json({ response: session.id });
  } catch (error) {
    next(error);
  }
});

Authentication.use(authUser);
Authentication.post("/", async (req, res, next) => {
  const session: SessionData = req.session;
  try {
    const user = await userService.getUserById((await getSession(req)).user.id);
    session.user = user;
    res.json({ response: session.id });
  } catch (error) {
    next(error);
  }
});
Authentication.post("/resetPassword", async (req, res, next) => {
  const session: SessionData = await getSession(req);
  try {
    const user = await userService.getUserById(session.user.id);
    await authenService.authen(user.email, req.body.password);
    const newPassword = await userService.hashPassword(req.body.newPassword);
    user.hashPassword = newPassword;
    user.save();
    res.json({ response: "Success" });
  } catch (error) {
    next(error);
  }
  // let session: SessionData = await getSession(req);
  // try {
  //   const user = await userService.getUserById(session.user.id);
  //   const authUser = await authenService.authen(user.email, req.body.password);
  //   const newPassword = await userService.hashPassword(req.body.newPassword);
  //   user.hashPassword = newPassword;
  //   user.save();
  //   session = req.session;
  //   session.user = authUser;
  //   res.json({ response: req.session.id });
  // } catch (error) {
  //   next(error);
  // }
});
Authentication.get("/", async (req, res, next) => {
  const session: SessionData = await getSession(req);
  try {
    res.json({ response: session.user });
  } catch (error) {
    next(error);
  }
});

export default Authentication;
