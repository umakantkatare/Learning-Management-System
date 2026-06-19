import express from "express";

import {
  getDashboard,
  getAllUsers,
  getAllCourses,
  getAllOrders,
  updateUserRole,
  updateUserStatus,
  deleteCourse,
  getAnalytics,
} from "../controllers/admin.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * All Admin Routes Protected
 */
router.use(isAuthenticated, authorizeRoles("admin"));

/**
 * Dashboard
 */
router.get("/dashboard", getDashboard);

/**
 * Users
 */
router.get("/users", getAllUsers);

router.patch("/user/:id/role", updateUserRole);

router.patch("/user/:id/status", updateUserStatus);

/**
 * Courses
 */
router.get("/courses", getAllCourses);

router.delete("/course/:id", deleteCourse);

/**
 * Orders
 */
router.get("/orders", getAllOrders);

/**
 * Analytics
 */
router.get("/analytics", getAnalytics);

export default router;
