import express from "express";

import { getMyOrders, getOrderById } from "../controllers/order.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Protected Routes
 */
router.get("/my-orders", isAuthenticated, getMyOrders);

router.get("/:id", isAuthenticated, getOrderById);

export default router;
