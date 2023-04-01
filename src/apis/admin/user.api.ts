import express from "express";
import { create } from "../../services/user.service";
const User = express.Router();
User.post("/", (req, res) => {
  create(req.body);
  res.json({ msg: "user added" });
});
User.post("/:id", (req, res) => {
  // req.params.id
  res.json({ msg: "Work in progess... nothing yet" });
});
User.get("/:id", (req, res) => {
  // req.params.id
  res.json({ msg: "Work in progess... nothing yet" });
});
User.delete("/:id", (req, res) => {
  // req.params.id
  res.json({ msg: "Work in progess... nothing yet" });
});
export default User;
