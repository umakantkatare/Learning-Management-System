import { createEnrollment, getMyEnrollments } from "@/api/enrollmentApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Create Enrollment
export const createEnrollmentThunk = createAsyncThunk(
  "enrollment/create",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await createEnrollment(courseId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to enroll",
      );
    }
  },
);

// Get My Enrollments
export const getMyEnrollmentsThunk = createAsyncThunk(
  "enrollment/getMyEnrollments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMyEnrollments();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch enrollments",
      );
    }
  },
);
