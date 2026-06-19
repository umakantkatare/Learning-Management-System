import {
  createCourseRepo,
  getAllCoursesRepo,
  getPublishedCoursesRepo,
  getCourseByIdRepo,
  getCourseBySlugRepo,
  getInstructorCoursesRepo,
  updateCourseRepo,
  publishCourseRepo,
  unpublishCourseRepo,
  deleteCourseRepo,
} from "../repositories/course.repository.js";
import { deleteFromImageKit, uploadToImageKit } from "../utils/avatar.util.js";
import ApiError from "../utils/error.util.js";
import logger from "../utils/logger.util.js";

/**
 * Create Course
 */
export const createCourseService = async (payload, userId, file) => {
  Object.keys(payload).forEach((key) => {
    if (typeof payload[key] === "string") {
      payload[key] = payload[key].trim();
    }
  });

  if (!payload.title || !payload.description || !payload.category) {
    throw new ApiError("Title, description and category are required", 400);
  }

  payload.price = Number(payload.price || 0);
  payload.discountPrice = Number(payload.discountPrice || 0);

  if (payload.price === 0) {
    payload.isFree = true;
  }

  payload.instructor = userId;

  let uploadedFile = null;

  try {
    if (file) {
      uploadedFile = await uploadToImageKit(file, "/lms/course/thumbnail");

      payload.thumbnail = {
        public_id: uploadedFile.public_id,
        url: uploadedFile.secure_url,
      };
    }

    const course = await createCourseRepo(payload);

    if (!course) {
      throw new ApiError("Course could not be created, please try again", 400);
    }

    return course;
  } catch (error) {
    logger.error("Create Course Error", {
      message: error.message,
      hasFile: !!file,
    });

    if (uploadedFile?.fileId) {
      await deleteFromImageKit(uploadedFile.fileId);
    }

    throw error;
  }
};

/**
 * Get All Courses
 */
export const getAllCoursesService = async () => {
  return await getAllCoursesRepo({ isDeleted: false });
};

/**
 * Get Published Courses
 */
export const getPublishedCoursesService = async () => {
  return await getPublishedCoursesRepo();
};

/**
 * Get Single Course By ID
 */
export const getCourseByIdService = async (courseId) => {
  const course = await getCourseByIdRepo(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  return course;
};

/**
 * Get Single Course By Slug
 */
export const getCourseBySlugService = async (slug) => {
  const course = await getCourseBySlugRepo(slug);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  return course;
};

/**
 * Get Instructor Courses
 */
export const getInstructorCoursesService = async (userId) => {
  return await getInstructorCoursesRepo(userId);
};

/**
 * Update Course
 */
export const updateCourseService = async (courseId, payload, user) => {
  const course = await getCourseByIdRepo(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  if (
    course.instructor._id.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    throw new ApiError("Unauthorized access", 403);
  }

  if (payload.price === 0) {
    payload.isFree = true;
  }

  const updatedCourse = await updateCourseRepo(courseId, payload);

  return updatedCourse;
};

/**
 * Publish Course
 */
export const publishCourseService = async (courseId, user) => {
  const course = await getCourseByIdRepo(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  if (
    course.instructor._id.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    throw new ApiError("Unauthorized access", 403);
  }

  return await publishCourseRepo(courseId);
};

/**
 * Unpublish Course
 */
export const unpublishCourseService = async (courseId, user) => {
  const course = await getCourseByIdRepo(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  if (
    course.instructor._id.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    throw new ApiError("Unauthorized access", 403);
  }

  return await unpublishCourseRepo(courseId);
};

/**
 * Delete Course
 */
export const deleteCourseService = async (courseId, user) => {
  const course = await getCourseByIdRepo(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  if (
    course.instructor._id.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    throw new ApiError("Unauthorized access", 403);
  }

  return await deleteCourseRepo(courseId);
};