import mongoose from "mongoose";
const uploadSchema = mongoose.Schema(
  {
    originalname: {
      type: String,
    },
    filename: {
      type: String,
    },
    tags: [String],
    size: {
      type: Number,
    },
    title: {
      type: String,
    },
    caption: {
      type: String,
    },
    download: {
      type: String,
    },
    author: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    ext: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Upload = mongoose.model("Upload", uploadSchema);
export default Upload;
