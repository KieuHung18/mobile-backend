import express from "express";
import AuthenService from "../../services/authen.service";
import { SessionData } from "../../middlewares/session.middleware";
import ForbiddenError from "../../errors/forbidden.error";

const Login = express.Router();
const authenService = new AuthenService();

Login.post("/", async (req, res, next) => {
  const session: SessionData = req.session;
  const { email, password } = req.body;
  try {
    const user = await authenService.authen(email, password);
    console.log(user.role);

    if (user.role === "user") {
      throw new ForbiddenError(
        "PermissionDenied",
        "User role permission denied"
      );
    } else {
      session.user = user;
      res.json({ response: session.id });
    }
  } catch (error) {
    next(error);
  }
});
export default Login;
