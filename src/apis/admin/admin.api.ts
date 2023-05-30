import express from "express";
import User from "./user.api";
import Artwork from "./artwork.api";
import Report from "./report.api";
import authAdmin from "../../middlewares/auth-admin.middleware";
import Authentication from "../auth/authentication.api";
import Login from "./login";

const Admin = express.Router();

Admin.use("/login", Login);
Admin.use(authAdmin);
Admin.get("/", (req, res) => {
  res.json({ response: "Wellcome to admin" });
});
Admin.use("/artworks", Artwork);
Admin.use("/users", User);
Admin.use("/reports", Report);
Admin.use("/auth", Authentication);

export default Admin;
