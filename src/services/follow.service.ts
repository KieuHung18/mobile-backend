import { Following, FollowingProps } from "../models/following.model";
class FollowService {
  public async getFollower(userId: string): Promise<FollowingProps[]> {
    const follower = (await Following.findAll({
      where: {
        followingId: userId,
      },
    })) as FollowingProps[];
    return follower;
  }
  public async countFollower(followingId: string): Promise<number> {
    const follower = (await Following.count({
      where: {
        followingId: followingId,
      },
    })) as number;
    return follower;
  }

  public async retrive(userId: string, followingId: string): Promise<boolean> {
    const followed = await Following.findOne({
      where: {
        userId: userId,
        followingId: followingId,
      },
    });
    if (followed) {
      return true;
    } else {
      return false;
    }
  }
  public async delete(userId: string, followingId: string): Promise<boolean> {
    const following = await Following.destroy({
      where: {
        userId: userId,
        followingId: followingId,
      },
    });
    if (following) {
      return true;
    } else {
      return false;
    }
  }
}
export default FollowService;
