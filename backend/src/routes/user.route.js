import express from "express";


import {
  getProfile,
  updateProfile,
  updateAvatar,
  deleteAccount,
  getDashboard,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * User Routes
 */
router.get("/profile", isAuthenticated, getProfile);

router.patch("/profile", isAuthenticated, updateProfile);

router.patch("/avatar", isAuthenticated, upload.single("avatar"), updateAvatar);

router.delete("/account", isAuthenticated, deleteAccount);

router.get("/dashboard", isAuthenticated, getDashboard);

export default router;

