import api from "./axios";

export const createLecture = async (courseId, payload) => {
  const res = await api.post(`/lecture/course/${courseId}`, payload);
  return res.data;
};

export const getLecturesBySection = async (sectionId) => {
  const res = await api.get(`/lecture/section/${sectionId}`);
  return res.data;
};

export const editLecture = async (lectureId, payload) => {
  const res = await api.put(`/lecture/${lectureId}`, payload);
  return res.data;
};

export const deleteLecture = async (lectureId) => {
  const res = await api.delete(`/lecture/${lectureId}`);
  return res.data;
};
