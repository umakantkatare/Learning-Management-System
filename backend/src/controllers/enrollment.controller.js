// controllers/enrollment.controller.js

import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import {
  createEnrollmentService,
  checkEnrollmentService,
  getMyEnrollmentsService,
} from "../services/enrollment.service.js";

/**
 * POST /api/v1/enrollment/:courseId
 */
export const createEnrollment = asyncHandler(async (req, res) => {
  const enrollment = await createEnrollmentService(
    req.user._id,
    req.params.courseId,
    req.body?.orderId || null,
  );

  res.status(201).json({
    success: true,
    message: "Enrollment successful",
    data: enrollment,
  });
});

/**
 * GET /api/v1/enrollment/:courseId
 */
export const checkEnrollment = asyncHandler(async (req, res) => {
  const result = await checkEnrollmentService(
    req.user._id,
    req.params.courseId,
  );

  res.status(200).json({
    success: true,
    ...result,
  });
});

/**
 * GET /api/v1/enrollment/my-courses
 */
export const getMyEnrollments = asyncHandler(async (req, res) => {
  const data = await getMyEnrollmentsService(req.user._id);

  res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
});
