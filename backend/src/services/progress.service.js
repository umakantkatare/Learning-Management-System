import {
  createProgressRepo,
  getProgressRepo,
  getAllProgressRepo,
  addCompletedLectureRepo,
  upsertResumeRepo,
} from "../repositories/progress.repository.js";

import { getEnrollmentRepo } from "../repositories/enrollment.repository.js";
import { getCourseByIdRepo } from "../repositories/course.repository.js";
import {
  getLectureByIdRepo,
  getLecturesBySectionRepo,
} from "../repositories/lecture.repository.js";
import { getSectionsByCourseRepo } from "../repositories/section.repository.js";
import ApiError from "../utils/error.util.js";

/**
 * Count total lectures in course
 */
const getTotalLecturesCount = async (courseId) => {
  const sections =
    await getSectionsByCourseRepo(courseId);

  let total = 0;

  for (const section of sections) {
    total += section.lectures.length;
  }

  return total;
};

/**
 * Mark Lecture Complete
 */
export const completeLectureService =
  async (
    userId,
    courseId,
    lectureId
  ) => {
    // enrolled check
    const enrolled =
      await getEnrollmentRepo(
        userId,
        courseId
      );

    if (!enrolled) {
      throw new ApiError(
        "You are not enrolled in this course",
        403
      );
    }

    const course =
      await getCourseByIdRepo(courseId);

    if (!course) {
      throw new ApiError(
        "Course not found",
        404
      );
    }

    const lecture =
      await getLectureByIdRepo(
        lectureId
      );

    if (!lecture) {
      throw new ApiError(
        "Lecture not found",
        404
      );
    }

    let progress =
      await getProgressRepo(
        userId,
        courseId
      );

    if (!progress) {
      progress =
        await createProgressRepo({
          user: userId,
          course: courseId,
          completedLectures: [],
        });
    }

    const alreadyDone =
      progress.completedLectures.some(
        (item) =>
          String(item._id || item) ===
          String(lectureId)
      );

    const totalLectures =
      await getTotalLecturesCount(
        courseId
      );

    let completedCount =
      progress.completedLectures.length;

    if (!alreadyDone) {
      completedCount += 1;
    }

    const percentage =
      totalLectures > 0
        ? Math.round(
            (completedCount /
              totalLectures) *
              100
          )
        : 0;

    const completed =
      completedCount === totalLectures &&
      totalLectures > 0;

    const updated =
      await addCompletedLectureRepo(
        progress._id,
        lectureId,
        {
          $set: {
            lastLecture: lectureId,
            percentage,
            completed,
            completedAt:
              completed
                ? new Date()
                : null,
          },
        }
      );

    return updated;
  };

/**
 * Get Single Course Progress
 */
export const getCourseProgressService =
  async (
    userId,
    courseId
  ) => {
    const enrolled =
      await getEnrollmentRepo(
        userId,
        courseId
      );

    if (!enrolled) {
      throw new ApiError(
        "You are not enrolled in this course",
        403
      );
    }

    let progress =
      await getProgressRepo(
        userId,
        courseId
      );

    if (!progress) {
      progress =
        await createProgressRepo({
          user: userId,
          course: courseId,
        });
    }

    return progress;
  };

/**
 * Resume Course
 */
export const resumeCourseService =
  async (
    userId,
    courseId,
    lectureId
  ) => {
    const enrolled =
      await getEnrollmentRepo(
        userId,
        courseId
      );

    if (!enrolled) {
      throw new ApiError(
        "You are not enrolled in this course",
        403
      );
    }

    const lecture =
      await getLectureByIdRepo(
        lectureId
      );

    if (!lecture) {
      throw new ApiError(
        "Lecture not found",
        404
      );
    }

    return await upsertResumeRepo(
      userId,
      courseId,
      lectureId
    );
  };

/**
 * Get All Progress
 */
export const getAllProgressService =
  async (userId) => {
    return await getAllProgressRepo(
      userId
    );
  };