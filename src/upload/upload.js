import multer from "multer";
import Upload from "./uploadModel.js";
import { v4 } from "uuid";
import { fileSize, processImage } from "./thumbnail.js";
import fs from "fs";
import path from "path";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const uuid = v4();
    // console.log(file);
    let origin = file.originalname.split(`.${ext}`)[0];
    let name = origin.replace(/ /g, "_");
    cb(null, `${name}_${uuid}.${ext}`);
  },
});

export const vidUpload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "no file found" });
    const fileName = req.file.filename;
    const originalName = req.file.originalname;
    const mimeType = req.file.mimetype;
    const ext = req.file.mimetype.split("/")[1];
    const videoPath = path.join(process.cwd(), `files/${fileName}`);
    const thumbPath = path.join(process.cwd(), `thumbnails`);
    const imagePath = path.join(
      process.cwd(),
      `thumbnails/${fileName.split(`.${ext}`)[0]}-thumbnail.${ext}`
    );
    let thumbnailName;

    if (req.file.mimetype.split("/")[0] === "image") {
      await processImage(videoPath, imagePath);
      thumbnailName = `thumbnails/${
        fileName.split(`.${ext}`)[0]
      }-thumbnail.${ext}`;
    }
    let size = await fileSize(videoPath);
    const download = `/download/files/${fileName}`;
    const title = originalName.split(`.${ext}`)[0];
    const body = {
      originalname: originalName,
      filename: fileName,
      thumbnail: thumbnailName,
      title,
      ext,
      size,
      download,
    };

    await Upload.create(body);

    res.status(200).json({ message: "the item was uploaded successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err?.message);
  }
};
const upload = multer({ storage: multerStorage });

export const uploads = upload.single("file");
export const getUploads = async (req, res) => {
  try {
    const files = await Upload.find();
    res.status(200).json(files);
  } catch (err) {
    console.log(err);
  }
};
export const getUpload = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "invalid id" });
    }

    const file = await Upload.findById(id);
    res.status(200).json(file);
  } catch (err) {
    console.log(err);
  }
};
export const updateUpload = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "invalid id" });
    }
    const vid = await Upload.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(vid);
  } catch (err) {
    console.log(err);
  }
};
export const deleteUpload = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    if (!id) {
      res.status(400).json({ message: "invalid id params" });
    }
    const vid = await Upload.findById(id);
    if (!vid) {
      res.status(404).json({ message: "file does not exist" });
    }
    const filePath = `files/${vid.filename}`;
    fs.accessSync(filePath, fs.constants.F_Ok, (err) => {
      if (err) {
        res
          .status(404)
          .json({ message: "the file does not exist or cannot be found" });
      }
      return;
    });
    fs.unlinkSync(filePath, (err) => {
      if (err) {
        res.status(500).json(err?.message);
      } else {
        console.log("file deleted successfully");
      }
    });
    await Upload.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    res.status(404).json(err?.message);
  }
};
