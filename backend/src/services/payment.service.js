import crypto from "crypto";
import Razorpay from "razorpay";
import ApiError from "./../utils/error.util.js";

import { getCourseByIdRepo } from "../repositories/course.repository.js";
import {
  createOrderRepo,
  getPendingOrderRepo,
  getOrderByRazorpayOrderIdRepo,
  getOrderByPaymentIdRepo,
  updateOrderByRazorpayOrderIdRepo,
} from "../repositories/payment.repository.js";
import {
  getEnrollmentRepo,
  createEnrollmentRepo,
  addEnrolledCourseRepo,
} from "../repositories/enrollment.repository.js";
import { razorpay } from "../configs/payment.config.js";
import logger from './../utils/logger.util.js';

/**
 * Create Razorpay Order
 */
export const createPaymentOrderService = async (userId, courseId) => {
  const enrolled = await getEnrollmentRepo(userId, courseId);
  console.log("userId:", userId);
  console.log("courseId:", courseId);
  if (enrolled) {
    throw new ApiError("You are already enrolled in this course", 400);
  }

  const course = await getCourseByIdRepo(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  if (course.isFree || course.price === 0) {
    throw new ApiError("This is a free course. Payment not required", 400);
  }

  const pendingOrder = await getPendingOrderRepo(userId, courseId);

  if (pendingOrder) {
    return pendingOrder;
  }

  const amount =
    (course.discountPrice && course.discountPrice > 0
      ? course.discountPrice
      : course.price) * 100;

  const razorpayOrder = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: `rcpt_${Date.now()}`,
    notes: {
      userId: String(userId),
      courseId: String(courseId),
    },
  });

  const order = await createOrderRepo({
    user: userId,
    course: courseId,
    amount: amount / 100,
    currency: "INR",
    provider: "razorpay",
    razorpayOrderId: razorpayOrder.id,
    status: "created",
    meta: razorpayOrder,
  });

  return order;
};

/**
 * Verify Payment + Enroll
 */

export const verifyPaymentService = async (payload, userId) => {
  logger.info("=== PAYMENT VERIFICATION STARTED ===");

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    payload;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new ApiError("Payment verification data missing", 400);
  }

  const paidByPaymentId = await getOrderByPaymentIdRepo(razorpay_payment_id);

  if (paidByPaymentId) {
    return paidByPaymentId;
  }

  const order = await getOrderByRazorpayOrderIdRepo(razorpay_order_id);

  if (!order) {
    throw new ApiError("Order not found", 404);
  }

  if (String(order.user) !== String(userId)) {
    throw new ApiError("Unauthorized payment access", 403);
  }

  if (order.status === "paid") {
    return order;
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    await updateOrderByRazorpayOrderIdRepo(razorpay_order_id, {
      status: "failed",
      failureReason: "Invalid payment signature",
    });

    throw new ApiError("Payment verification failed", 400);
  }

  const updatedOrder = await updateOrderByRazorpayOrderIdRepo(
    razorpay_order_id,
    {
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: "paid",
      paidAt: new Date(),
    },
  );

  if (!updatedOrder) {
    throw new ApiError("Failed to update payment order", 500);
  }

  const enrolled = await getEnrollmentRepo(userId, order.course);

  if (!enrolled) {
    await createEnrollmentRepo({
      user: userId,
      course: order.course,
      order: updatedOrder._id,
    });

    await addEnrolledCourseRepo(userId, order.course);
  }

  logger.info("=== PAYMENT VERIFICATION COMPLETED ===");

  return updatedOrder;
};
