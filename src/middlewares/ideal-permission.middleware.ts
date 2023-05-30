import { SessionData, getSession } from "./session.middleware";
import UserService from "../services/user.service";
import IdealService from "../services/ideal.service";
import ForbiddenError from "../errors/forbidden.error";

const idealPermission = async (req, res, next) => {
  const session: SessionData = await getSession(req);
  const userService = new UserService();
  const idealService = new IdealService();
  const user = await userService.getUserById(session.user.id);
  const ideal = await idealService.retrive(req.params.id);
  if (await user.hasIdeal(ideal)) {
    next();
  } else {
    next(new ForbiddenError("Fobidden", "Invalid User, action not allow"));
  }
};
export default idealPermission;
