import { Like } from "../models/like.model";
class LikeService {
  public async retrive(userId: string, artworkId: string): Promise<boolean> {
    const like = await Like.findOne({
      where: {
        userId: userId,
        artworkId: artworkId,
      },
    });
    if (like) {
      return true;
    } else {
      return false;
    }
  }
  public async delete(userId: string, artworkId: string): Promise<boolean> {
    const like = await Like.destroy({
      where: {
        userId: userId,
        artworkId: artworkId,
      },
    });
    if (like) {
      return true;
    } else {
      return false;
    }
  }
}
export default LikeService;
