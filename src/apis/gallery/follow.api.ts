import express from "express";
import UserService from "../../services/user.service";
import FollowService from "../../services/follow.service";
import { User } from "../../models/user.model";

const Follow = express.Router();
const userService = new UserService();
const followService = new FollowService();

Follow.get("/count/users/:id", async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    const following = await user.countFollowings();
    const follower = await followService.countFollower(user.id);
    res.json({
      response: {
        following: following,
        follower: follower,
      },
    });
  } catch (error) {
    next(error);
  }
});
Follow.get("/following/users/:id", async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    const followings = await user.getFollowings();
    const followingUsers = await userService.getFollowingOfUser(followings);
    res.json({
      response: followingUsers,
    });
  } catch (error) {
    next(error);
  }
});
Follow.get("/follower/users/:id", async (req, res, next) => {
  try {
    const followers = await followService.getFollower(req.params.id);
    const followingUser = await userService.getFollowerOfUser(followers);
    res.json({
      response: followingUser,
    });
  } catch (error) {
    next(error);
  }
});

export default Follow;
