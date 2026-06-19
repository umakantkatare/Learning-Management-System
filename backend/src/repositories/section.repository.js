import sectionModel from "../models/nosql/section.model.js";
import lectureModel from './../models/nosql/lecture.model.js';

/**
 * Create Section
 */
export const createSectionRepo = async (payload) => {
  return await sectionModel.create(payload);
};

/**
 * Get Section By Id
 */
export const getSectionByIdRepo = async (sectionId) => {
  return await sectionModel.findById(sectionId).populate("lectures");
};

/**
 * Get Sections By Course
 */
export const getSectionsByCourseRepo = async (courseId) => {
  return await sectionModel
    .find({ course: courseId })
    .populate("lectures")
    .sort({ order: 1, createdAt: 1 });
};

/**
 * Update Section
 */
export const updateSectionRepo = async (sectionId, payload) => {
  return await sectionModel.findByIdAndUpdate(sectionId, payload, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete Section
 */
export const deleteSectionRepo = async (sectionId) => {
  return await sectionModel.findByIdAndDelete(sectionId);
};

/**
 * Reorder Sections
 * payload example:
 * [
 *   { sectionId: "...", order: 1 },
 *   { sectionId: "...", order: 2 }
 * ]
 */
export const reorderSectionsRepo = async (items = []) => {
  const operations = items.map((item) => ({
    updateOne: {
      filter: { _id: item.sectionId },
      update: { $set: { order: item.order } },
    },
  }));

  return await sectionModel.bulkWrite(operations);
};

/**
 * Add Lecture In Section
 */
export const addLectureToSectionRepo = async (sectionId, lectureId) => {
  await sectionModel.findByIdAndUpdate(sectionId, {
    $push: { lectures: lectureId },
  });

  const lectures = await lectureModel.find({
    section: sectionId,
  });

  const totalDuration = lectures.reduce(
    (acc, lecture) => acc + (lecture.video?.duration || 0),
    0,
  );

  return await sectionModel.findByIdAndUpdate(
    sectionId,
    {
      totalLectures: lectures.length,
      totalDuration,
    },
    { new: true },
  );
};

/**
 * Remove Lecture From Section
 */
export const removeLectureFromSectionRepo = async (sectionId, lectureId) => {
  return await sectionModel.findByIdAndUpdate(
    sectionId,
    {
      $pull: { lectures: lectureId },
      $inc: { totalLectures: -1 },
    },
    { new: true },
  );
};
