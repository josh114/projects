import { Router } from "express";
import {
  uploads,
  vidUpload,
  getUploads,
  getUpload,
  updateUpload,
  deleteUpload,
} from "./upload.js";
const uploadRouter = Router();

uploadRouter.route("/").post(uploads, vidUpload).get(getUploads);
uploadRouter
  .route("/:id")
  .get(getUpload)
  .patch(updateUpload)
  .delete(deleteUpload);

export default uploadRouter;
