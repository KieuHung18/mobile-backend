import express from "express";
import ArtworkService from "../../services/artwork.service";
import UserService from "../../services/user.service";

const Artwork = express.Router();
const artworkService = new ArtworkService();
const userService = new UserService();
Artwork.post("/", async (req, res, next) => {
  const artwork = await artworkService.create(req.body);
  const user = await userService.getUserById(
    "b8d7beca-55cc-4b02-b450-dbe8297b4c5a"
  );
  user.addArtwork(artwork);
  res.json({ response: "Work in progess... nothing yet" });
});
Artwork.post("/:id", async (req, res, next) => {
  res.json({ response: "Work in progess... nothing yet" });
});

Artwork.get("/:id", async (req, res, next) => {
  res.json({ response: "Work in progess... nothing yet" });
});
Artwork.delete("/:id", async (req, res) => {
  // req.params.id
  res.json({ response: "Work in progess... nothing yet" });
});
export default Artwork;
