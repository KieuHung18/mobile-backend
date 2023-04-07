import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import { cloudUpload } from "../../services/cloudinary.service";
import { getUserById } from "../../services/user.service";

const upload = multer({ dest: "uploads/" });
const UploadProfile = express.Router();
UploadProfile.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
UploadProfile.post("/", upload.array("files", 10), async (req: any, res) => {
  const [errors, urls] = await cloudUpload(req.files);
  if (errors.length) {
    res.json({ error: errors });
  } else {
    const user = (await getUserById(27)) as any;
    user.profileUrl = urls[0];
    try {
      await user.save();
      res.json({ response: "success" });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
});
export default UploadProfile;
