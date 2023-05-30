import ForbiddenError from "../errors/forbidden.error";
import { getSession } from "./session.middleware";

const authAdmin = async (req, res, next) => {
  const session = await getSession(req);
  if (session && session.user && session.user.role === "admin") {
    next();
  } else {
    next(new ForbiddenError("PermissionDenied", "User role permission denied"));
  }
};
export default authAdmin;
