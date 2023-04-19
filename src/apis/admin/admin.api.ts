import express from "express";
import Uploads from "./uploads.api";
import User from "./user.api";
import Artwork from "./artwork.api";

const Admin = express.Router();

Admin.get("/", (req, res) => {
  res.json({ response: "Work in progess... nothing yet" });
});
Admin.use("/users", User);
Admin.use("/artworks", Artwork);
Admin.use("/uploads", Uploads);

export default Admin;
