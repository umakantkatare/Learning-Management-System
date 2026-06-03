import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  getCourseBySlug,
  getInstructorCourses,
  getPublishedCourses,
  publishCourse,
  unpublishCourse,
  updateCourse,
} from "@/api/courseApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Create Course
 */
export const createCourseThunk = createAsyncThunk(
  "course/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createCourse(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Create course failed",
      );
    }
  },
);

/**
 * Get All Courses
 */
export const getAllCoursesThunk = createAsyncThunk(
  "course/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllCourses();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Fetch all courses failed",
      );
    }
  },
);

/**
 * Get Published Courses
 */
export const getPublishedCoursesThunk = createAsyncThunk(
  "course/getPublished",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getPublishedCourses();
      console.log('published course:', res);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Fetch published courses failed",
      );
    }
  },
);

/**
 * Get Course By ID
 */
export const getCourseByIdThunk = createAsyncThunk(
  "course/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getCourseById(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Fetch course failed",
      );
    }
  },
);

/**
 * Get Course By Slug
 */
export const getCourseBySlugThunk = createAsyncThunk(
  "course/getBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await getCourseBySlug(slug);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Fetch course failed",
      );
    }
  },
);

/**
 * Get Instructor Courses
 */
export const getInstructorCoursesThunk = createAsyncThunk(
  "course/getInstructorCourses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getInstructorCourses();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Fetch instructor courses failed",
      );
    }
  },
);

/**
 * Update Course
 */
export const updateCourseThunk = createAsyncThunk(
  "course/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateCourse(id, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Update course failed",
      );
    }
  },
);

/**
 * Publish Course
 */
export const publishCourseThunk = createAsyncThunk(
  "course/publish",
  async (id, { rejectWithValue }) => {
    try {
      const res = await publishCourse(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Publish course failed",
      );
    }
  },
);

/**
 * Unpublish Course
 */
export const unpublishCourseThunk = createAsyncThunk(
  "course/unpublish",
  async (id, { rejectWithValue }) => {
    try {
      const res = await unpublishCourse(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Unpublish course failed",
      );
    }
  },
);

/**
 * Delete Course
 */
export const deleteCourseThunk = createAsyncThunk(
  "course/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await deleteCourse(id);
      return { id, ...res.data };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Delete course failed",
      );
    }
  },
);
