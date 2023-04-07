import express from "express";
import { create, getUserById, update } from "../../services/user.service";
const User = express.Router();
User.post("/", async (req, res) => {
  try {
    await create(req.body);
    res.json({ response: "user added" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
User.post("/:id", (req, res) => {
  // req.params.id
  console.log(update(req.body.id, req.body.user));
  res.json({ response: "Work in progess... nothing yet" });
});
User.get("/:id", async (req, res) => {
  const user = await getUserById(parseInt(req.params.id));
  if (user) {
    res.json({ response: user });
  } else {
    res.json({ error: "User not found" });
  }
});
User.delete("/:id", (req, res) => {
  // req.params.id
  res.json({ response: "Work in progess... nothing yet" });
});
export default User;
