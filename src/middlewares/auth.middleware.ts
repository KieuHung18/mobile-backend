import UnauthorizedError from "../errors/unauthorized.error";
const authUser = async (req, res, next) => {
  const session = req.session;
  if (session.user) {
    next();
  } else {
    next(new UnauthorizedError("NotLogin", "User not login permission denied"));
  }
};

export default authUser;
