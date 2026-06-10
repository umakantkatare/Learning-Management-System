import { createSlice } from "@reduxjs/toolkit";
import {
  getDashboardThunk,
  updateProfileThunk,
  updateAvatarThunk,
  deleteAccountThunk,
} from "./userThunk";

const initialState = {
  dashboard: null,
  loading: false,
  error: null,
  success: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Dashboard
      .addCase(getDashboardThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardThunk.fulfilled, (state, action) => {
        state.dashboard = action.payload.data;
        state.loading = false;
      })
      .addCase(getDashboardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase(updateProfileThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = "Profile updated successfully";
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Avatar
      .addCase(updateAvatarThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAvatarThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = "Avatar updated successfully";
      })
      .addCase(updateAvatarThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Account
      .addCase(deleteAccountThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAccountThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = "Account deleted successfully";
      })
      .addCase(deleteAccountThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserState } = userSlice.actions;

export default userSlice.reducer;
