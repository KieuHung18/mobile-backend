import express from "express";
import { getUserByEmail } from "../../services/user.service";
const User = express.Router();

User.get("/:email", async (req, res) => {
  const user = await getUserByEmail(req.params.email);
  if (user) {
    res.json({ response: user });
  } else {
    res.json({ error: "User not found" });
  }
});
export default User;
