import express from "express";
import IdealService from "../../services/ideal.service";
import UserService from "../../services/user.service";
import { SessionData, getSession } from "../../middlewares/session.middleware";
import ForbiddenError from "../../errors/forbidden.error";
import ArtworkService from "../../services/artwork.service";
import ConflictError from "../../errors/conflict.error";

const Ideal = express.Router();
const idealService = new IdealService();
const userService = new UserService();

const idealPermission = async (req, res, next) => {
  const session: SessionData = await getSession(req);
  const user = await userService.getUserById(session.user.id);
  const ideal = await idealService.retrive(req.params.id);
  if (await user.hasIdeal(ideal)) {
    next();
  } else {
    next(new ForbiddenError("Fobidden", "Invalid User, action not allow"));
  }
};
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
    let ideals = await user.getIdeals();
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

Ideal.get("/artworks/:id", idealPermission, async (req, res, next) => {
  try {
    const ideal = await idealService.retrive(req.params.id);
    const artworks = await ideal.getArtworks();
    res.json({ response: artworks });
  } catch (error) {
    next(error);
  }
});
Ideal.post("/artworks/:id", idealPermission, async (req, res, next) => {
  try {
    const ideal = await idealService.retrive(req.params.id);
    const artwork = await new ArtworkService().retrive(req.body.id);
    if (await ideal.hasArtwork(artwork)) {
      throw new ConflictError("ArtworkExist", "Ideal already has artwork");
    }
    ideal.addArtwork(artwork);
    res.json({ response: artwork });
  } catch (error) {
    next(error);
  }
});
Ideal.delete("/artworks/:id", idealPermission, async (req, res, next) => {
  try {
    const ideal = await idealService.retrive(req.params.id);
    const artwork = await new ArtworkService().retrive(req.body.id);
    ideal.removeArtwork(artwork);
    res.json({ response: artwork });
  } catch (error) {
    next(error);
  }
});
export default Ideal;
