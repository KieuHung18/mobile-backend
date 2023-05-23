import UnauthorizedError from "../errors/unauthorized.error";
import { getSession } from "./session.middleware";

const authUser = async (req, res, next) => {
  const session = await getSession(req);
  if (session && session.user) {
    next();
  } else {
    next(new UnauthorizedError("NotLogin", "User not login permission denied"));
  }
};
export default authUser;
