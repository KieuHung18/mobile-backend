import { User, initModels } from "../models/index";
export const create = async (user: User) => {
  initModels().User.create(user);
};
