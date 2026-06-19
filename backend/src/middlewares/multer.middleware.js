import multer from "multer";
import ApiError from "../utils/error.util.js";
import logger from "../utils/logger.util.js";
import path from "path";

const allowedMimeTypes = [
  "video/mp4",
  "video/mpeg",
  "video/quicktime", // .mov
  "video/x-msvideo", // .avi
  "video/x-matroska", // .mkv
  "video/webm",
];

const storage = multer.memoryStorage();

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    logger.info(`File accepted: ${file.originalname}`);
    cb(null, true);
  } else {
    cb(new ApiError("only images allowed"), false);
  }
};

export const upload = multer({
  storage,
  imageFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const videoFileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError("Only video files are allowed"), false);
  }
};

export const uploadVideo = multer({
  storage,
  fileFilter: videoFileFilter,
});
