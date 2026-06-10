import { createSlice } from "@reduxjs/toolkit";
import {
  createEnrollmentThunk,
  getMyEnrollmentsThunk,
} from "./enrollmentThunk";

const initialState = {
  enrollments: [],
  loading: false,
  enrollmentLoading: false,
  error: null,
  success: false,
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,

  reducers: {
    clearEnrollmentState: (state) => {
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // Create Enrollment
      .addCase(createEnrollmentThunk.pending, (state) => {
        state.enrollmentLoading = true;
        state.error = null;
      })
      .addCase(createEnrollmentThunk.fulfilled, (state, action) => {
        state.enrollmentLoading = false;
        state.success = true;

        // Optional: push newly created enrollment
        if (action.payload?.enrollment) {
          state.enrollments.push(action.payload.enrollment);
        }
      })
      .addCase(createEnrollmentThunk.rejected, (state, action) => {
        state.enrollmentLoading = false;
        state.error = action.payload;
      })

      // Get My Enrollments
      .addCase(getMyEnrollmentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyEnrollmentsThunk.fulfilled, (state, action) => {
        state.loading = false;

        // Adjust according to your API response
        state.enrollments =
          action.payload?.enrollments || action.payload?.data || [];
      })
      .addCase(getMyEnrollmentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEnrollmentState } = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
