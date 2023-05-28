import express from "express";
import User from "./user.api";
import Artwork from "./artwork.api";
import Report from "./report.api";

const Admin = express.Router();

Admin.get("/", (req, res) => {
  res.json({ response: "Wellcome to admin" });
});
Admin.use("/users", User);
Admin.use("/artworks", Artwork);
Admin.use("/reports", Report);

export default Admin;
