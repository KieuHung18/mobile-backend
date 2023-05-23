import BadRequest from "../errors/bad-request.error";
import ConflictError from "../errors/conflict.error";
import NotFoundError from "../errors/not-found.error";
import { User, UserProps } from "../models/user.model";
import bcrypt from "bcrypt";
import { BYCRYPT_SALT_ROUNDS } from "./constant";
import BadRequestError from "../errors/bad-request.error";
import { log } from "console";

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
    console.log(user);
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

  public async getUserByEmail(email: string): Promise<UserProps> {
    const user = (await User.findOne({
      where: {
        email: email,
      },
      attributes: {
        exclude: ["hashPassword", "createdAt", "updatedAt"],
      },
    })) as UserProps;
    if (user) {
      return user;
    } else {
      throw new NotFoundError("UserQueryError", "User not found");
    }
  }

  public async update(id: string, data: UserProps) {
    if (data.hashPassword) {
      data.hashPassword = await this.hashPassword(data.hashPassword);
    }
    const user = await this.getUserById(id);
    Object.assign(user, data);
    user.save();
  }
}
export default UserService;
