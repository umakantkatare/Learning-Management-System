import { createSlice } from "@reduxjs/toolkit";

import {
  createCourseThunk,
  getAllCoursesThunk,
  getPublishedCoursesThunk,
  getCourseByIdThunk,
  getCourseBySlugThunk,
  getInstructorCoursesThunk,
  updateCourseThunk,
  publishCourseThunk,
  unpublishCourseThunk,
  deleteCourseThunk,
} from "./courseThunk";

const initialState = {
  courses: [],
  publishedCourses: [],
  instructorCourses: [],
  singleCourse: null,
  currentSection: null,
  loading: false,
  success: false,
  error: null,
  message: "",
};

const courseSlice = createSlice({
  name: "course",

  initialState,

  reducers: {
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },

    addLectureToCourse: (state, action) => {
      const lecture = action.payload;

      if (!state.singleCourse) return;

      if (!Array.isArray(state.singleCourse.lectures)) {
        state.singleCourse.lectures = [];
      }

      const exists = state.singleCourse.lectures.some(
        (l) => l?._id && lecture?._id && l._id === lecture._id,
      );

      if (!exists) {
        state.singleCourse.lectures.push(lecture);
      }
    },

    clearCourseError: (state) => {
      state.error = null;
    },

    clearCourseMessage: (state) => {
      state.message = "";
    },

    resetCourseState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
    },

    clearSingleCourse: (state) => {
      state.singleCourse = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createCourseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createCourseThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.message = action.payload.message || "Course created successfully";

        state.courses.unshift(action.payload.course);
      })

      .addCase(createCourseThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Get All Courses
      .addCase(getAllCoursesThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllCoursesThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.courses = action.payload.data || [];
      })

      .addCase(getAllCoursesThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Get Published Courses
      .addCase(getPublishedCoursesThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getPublishedCoursesThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.publishedCourses = action.payload.data || [];
      })

      .addCase(getPublishedCoursesThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Get Course By ID
      .addCase(getCourseByIdThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getCourseByIdThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.singleCourse = action.payload.data;
      })

      .addCase(getCourseByIdThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Get Course By Slug
      .addCase(getCourseBySlugThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getCourseBySlugThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.singleCourse = action.payload.data;
      })

      .addCase(getCourseBySlugThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Get Instructor Courses
      .addCase(getInstructorCoursesThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getInstructorCoursesThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.instructorCourses = action.payload.data || [];
      })

      .addCase(getInstructorCoursesThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Update Course
      .addCase(updateCourseThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateCourseThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.message = action.payload.message || "Course updated";

        state.courses = state.courses.map((course) =>
          course._id === action.payload.course._id
            ? action.payload.course
            : course,
        );

        state.instructorCourses = state.instructorCourses.map((course) =>
          course._id === action.payload.course._id
            ? action.payload.course
            : course,
        );

        state.singleCourse = action.payload.course;
      })

      .addCase(updateCourseThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Publish
      .addCase(publishCourseThunk.fulfilled, (state, action) => {
        state.message = action.payload.message || "Course published";
      })

      // Unpublish
      .addCase(unpublishCourseThunk.fulfilled, (state, action) => {
        state.message = action.payload.message || "Course unpublished";
      })

      // Delete Course
      .addCase(deleteCourseThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteCourseThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.message = action.payload.message || "Course deleted";

        state.courses = state.courses.filter(
          (course) => course._id !== action.payload.id,
        );

        state.instructorCourses = state.instructorCourses.filter(
          (course) => course._id !== action.payload.id,
        );
      })

      .addCase(deleteCourseThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export const {
  setCurrentSection,
  addLectureToCourse,
  clearCourseError,
  clearCourseMessage,
  resetCourseState,
  clearSingleCourse,
} = courseSlice.actions;

export default courseSlice.reducer;
