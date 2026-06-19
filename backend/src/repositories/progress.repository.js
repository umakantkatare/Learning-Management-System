import progressModel from "./../models/nosql/progress.model.js";

/**
 * Create Progress
 */
export const createProgressRepo = async (payload) => {
  return await progressModel.create(payload);
};

/**
 * Get Progress by User + Course
 */
export const getProgressRepo = async (userId, courseId) => {
  return await progressModel
    .findOne({
      user: userId,
      course: courseId,
    })
    .populate("course", "title slug thumbnail")
    .populate("completedLectures", "title order section")
    .populate("lastLecture", "title order section");
};

/**
 * Get All User Progress
 */
export const getAllProgressRepo = async (userId) => {
  return await progressModel
    .find({
      user: userId,
    })
    .populate("course", "title slug thumbnail")
    .sort({ updatedAt: -1 });
};

/**
 * Update Progress
 */
export const updateProgressRepo = async (progressId, payload) => {
  return await progressModel.findByIdAndUpdate(progressId, payload, {
    new: true,
    runValidators: true,
  });
};

/**
 * Add Completed Lecture
 */
export const addCompletedLectureRepo = async (
  progressId,
  lectureId,
  payload,
) => {
  return await progressModel.findByIdAndUpdate(
    progressId,
    {
      $addToSet: {
        completedLectures: lectureId,
      },
      ...payload,
    },
    { new: true },
  );
};

/**
 * Upsert Resume Progress
 */
export const upsertResumeRepo = async (userId, courseId, lectureId) => {
  return await progressModel.findOneAndUpdate(
    {
      user: userId,
      course: courseId,
    },
    {
      $set: {
        lastLecture: lectureId,
      },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );
};
