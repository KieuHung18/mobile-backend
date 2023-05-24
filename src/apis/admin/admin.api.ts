import express from "express";
import User from "./user.api";
import Artwork from "./artwork.api";
import authUser from "../../middlewares/auth.middleware";

const Admin = express.Router();

Admin.use(authUser);
Admin.get("/", (req, res) => {
  res.json({ response: "Wellcome to admin" });
});
Admin.use("/users", User);
Admin.use("/artworks", Artwork);

export default Admin;
