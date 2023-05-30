import express from "express";
import UserService from "../../services/user.service";
import { SessionData, getSession } from "../../middlewares/session.middleware";
import FollowService from "../../services/follow.service";

const Follow = express.Router();
const userService = new UserService();
const followService = new FollowService();

Follow.post("/", async (req, res, next) => {
  const session: SessionData = await getSession(req);
  try {
    const user = await userService.getUser(session.user.id);
    const followed: boolean = await followService.retrive(
      user.id,
      req.body.followingId
    );
    if (!followed) {
      await user.createFollowing(req.body);
    } else {
      await followService.delete(user.id, req.body.followingId);
    }
    res.json({ response: followed });
  } catch (error) {
    next(error);
  }
});
Follow.get("/users/:id", async (req, res, next) => {
  const session: SessionData = await getSession(req);
  try {
    const user = await userService.getUser(session.user.id);
    const followed: boolean = await followService.retrive(
      user.id,
      req.params.id
    );
    res.json({ response: followed });
  } catch (error) {
    next(error);
  }
});
Follow.get("/", async (req, res, next) => {
  const session: SessionData = await getSession(req);
  try {
    const user = await userService.getUserById(session.user.id);
    const following = await user.getFollowings();
    const follower = await followService.getFollower(user.id);
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

export default Follow;
