import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  deleteFile,
  signVideoUpload,
  uploadImage,
} from "../controllers/upload.controller.js";

const router = express.Router();

/**
 * All Upload Routes Protected
 */
router.use(isAuthenticated);

/**
 * POST /api/v1/upload/image
 * student/instructor/admin
 */

// router.post("/image", upload, uploadImage);

/**
 * POST /api/v1/upload/sign-video
 * instructor/admin only
 */
router.post(
  "/sign-video",
  authorizeRoles("instructor", "admin"),
  signVideoUpload,
);

/**
 * DELETE /api/v1/upload/:publicId
 */
router.delete("/:publicId", authorizeRoles("instructor", "admin"), deleteFile);

export default router;
