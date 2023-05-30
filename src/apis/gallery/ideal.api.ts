import express from "express";
import IdealService from "../../services/ideal.service";
import UserService from "../../services/user.service";

const Ideal = express.Router();
const idealService = new IdealService();
const userService = new UserService();

Ideal.get("/", async (req, res, next) => {
  try {
    const artworks = await idealService.publishList();
    res.json({ response: artworks });
  } catch (error) {
    next(error);
  }
});
Ideal.get("/users/:id", async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.id);
    let ideals = await user.getIdeals({
      where: {
        publish: true,
      },
    });
    ideals = await idealService.addThumbnail(ideals);
    ideals = await idealService.getSize(ideals);
    res.json({ response: ideals });
  } catch (error) {
    next(error);
  }
});
export default Ideal;
