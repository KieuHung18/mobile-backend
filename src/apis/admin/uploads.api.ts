import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import { cloudUpload } from "../../services/cloudinary.service";

const upload = multer({ dest: "uploads/" });
const Uploads = express.Router();
Uploads.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
Uploads.post("/", upload.array("files", 10), async (req, res, next) => {
  try {
    const urls = await cloudUpload(req.files);
    res.json({ response: urls });
  } catch (error) {
    next(error);
  }
});
export default Uploads;
