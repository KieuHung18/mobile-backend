import fs from "fs";
import cloudinary = require("cloudinary");
import dotenv from "dotenv";

dotenv.config();

const cloudinaryV2 = cloudinary.v2;
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const cloudUpload = async (files) => {
  const errors = [];
  const urls = [];
  for (const file of files) {
    try {
      await cloudinaryV2.uploader
        .upload(file.path, { public_id: file.originalname })
        .then((data) => {
          urls.push(data.url);
        });
    } catch (error) {
      errors.push(error);
      console.error("cloud upload", error);
    } finally {
      fs.rm(file.path, (err) => {
        if (err) {
          console.error("delete file fail", err);
        }
      });
    }
  }
  return [errors, urls];
};
