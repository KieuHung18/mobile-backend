import express from "express";
import UploadProfile from "./upload-profile.api";
import User from "./user.api";

const Admin = express.Router();

Admin.get("/", (req, res) => {
  res.json({ msg: "Work in progess... nothing yet" });
});
Admin.use("/users", User);
Admin.use("/upload-profile", UploadProfile);

export default Admin;
