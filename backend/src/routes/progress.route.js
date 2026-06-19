import express from "express";

import {
  completeLecture,
  getCourseProgress,
  resumeCourse,
  getAllProgress,
} from "../controllers/progress.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * All Progress Routes Require Login
 */
router.use(isAuthenticated);

/**
 * GET /api/v1/progress/all
 */
router.get("/all", getAllProgress);

/**
 * POST /api/v1/progress/complete
 */
router.post("/complete", completeLecture);

/**
 * PATCH /api/v1/progress/resume/:courseId
 */
router.patch("/resume/:courseId", resumeCourse);

/**
 * GET /api/v1/progress/:courseId
 */
router.get("/:courseId", getCourseProgress);

export default router;
