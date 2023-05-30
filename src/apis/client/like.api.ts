import express from "express";
import UserService from "../../services/user.service";
import { SessionData, getSession } from "../../middlewares/session.middleware";
import LikeService from "../../services/like.service";

const Like = express.Router();
const userService = new UserService();
const likeService = new LikeService();

Like.post("/", async (req, res, next) => {
  const session: SessionData = await getSession(req);
  try {
    const user = await userService.getUser(session.user.id);
    const liked: boolean = await likeService.retrive(
      user.id,
      req.body.artworkId
    );
    if (!liked) {
      await user.createLike(req.body);
    } else {
      await likeService.delete(user.id, req.body.artworkId);
    }
    res.json({ response: { like: "like" } });
  } catch (error) {
    next(error);
  }
});

Like.get("/artworks/:id", async (req, res, next) => {
  const session: SessionData = await getSession(req);
  try {
    const user = await userService.getUser(session.user.id);
    const liked: boolean = await likeService.retrive(user.id, req.params.id);
    res.json({ response: liked });
  } catch (error) {
    next(error);
  }
});
export default Like;
