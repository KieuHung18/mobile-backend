import BadRequest from "../errors/bad-request.error";
import ConflictError from "../errors/conflict.error";
import NotFoundError from "../errors/not-found.error";
import { User, UserProps } from "../models/user.model";

export const create = async (user) => {
  try {
    await User.create(user);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      throw new BadRequest(error.name, error.message);
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new ConflictError("EmailConflict", "Email already exists");
    }
    throw error;
  }
};

export const getUserById = async (id: number) => {
  const user = await User.findByPk(id);
  if (user) {
    return user;
  } else {
    throw new NotFoundError("UserQueryError", "User not found");
  }
};

export const getUserByEmail = async (email: string) => {
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
};

export const update = async (id: number, data: UserProps) => {
  // eslint-disable-next-line no-useless-catch
  const user = await getUserById(id);
  Object.assign(user, data);
  user.save();
};
