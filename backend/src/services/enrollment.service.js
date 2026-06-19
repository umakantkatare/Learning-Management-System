import {
  getEnrollmentRepo,
  getUserEnrollmentsRepo,
  createEnrollmentRepo,
} from "../repositories/enrollment.repository.js";


import { getOrderByIdRepo } from "../repositories/payment.repository.js";
import { getCourseByIdRepo } from "../repositories/course.repository.js";
import ApiError from "../utils/error.util.js";

/**
 * Manual Enrollment
 * (Admin / Free Course)
 */
export const createEnrollmentService = async (
  userId,
  courseId,
  orderId = null,
) => {
  // course check
  const course = await getCourseByIdRepo(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  // already enrolled
  const existing = await getEnrollmentRepo(userId, courseId);

  if (existing) {
    throw new ApiError("Already enrolled in this course", 400);
  }

  if (!course.isFree && course.price > 0) {
    if (!orderId) {
      throw new ApiError("Paid order required for enrollment", 400);
    }

    const order = await getOrderByIdRepo(orderId);

    if (!order) {
      throw new ApiError("Order not found", 404);
    }

    if (
      String(order.user._id) !== String(userId) ||
      String(order.course._id) !== String(courseId)
    ) {
      throw new ApiError("Invalid order for enrollment", 400);
    }

    if (order.status !== "paid") {
      throw new ApiError("Payment not completed", 400);
    }
  }

  const enrollment = await createEnrollmentRepo({
    user: userId,
    course: courseId,
    order: orderId,
  });

  return enrollment;
};

/**
 * Check Enrollment
 */
export const checkEnrollmentService = async (userId, courseId) => {
  const enrollment = await getEnrollmentRepo(userId, courseId);

  return {
    enrolled: !!enrollment,
    data: enrollment || null,
  };
};

/**
 * My Enrolled Courses
 */
export const getMyEnrollmentsService = async (userId) => {
  return await getUserEnrollmentsRepo(userId);
};
