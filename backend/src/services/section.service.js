import {
  getCourseByIdRepo,
  addSectionToCourseRepo,
  removeSectionFromCourseRepo,
} from "../repositories/course.repository.js";
import {
  createSectionRepo,
  getSectionByIdRepo,
  getSectionsByCourseRepo,
  updateSectionRepo,
  deleteSectionRepo,
  reorderSectionsRepo,
  addLectureToSectionRepo,
} from "../repositories/section.repository.js";
import ApiError from "../utils/error.util.js";

/**
 * Create Section
 */
export const createSectionService = async (courseId, payload, user) => {
  const course = await getCourseByIdRepo(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }
  const instructorId = course.instructor?._id || course.instructor;

  if (!instructorId && user.role !== "admin") {
    throw new ApiError("Course instructor not assigned", 400);
  }

  if (
    instructorId?.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    throw new ApiError("Unauthorized access", 403);
  }

  if (!payload.title) {
    throw new ApiError("Section title is required", 400);
  }

  const totalSections = course.sections.length;

  const section = await createSectionRepo({
    title: payload.title,
    course: courseId,
    order: totalSections + 1,
  });

  await addSectionToCourseRepo(courseId, section._id);

  return section;
};

/**
 * Get Single Section
 */
export const getSectionByIdService = async (sectionId) => {
  const section = await getSectionByIdRepo(sectionId);

  if (!section) {
    throw new ApiError("Section not found", 404);
  }

  return section;
};

/**
 * Get Course Sections
 */
export const getSectionsByCourseService = async (courseId) => {
  return await getSectionsByCourseRepo(courseId);
};

/**
 * Update Section
 */
export const updateSectionService = async (sectionId, payload, user) => {
  const section = await getSectionByIdRepo(sectionId);

  if (!section) {
    throw new ApiError("Section not found", 404);
  }

  const course = await getCourseByIdRepo(section.course);

  const instructorId = course.instructor?._id || course.instructor;

  if (!instructorId && user.role !== "admin") {
    throw new ApiError("Course instructor not assigned", 400);
  }

  if (
    instructorId?.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    throw new ApiError("Unauthorized access", 403);
  }

  const updated = await updateSectionRepo(sectionId, payload);

  return updated;
};

/**
 * Delete Section
 */
export const deleteSectionService = async (sectionId, user) => {
  const section = await getSectionByIdRepo(sectionId);

  if (!section) {
    throw new ApiError("Section not found", 404);
  }

  const course = await getCourseByIdRepo(section.course);

  const instructorId = course.instructor?._id || course.instructor;

  if (!instructorId && user.role !== "admin") {
    throw new ApiError("Course instructor not assigned", 400);
  }

  if (
    instructorId?.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    throw new ApiError("Unauthorized access", 403);
  }

  await deleteSectionRepo(sectionId);
  await removeSectionFromCourseRepo(course._id, sectionId);

  return true;
};

/**
 * Reorder Sections
 */
export const reorderSectionsService = async (courseId, items, user) => {
  const course = await getCourseByIdRepo(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  const instructorId = course.instructor?._id || course.instructor;

  if (!instructorId && user.role !== "admin") {
    throw new ApiError("Course instructor not assigned", 400);
  }

  if (
    instructorId?.toString() !== user._id.toString() &&
    user.role !== "admin"
  ) {
    throw new ApiError("Unauthorized access", 403);
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new ApiError("Sections data required", 400);
  }

  await reorderSectionsRepo(items);

  return true;
};
