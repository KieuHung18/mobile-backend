import { User } from "../models/user.model";
export const create = async (user) => {
  await User.create(user);
};
export const getUserById = async (id: number) => {
  const user = await User.findByPk(id);
  if (user === null) {
    console.log("Not found!");
    return undefined;
  } else {
    return user;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
      attributes: {
        exclude: ["hashPassword", "id", "createdAt", "updatedAt"],
      },
    });
    return user;
  } catch (error) {
    return undefined;
  }
};

export const update = async (id, newUser) => {
  const user = await User.findByPk(id);
  if (user === null) {
    return undefined;
  } else {
    Object.assign(user, newUser);
    user.save();
  }
};
