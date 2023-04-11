import fs from "fs";
import cloudinary = require("cloudinary");
import dotenv from "dotenv";
import TimeoutError from "../errors/timeout.error";

dotenv.config();

const cloudinaryV2 = cloudinary.v2;
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const cloudUpload = async (files) => {
  const urls = [];
  for (const file of files) {
    try {
      await cloudinaryV2.uploader
        .upload(file.path, { public_id: file.originalname })
        .then((data) => {
          urls.push(data.url);
        });
    } catch (error) {
      throw new TimeoutError(
        "CloudinaryConnectionError",
        "Cant connect to cloudinary"
      );
    } finally {
      fs.rm(file.path, (err) => {
        if (err) {
          console.error("Delete file fail", err);
        }
      });
    }
  }
  return urls;
};
