import express from "express";

import {
  createCourse,
  getAllCourses,
  getPublishedCourses,
  getCourseBySlug,
  getCourseById,
  getInstructorCourses,
  updateCourse,
  publishCourse,
  unpublishCourse,
  deleteCourse,
} from "../controllers/course.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { upload } from './../middlewares/multer.middleware.js';

const router = express.Router();

/**
 * Public Routes
 */
router.get("/all", getAllCourses);
router.get("/published", getPublishedCourses);
router.get("/id/:id", getCourseById);
router.get("/:slug", getCourseBySlug);

/**
 * Instructor / Admin Routes
 */
router.post(
  "/create",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  upload.single("thumbnail"),
  createCourse,
);

router.get(
  "/instructor/my-courses",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  getInstructorCourses,
);

router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  updateCourse,
);

router.patch(
  "/:id/publish",
  isAuthenticated,
  authorizeRoles("instructor", "ADMIN"),
  publishCourse,
);

router.patch(
  "/:id/unpublish",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  unpublishCourse,
);

router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  deleteCourse,
);

export default router;
