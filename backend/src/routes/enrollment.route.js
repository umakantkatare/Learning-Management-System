import express from "express";

import {
  createEnrollment,
  checkEnrollment,
  getMyEnrollments,
} from "../controllers/enrollment.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Protected Routes
 */
router.post("/:courseId", isAuthenticated, createEnrollment);

router.get("/my-courses", isAuthenticated, getMyEnrollments);

router.get("/:courseId", isAuthenticated, checkEnrollment);

export default router;
