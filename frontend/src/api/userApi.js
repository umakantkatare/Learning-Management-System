import api from "./axios";

// Get User Profile
export const getProfile = () => {
  return api.get("/user/profile");
};

// Update User Profile
export const updateProfile = (data) => {
  return api.patch("/user/profile", data);
};

// Update Avatar
export const updateAvatar = (formData) => {
  return api.patch("/user/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete Account
export const deleteAccount = () => {
  return api.delete("/user/account");
};

// Get Dashboard Data
export const getDashboard = () => {
  return api.get("/user/dashboard");
};
