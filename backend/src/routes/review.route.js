import express from "express";

import {
  createReview,
  updateReview,
  deleteReview,
  getCourseReviews,
} from "../controllers/review.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Public Routes
 */
router.get("/course/:courseId", getCourseReviews);

/**
 * Protected Routes
 */
router.post("/:courseId", isAuthenticated, createReview);

router.put("/:id", isAuthenticated, updateReview);

router.delete("/:id", isAuthenticated, deleteReview);

export default router;
