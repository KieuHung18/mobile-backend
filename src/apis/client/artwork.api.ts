import express from "express";
import UserService from "../../services/user.service";
const Artwork = express.Router();

Artwork.get("/:email", async (req, res, next) => {
  try {
    const userService = new UserService();
    const user = await userService.getUserByEmail(req.params.email);
    const artworks = await user.getArtworks();
    res.json({ response: artworks });
  } catch (error) {
    next(error);
  }
});
export default Artwork;
