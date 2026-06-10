import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDashboard,
  updateProfile,
  updateAvatar,
  deleteAccount,
} from "@/api/userApi";

export const getDashboardThunk = createAsyncThunk(
  "user/dashboard",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getDashboard();
      console.log('dashboard data:', data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard",
      );
    }
  },
);

export const updateProfileThunk = createAsyncThunk(
  "user/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await updateProfile(profileData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  },
);

export const updateAvatarThunk = createAsyncThunk(
  "user/updateAvatar",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await updateAvatar(formData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update avatar",
      );
    }
  },
);

export const deleteAccountThunk = createAsyncThunk(
  "user/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await deleteAccount();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete account",
      );
    }
  },
);
