import fs from "fs";
import cloudinary = require("cloudinary");

const cloudinaryV2 = cloudinary.v2;
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const cloudUpload = async (files) => {
  const error = [];
  for (const file of files) {
    await cloudinaryV2.uploader
      .upload(file.path, { public_id: file.originalname })
      .then((data) => {
        console.log("upload success", data);
        fs.rm(file.path, (err) => {
          console.error("delete file fail", err);
        });
      })
      .catch((err) => {
        error.push(err);
        console.error("cloud upload", err);
      });
  }
  return error;
};
