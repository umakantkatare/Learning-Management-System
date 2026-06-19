import reviewModel from "../models/nosql/review.model.js";

/**
 * Create Review
 */
export const createReviewRepo = async (payload) => {
  return await reviewModel.create(payload);
};

/**
 * Get Review By Id
 */
export const getReviewByIdRepo = async (reviewId) => {
  return await reviewModel
    .findById(reviewId)
    .populate("user", "name avatar")
    .populate("course", "title slug");
};

/**
 * Get User Review For Course
 */
export const getUserReviewRepo = async (userId, courseId) => {
  return await reviewModel.findOne({
    user: userId,
    course: courseId,
  });
};

/**
 * Get Reviews By Course
 */
export const getReviewsByCourseRepo = async (courseId) => {
  return await reviewModel
    .find({
      course: courseId,
    })
    .populate("user", "name avatar")
    .sort({ createdAt: -1 });
};

/**
 * Update Review
 */
export const updateReviewRepo = async (reviewId, payload) => {
  return await reviewModel
    .findByIdAndUpdate(reviewId, payload, {
      new: true,
      runValidators: true,
    })
    .populate("user", "name avatar")
    .populate("course", "title slug");
};

/**
 * Delete Review
 */
export const deleteReviewRepo = async (reviewId) => {
  return await reviewModel.findByIdAndDelete(reviewId);
};

/**
 * Get Rating Stats By Course
 */
export const getReviewStatsRepo = async (courseId) => {
  const stats = await reviewModel.aggregate([
    {
      $match: {
        course:
          typeof courseId === "string"
            ? new (await import("mongoose")).default.Types.ObjectId(courseId)
            : courseId,
      },
    },
    {
      $group: {
        _id: "$course",
        avgRating: {
          $avg: "$rating",
        },
        totalReviews: {
          $sum: 1,
        },
      },
    },
  ]);

  return (
    stats[0] || {
      avgRating: 0,
      totalReviews: 0,
    }
  );
};
