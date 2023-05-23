import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import CloudinaryService from "../../services/cloudinary.service";

const upload = multer({ dest: "uploads/" });
const Upload = express.Router();
const cloudinaryService = new CloudinaryService();
Upload.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
Upload.post("/", upload.single("file"), async (req, res, next) => {
  try {
    const uploadedFile = await cloudinaryService.upload(req.file);
    res.json({ response: uploadedFile });
  } catch (error) {
    next(error);
  }
});
Upload.delete("/:id", async (req, res, next) => {
  try {
    await cloudinaryService.delete(req.params.id);
    res.json({ response: "File deleted" });
  } catch (error) {
    next(error);
  }
});
export default Upload;
