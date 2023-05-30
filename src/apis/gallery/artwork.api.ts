import express from "express";
import ArtworkService from "../../services/artwork.service";
import UserService from "../../services/user.service";
import IdealService from "../../services/ideal.service";
const Artwork = express.Router();
const artworkService = new ArtworkService();
const userService = new UserService();
const idealService = new IdealService();

Artwork.get("/", async (req, res, next) => {
  try {
    const artworks = await artworkService.publishList();
    res.json({ response: artworks });
  } catch (error) {
    next(error);
  }
});
Artwork.get("/:id", async (req, res, next) => {
  try {
    const artworks = await artworkService.retrive(req.params.id, {
      where: {
        publissh: true,
      },
    });
    res.json({ response: artworks });
  } catch (error) {
    next(error);
  }
});

Artwork.get("/users/:id", async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    const artworks = await user.getArtworks({
      where: {
        publish: true,
      },
    });
    res.json({ response: artworks });
  } catch (error) {
    next(error);
  }
});
Artwork.get("/ideals/:id", async (req, res, next) => {
  try {
    const ideal = await idealService.retrive(req.params.id);
    const artworks = await ideal.getArtworks({
      where: {
        publish: true,
      },
    });
    res.json({ response: artworks });
  } catch (error) {
    next(error);
  }
});

export default Artwork;
