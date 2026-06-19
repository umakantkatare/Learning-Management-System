import express from "express";

import {
  createPaymentOrder,
  verifyPayment,
} from "../controllers/payment.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Protected Routes
 */
router.post("/create-order", isAuthenticated, createPaymentOrder);

router.post("/verify", isAuthenticated, verifyPayment);

export default router;
