import express from "express";
import ArtworkService from "../../services/artwork.service";
import UserService from "../../services/user.service";
import { SessionData, getSession } from "../../middlewares/session.middleware";
import ForbiddenError from "../../errors/forbidden.error";
import CloudinaryService from "../../services/cloudinary.service";

const Artwork = express.Router();
const artworkService = new ArtworkService();
const userService = new UserService();

const artWorkPermission = async (req, res, next) => {
  const session: SessionData = await getSession(req);
  const user = await userService.getUserById(session.user.id);
  const artwork = await artworkService.retrive(req.params.id);
  if (user.hasArtwork(artwork)) {
    next();
  } else {
    next(new ForbiddenError("Fobidden", "Invalid User, action not allow"));
  }
};
Artwork.post("/", async (req, res, next) => {
  const session: SessionData = await getSession(req);
  try {
    const user = await userService.getUserById(session.user.id);
    const artwork = await user.createArtwork(req.body);
    res.json({ response: artwork });
  } catch (error) {
    next(error);
  }
});
Artwork.post("/:id", artWorkPermission, async (req, res, next) => {
  try {
    const artwork = await artworkService.update(req.params.id, req.body);
    res.json({ response: artwork });
  } catch (error) {
    next(error);
  }
});

Artwork.get("/", async (req, res, next) => {
  try {
    const session: SessionData = await getSession(req);
    const user = await userService.getUserById(session.user.id);
    const artworks = await user.getArtworks({ order: [["createdAt", "DESC"]] });
    res.json({ response: artworks });
  } catch (error) {
    next(error);
  }
});

Artwork.delete("/:id", artWorkPermission, async (req, res, next) => {
  try {
    const session: SessionData = await getSession(req);
    const user = await userService.getUserById(session.user.id);
    const artwork = await artworkService.retrive(req.params.id);
    if (user.hasArtwork(artwork)) {
      const artwork = await artworkService.delete(req.params.id);
      if (artwork) {
        const cloudinaryService = new CloudinaryService();
        cloudinaryService.delete(artwork.publicId);
      }
      res.json({ response: artwork });
    } else {
      throw new ForbiddenError("Fobidden", "Invalid User, action not allow");
    }
  } catch (error) {
    next(error);
  }
});
export default Artwork;
