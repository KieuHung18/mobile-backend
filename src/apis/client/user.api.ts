import express from "express";
import UserService from "../../services/user.service";
import { SessionData, getSession } from "../../middlewares/session.middleware";

const User = express.Router();
const userService = new UserService();

User.post("/", async (req, res, next) => {
  const session: SessionData = await getSession(req);
  try {
    await userService.update(session.user.id, req.body);
    res.json({ response: "Updated success" });
  } catch (error) {
    next(error);
  }
});

export default User;
