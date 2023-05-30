import BadRequest from "../errors/bad-request.error";
import ConflictError from "../errors/conflict.error";
import NotFoundError from "../errors/not-found.error";
import { User, UserProps } from "../models/user.model";
import bcrypt from "bcrypt";
import { BYCRYPT_SALT_ROUNDS } from "./constant";
import BadRequestError from "../errors/bad-request.error";
import CloudinaryService from "./cloudinary.service";
import { FollowingProps } from "../models/following.model";
import { LikeProps } from "../models/like.model";

class UserService {
  private async hashPassword(password: string): Promise<string> {
    const hashPassword = await bcrypt
      .hash(password, BYCRYPT_SALT_ROUNDS)
      .then(function (hash) {
        return hash;
      });
    return hashPassword;
  }
  public async create(user, isAdmin?: boolean): Promise<UserProps> {
    if (!user.password || !user.email || !user.firstName || !user.lastName) {
      throw new BadRequestError(
        "MissingRequiredField",
        "Required filed not fill"
      );
    }
    if (isAdmin) {
      user.role = "admin";
    } else {
      user.role = "user";
    }
    try {
      user.hashPassword = await this.hashPassword(user.password);
      return (await User.create(user)) as UserProps;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new BadRequest(error.name, error.message);
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new ConflictError("EmailConflict", "Email already exists");
      }
      throw error;
    }
  }

  public async getUserById(id: string): Promise<UserProps> {
    const user = await User.findByPk(id);
    if (user) {
      return user as UserProps;
    } else {
      throw new NotFoundError("UserQueryError", "User not found");
    }
  }

  public async getUser(id: string): Promise<UserProps> {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["hashPassword", "createdAt", "updatedAt", "deleteAt"],
      },
    });
    if (user) {
      return user as UserProps;
    } else {
      throw new NotFoundError("UserQueryError", "User not found");
    }
  }
  public async getFollowingOfUser(
    follows: FollowingProps[]
  ): Promise<UserProps[]> {
    const userIds = [];
    for (const follow of follows) {
      userIds.push(follow.followingId);
    }

    const user = await User.findAll({
      where: { id: userIds },
      attributes: {
        exclude: ["hashPassword", "createdAt", "updatedAt", "deleteAt"],
      },
    });
    return user as UserProps[];
  }
  public async getUserLikeArtwork(likes: LikeProps[]): Promise<UserProps[]> {
    const userIds = [];
    for (const like of likes) {
      userIds.push(like.userId);
    }
    const user = await User.findAll({
      where: { id: userIds },
      attributes: {
        exclude: ["hashPassword", "createdAt", "updatedAt", "deleteAt"],
      },
    });
    return user as UserProps[];
  }
  public async getFollowerOfUser(
    follows: FollowingProps[]
  ): Promise<UserProps[]> {
    const userIds = [];
    for (const follow of follows) {
      userIds.push(follow.userId);
    }

    const user = await User.findAll({
      where: { id: userIds },
      attributes: {
        exclude: ["hashPassword", "createdAt", "updatedAt", "deleteAt"],
      },
    });
    return user as UserProps[];
  }
  public async update(id: string, data: UserProps): Promise<UserProps> {
    if (data.hashPassword) {
      data.hashPassword = await this.hashPassword(data.hashPassword);
    }
    const user = await this.getUserById(id);
    if (user.publicId && data.profileUrl) {
      const cloudinaryService = new CloudinaryService();
      cloudinaryService.delete(user.publicId);
    }
    Object.assign(user, data);
    await user.save();
    return user;
  }
}
export default UserService;
