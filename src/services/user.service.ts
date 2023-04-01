import { User } from "../models/user.model";
export const create = async (user: any) => {
  User.create(user);
};
