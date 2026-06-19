import express from "express";

import {
  createLecture,
  getLectureById,
  getLecturesBySection,
  updateLecture,
  deleteLecture,
  reorderLectures,
  publishLecture,
  unpublishLecture,
} from "../controllers/lecture.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * Public Routes
 */
router.get("/:id", getLectureById);

router.get("/section/:sectionId", getLecturesBySection);

/**
 * Protected Routes
 */

router.post(
  "/course/:courseId",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  
  createLecture,
);
// router.post(
//   "/course/:courseId/lecture",
//   isAuthenticated,
//   authorizeRoles("instructor", "admin"),
//   createLecture,
// );

router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  updateLecture,
);

router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  deleteLecture,
);

router.patch(
  "/reorder",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  reorderLectures,
);

router.patch(
  "/:id/publish",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  publishLecture,
);

router.patch(
  "/:id/unpublish",
  isAuthenticated,
  authorizeRoles("instructor", "admin"),
  unpublishLecture,
);

export default router;
