import api from "./axios";

export const registerUser = (data) => {
  return api.post("/auth/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

export const getProfile = () => {
  return api.get("/auth/me");
};

export const logoutUser = (data) => {
  return api.post("/auth/logout", data);
};

export const forgotPassword = (data) => {
  return api.post("/auth/forgot-password", data);
};
export const resetPassword = (token, data) => {
  return api.post(`/auth/reset-password/${token}`, data);
};

export const changePassword = (data) => {
  return api.patch("/auth/change-password", data);
};

export const refreshToken = () => {
  return api.post("/auth/refresh-token");
};
