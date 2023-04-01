import express from "express";
const User = express.Router();

User.get("/:id", (req, res) => {
  // req.params.id
  res.json({ msg: "Work in progess... nothing yet" });
});
export default User;
