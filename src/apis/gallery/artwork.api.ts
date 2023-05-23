import express from "express";
import ArtworkService from "../../services/artwork.service";

const Artwork = express.Router();
const artworkService = new ArtworkService();

Artwork.get("/", async (req, res, next) => {
  try {
    const artworks = await artworkService.list();
    res.json({ response: artworks });
  } catch (error) {
    next(error);
  }
});

Artwork.get("/id", async (req, res, next) => {
  res.json({ response: "artworks" });
  // try {
  //   const session: SessionData = await getSession(req);
  //   const user = await userService.getUserById(session.user.id);
  //   const artworks = await user.getArtworks();
  //   res.json({ response: artworks });
  // } catch (error) {
  //   next(error);
  // }
});
export default Artwork;
