import * as express from "express";
import * as multer from "multer";
import ImageUploader from "../../utilities/S3";
import * as path from "path";

const uploadsRouter = express.Router();

const storage = multer.memoryStorage();
const uploader = multer({ storage });

uploadsRouter.post("/", uploader.single("Food Photo"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "File not submitted to be uploaded" });
  }
  // at this point req.file exist

  try {
    const extension = path.extname(req.file.originalname);

    const pureFileName = req.file.originalname.replace(extension, "");

    const newName = `${pureFileName}_${Date.now()}${extension}`;

    const uploadResults = await ImageUploader(req.file.buffer, newName);
    res.status(200).json({ msg: "file uploaded successfully", url: uploadResults.Location });
  } catch (error) {
    res.status(500).json({ msg: "Error uploading file" });
  }
});

export default uploadsRouter;
