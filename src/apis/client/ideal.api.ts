import express from "express";
import IdealService from "../../services/ideal.service";
import UserService from "../../services/user.service";
import { SessionData, getSession } from "../../middlewares/session.middleware";
import idealPermission from "../../middlewares/ideal-permission.middleware";

const Ideal = express.Router();
const idealService = new IdealService();
const userService = new UserService();

Ideal.post("/", async (req, res, next) => {
  const session: SessionData = await getSession(req);
  try {
    const user = await userService.getUserById(session.user.id);
    const ideal = await user.createIdeal(req.body);
    res.json({ response: ideal });
  } catch (error) {
    next(error);
  }
});

Ideal.get("/", async (req, res, next) => {
  try {
    const session: SessionData = await getSession(req);
    const user = await userService.getUserById(session.user.id);
    let ideals = await user.getIdeals({ order: [["createdAt", "DESC"]] });
    ideals = await idealService.addThumbnail(ideals);
    ideals = await idealService.getSize(ideals);
    res.json({ response: ideals });
  } catch (error) {
    next(error);
  }
});

Ideal.post("/:id", idealPermission, async (req, res, next) => {
  try {
    const ideal = await idealService.update(req.params.id, req.body);
    res.json({ response: ideal });
  } catch (error) {
    next(error);
  }
});

Ideal.delete("/:id", idealPermission, async (req, res, next) => {
  try {
    const ideal = await idealService.retrive(req.params.id);
    await idealService.delete(req.params.id);
    res.json({ response: ideal });
  } catch (error) {
    next(error);
  }
});

export default Ideal;
