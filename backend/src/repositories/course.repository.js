import courseModel from "../models/nosql/course.model.js";
// repositories/course.repo.js


/**
 * Create Course
 */
export const createCourseRepo = async (payload) => {
  return await courseModel.create(payload);
};

/**
 * Get All Courses
 */
export const getAllCoursesRepo = async (filter = {}) => {
  return await courseModel.find(filter)
    .populate("instructor", "name email")
    .sort({ createdAt: -1 });
};

/**
 * Get Published Courses
 */
export const getPublishedCoursesRepo = async () => {
  return await courseModel.find({
    status: "published",
    isDeleted: false,
  })
    .populate("instructor", "name")
    .sort({ createdAt: -1 });
};

/**
 * Get Single Course By ID
 */
export const getCourseByIdRepo = async (courseId) => {
  return await courseModel.findOne({
    _id: courseId,
    isDeleted: false,
  })
    .populate("instructor", "name email")
    .populate({
      path: "sections",
      populate: {
        path: "lectures",
      },
    });
};

/**
 * Get Course By Slug
 */
export const getCourseBySlugRepo = async (slug) => {
  return await courseModel.findOne({
    slug,
    isDeleted: false,
  })
    .populate("instructor", "name email")
    .populate({
      path: "sections",
      populate: {
        path: "lectures",
      },
    });
};

/**
 * Get Instructor Courses
 */
export const getInstructorCoursesRepo = async (userId) => {
  return await courseModel.find({
    instructor: userId,
    isDeleted: false,
  }).sort({ createdAt: -1 });
};

/**
 * Update Course
 */
export const updateCourseRepo = async (courseId, payload) => {
  return await courseModel.findByIdAndUpdate(courseId, payload, {
    new: true,
    runValidators: true,
  });
};

/**
 * Publish Course
 */
export const publishCourseRepo = async (courseId) => {
  return await courseModel.findByIdAndUpdate(
    courseId,
    { status: "published" },
    { new: true }
  );
};

/**
 * Unpublish Course
 */
export const unpublishCourseRepo = async (courseId) => {
  return await courseModel.findByIdAndUpdate(
    courseId,
    { status: "unpublished" },
    { new: true }
  );
};

/**
 * Soft Delete Course
 */
export const deleteCourseRepo = async (courseId) => {
  return await courseModel.findByIdAndUpdate(
    courseId,
    { isDeleted: true },
    { new: true }
  );
};

/**
 * Add Section In Course
 */
export const addSectionToCourseRepo = async (courseId, sectionId) => {
  return await courseModel.findByIdAndUpdate(
    courseId,
    { $push: { sections: sectionId } },
    { new: true }
  );
};

/**
 * Remove Section From Course
 */
export const removeSectionFromCourseRepo = async (courseId, sectionId) => {
  return await courseModel.findByIdAndUpdate(
    courseId,
    { $pull: { sections: sectionId } },
    { new: true }
  );
};
