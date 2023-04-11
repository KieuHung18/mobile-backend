import express from "express";
import { getUserByEmail } from "../../services/user.service";
const User = express.Router();

User.get("/:email", async (req, res, next) => {
  try {
    const user = await getUserByEmail(req.params.email);
    res.json({ response: user });
  } catch (error) {
    next(error);
  }
});
export default User;
