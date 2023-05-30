import express from "express";
import UserService from "../../services/user.service";
import LikeService from "../../services/like.service";

const User = express.Router();
const userService = new UserService();
const likeService = new LikeService();

User.get("/:id", async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.json({ response: user });
  } catch (error) {
    next(error);
  }
});

export default User;
