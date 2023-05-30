import express from "express";
import ArtworkService from "../../services/artwork.service";
import { LikeProps } from "../../models/like.model";
import UserService from "../../services/user.service";

const Like = express.Router();
const artworkService = new ArtworkService();
const userService = new UserService();

Like.get("/count/artworks/:id", async (req, res, next) => {
  try {
    const artwork = await artworkService.retrive(req.params.id);
    const count: number = await artwork.countLikes();
    res.json({ response: count });
  } catch (error) {
    next(error);
  }
});
Like.get("/users/artworks/:id", async (req, res, next) => {
  try {
    const artwork = await artworkService.retrive(req.params.id);
    const likes: LikeProps[] = await artwork.getLikes();
    const users = await userService.getUserLikeArtwork(likes);
    console.log(users);
    res.json({ response: users });
  } catch (error) {
    next(error);
  }
});

export default Like;
