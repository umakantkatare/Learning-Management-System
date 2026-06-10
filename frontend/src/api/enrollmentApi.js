import api from "./axios";

// Create Enrollment
export const createEnrollment = async (courseId) => {
  return await api.post(`/enrollment/${courseId}`);
};

// Get My Enrolled Courses
export const getMyEnrollments = async () => {
  return await api.get("/enrollment/my-courses");
};

// Check Enrollment Status
export const checkEnrollment = async (courseId) => {
  return await api.get(`/enrollment/${courseId}`);
};
