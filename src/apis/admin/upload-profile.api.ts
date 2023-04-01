import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import { cloudUpload } from "../../services/cloudinary.service";

const upload = multer({ dest: "uploads/" });
const UploadProfile = express.Router();
UploadProfile.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
UploadProfile.post(
  "/admin/uploads",
  upload.array("files", 10),
  async (req: any, res) => {
    const error = await cloudUpload(req.files);
    if (error.length) {
      res.json({ error: error });
    } else {
      res.json({ msg: "success" });
    }
  }
);
export default UploadProfile;
