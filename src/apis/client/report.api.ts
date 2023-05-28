import express from "express";
import { SessionData, getSession } from "../../middlewares/session.middleware";
import UserService from "../../services/user.service";

const Report = express.Router();

Report.post("/", async (req, res, next) => {
  const userService = new UserService();
  const session: SessionData = await getSession(req);
  try {
    const user = await userService.getUserById(session.user.id);
    const report = await user.createReport(req.body);
    res.json({ response: report });
  } catch (error) {
    next(error);
  }
});
export default Report;
