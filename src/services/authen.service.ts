import UnauthorizedError from "../errors/unauthorized.error";
import { User, UserProps } from "../models/user.model";
import bcrypt from "bcrypt";

class AuthenService {
  public async authen(email: string, password: string): Promise<UserProps> {
    const user = (await User.findOne({
      where: {
        email: email,
      },
    })) as UserProps;

    if (user) {
      const match = await bcrypt.compare(password, user.hashPassword);
      if (match) {
        return user;
      }
    }
    throw new UnauthorizedError(
      "UserUnauthorized",
      "Authentication failed permisssion denied"
    );
  }
}
export default AuthenService;
