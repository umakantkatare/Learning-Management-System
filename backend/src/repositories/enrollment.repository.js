import enrollmentModel from "../models/nosql/enrollment.model.js";
import userModel from './../models/nosql/user.model.js';

/**
 * Create Enrollment
 */
export const createEnrollmentRepo = async (payload) => {
  return await enrollmentModel.create(payload);
};

/**
 * Check Enrollment
 */
export const getEnrollmentRepo = async (userId, courseId) => {
  return await enrollmentModel.findOne({
    user: userId,
    course: courseId,
  });
};

/**
 * My Enrollments
 */
export const getUserEnrollmentsRepo = async (userId) => {
  return await enrollmentModel
    .find({
      user: userId,
    })
    .populate("course", "title slug thumbnail")
    .sort({ createdAt: -1 });
};

export const addEnrolledCourseRepo = async (userId, courseId) => {
  return userModel.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        enrolledCourses: courseId,
      },
    },
    {
      new: true,
    },
  );
};
