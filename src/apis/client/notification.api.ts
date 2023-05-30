import express from "express";
import { SessionData, getSession } from "../../middlewares/session.middleware";
import UserService from "../../services/user.service";

const Notification = express.Router();

Notification.get("/", async (req, res, next) => {
  const userService = new UserService();
  const session: SessionData = await getSession(req);
  try {
    const user = await userService.getUserById(session.user.id);
    const notifications = await user.getNotifications();
    res.json({ response: notifications });
  } catch (error) {
    next(error);
  }
});

export default Notification;
