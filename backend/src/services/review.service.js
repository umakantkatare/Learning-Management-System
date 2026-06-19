import {
  createReviewRepo,
  getReviewByIdRepo,
  getUserReviewRepo,
  getReviewsByCourseRepo,
  updateReviewRepo,
  deleteReviewRepo,
  getReviewStatsRepo,
} from "../repositories/review.repository.js";

import { getEnrollmentRepo } from "../repositories/enrollment.repository.js";
import {
  getCourseByIdRepo,
  updateCourseRepo,
} from "../repositories/course.repository.js";
import ApiError from "../utils/error.util.js";

/**
 * Recalculate course rating
 */
const refreshCourseRating = async (courseId) => {
  const stats = await getReviewStatsRepo(courseId);

  await updateCourseRepo(courseId, {
    rating: Number(stats.avgRating.toFixed(1)),
    totalReviews: stats.totalReviews || 0,
  });
};

/**
 * Create Review
 */
export const createReviewService = async (userId, courseId, payload) => {
  const course = await getCourseByIdRepo(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  const enrolled = await getEnrollmentRepo(userId, courseId);

  if (!enrolled) {
    throw new ApiError("Only enrolled users can review this course", 403);
  }

  const existing = await getUserReviewRepo(userId, courseId);

  if (existing) {
    throw new ApiError("You already reviewed this course", 400);
  }

  const rating = Number(payload.rating);

  if (!rating || rating < 1 || rating > 5) {
    throw new ApiError("Rating must be between 1 and 5", 400);
  }

  const review = await createReviewRepo({
    user: userId,
    course: courseId,
    rating,
    comment: payload.comment || "",
  });

  await refreshCourseRating(courseId);

  return review;
};

/**
 * Update Review
 */
export const updateReviewService = async (reviewId, user, payload) => {
  const review = await getReviewByIdRepo(reviewId);

  if (!review) {
    throw new ApiError("Review not found", 404);
  }

  if (String(review.user._id) !== String(user._id) && user.role !== "admin") {
    throw new ApiError("Unauthorized access", 403);
  }

  const data = {
    isEdited: true,
  };

  if (payload.rating !== undefined) {
    const rating = Number(payload.rating);

    if (rating < 1 || rating > 5) {
      throw new ApiError("Rating must be between 1 and 5", 400);
    }

    data.rating = rating;
  }

  if (payload.comment !== undefined) {
    data.comment = payload.comment;
  }

  const updated = await updateReviewRepo(reviewId, data);

  await refreshCourseRating(review.course._id);

  return updated;
};

/**
 * Delete Review
 */
export const deleteReviewService = async (reviewId, user) => {
  const review = await getReviewByIdRepo(reviewId);

  if (!review) {
    throw new ApiError("Review not found", 404);
  }

  if (String(review.user._id) !== String(user._id) && user.role !== "admin") {
    throw new ApiError("Unauthorized access", 403);
  }

  await deleteReviewRepo(reviewId);

  await refreshCourseRating(review.course._id);

  return true;
};

/**
 * Get Course Reviews
 */
export const getCourseReviewsService = async (courseId) => {
  const course = await getCourseByIdRepo(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  const reviews = await getReviewsByCourseRepo(courseId);

  const stats = await getReviewStatsRepo(courseId);

  return {
    reviews,
    summary: {
      averageRating: Number((stats.avgRating || 0).toFixed(1)),
      totalReviews: stats.totalReviews || 0,
    },
  };
};
