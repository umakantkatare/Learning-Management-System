import { getCourseByIdRepo } from "../repositories/course.repository.js";
import {
  createLectureRepo,
  getLectureByIdRepo,
  getLecturesBySectionRepo,
  updateLectureRepo,
  deleteLectureRepo,
  reorderLecturesRepo,
  publishLectureRepo,
  unpublishLectureRepo,
} from "../repositories/lecture.repository.js";
import {
  getSectionByIdRepo,
  addLectureToSectionRepo,
  removeLectureFromSectionRepo,
} from "../repositories/section.repository.js";
import ApiError from "../utils/error.util.js";

/**
 * Create Lecture
 */
export const createLectureService = async (courseId, payload, user) => {
  const course = await getCourseByIdRepo(courseId);
  console.log("lecture body:", payload);
  console.log("lecture user:", user);
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

  const lectureTitle = payload.lectures?.[0]?.title;

  if (!lectureTitle) {
    throw new ApiError("Lecture title is required", 400);
  }
  if (!payload.sectionId) {
    throw new ApiError("sectionId are required", 400);
  }

  const section = await getSectionByIdRepo(payload.sectionId);

  if (!section) {
    throw new ApiError("Section not found", 404);
  }

  const totalLectures = section.lectures.length;

  const lectureDescription = payload.lectures?.[0]?.description;

  const lecture = await createLectureRepo({
    title: lectureTitle,
    description: lectureDescription,
    section: payload.sectionId,
    course: courseId,
    video: payload.lectures[0].video,
    resources: payload.resources || [],
    isPreviewFree: payload.isPreviewFree || false,
    order: totalLectures + 1,
  });

  await addLectureToSectionRepo(payload.sectionId, lecture._id);

  return lecture;
};

/**
 * Get Lecture By Id
 */
export const getLectureByIdService = async (lectureId) => {
  const lecture = await getLectureByIdRepo(lectureId);

  if (!lecture) {
    throw new ApiError("Lecture not found", 404);
  }

  return lecture;
};

/**
 * Get Lectures By Section
 */
export const getLecturesBySectionService = async (sectionId) => {
  return await getLecturesBySectionRepo(sectionId);
};

/**
 * Update Lecture
 */
export const updateLectureService = async (lectureId, payload, user) => {
  const lecture = await getLectureByIdRepo(lectureId);

  if (!lecture) {
    throw new ApiError("Lecture not found", 404);
  }

  const course = await getCourseByIdRepo(lecture.course._id);

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

  return await updateLectureRepo(lectureId, payload);
};

/**
 * Delete Lecture
 */
export const deleteLectureService = async (lectureId, user) => {
  const lecture = await getLectureByIdRepo(lectureId);

  if (!lecture) {
    throw new ApiError("Lecture not found", 404);
  }

  const course = await getCourseByIdRepo(lecture.course._id);

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

  await deleteLectureRepo(lectureId);

  await removeLectureFromSectionRepo(lecture.section._id, lectureId);

  return true;
};

/**
 * Reorder Lectures
 */
export const reorderLecturesService = async (sectionId, items, user) => {
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

  if (!Array.isArray(items) || items.length === 0) {
    throw new ApiError("Lectures data required", 400);
  }

  await reorderLecturesRepo(items);

  return true;
};

/**
 * Publish Lecture
 */
export const publishLectureService = async (lectureId, user) => {
  const lecture = await getLectureByIdRepo(lectureId);

  if (!lecture) {
    throw new ApiError("Lecture not found", 404);
  }

  const course = await getCourseByIdRepo(lecture.course._id);

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

  return await publishLectureRepo(lectureId);
};

/**
 * Unpublish Lecture
 */
export const unpublishLectureService = async (lectureId, user) => {
  const lecture = await getLectureByIdRepo(lectureId);

  if (!lecture) {
    throw new ApiError("Lecture not found", 404);
  }

  const course = await getCourseByIdRepo(lecture.course._id);

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

  return await unpublishLectureRepo(lectureId);
};
