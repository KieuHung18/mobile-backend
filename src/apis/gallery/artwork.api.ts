import express from "express";
import ArtworkService from "../../services/artwork.service";

const Artwork = express.Router();
const artworkService = new ArtworkService();

Artwork.get("/", async (req, res, next) => {
  try {
    const artworks = await artworkService.publishList();
    res.json({ response: artworks });
  } catch (error) {
    next(error);
  }
});

export default Artwork;
