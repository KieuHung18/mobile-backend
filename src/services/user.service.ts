import BadRequest from "../errors/bad-request.error";
import ConflictError from "../errors/conflict.error";
import NotFoundError from "../errors/not-found.error";
import { User, UserProps } from "../models/user.model";

class UserService {
  public async create(user): Promise<UserProps> {
    try {
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

  public async getUserByEmail(email: string) {
    const user = await User.findOne({
      where: {
        email: email,
      },
      attributes: {
        exclude: ["hashPassword", "id", "createdAt", "updatedAt"],
      },
    });
    if (user) {
      return user;
    } else {
      throw new NotFoundError("UserQueryError", "User not found");
    }
  }

  public async update(id: string, data: UserProps) {
    // eslint-disable-next-line no-useless-catch
    const user = await this.getUserById(id);
    Object.assign(user, data);
    user.save();
  }
}
export default UserService;
