import api from "./axios";

export const addSection = async (courseId, payload) => {
  const res = await api.post(`/section/course/${courseId}`, payload);

  return res.data;
};

export const getSection = async (courseId) => {
  const res = await api.get(`/section/course/${courseId}`);

  return res.data;
};

export const updateSection = async (sectionId, payload) => {
  const res = await api.patch(`/section/${sectionId}`, payload);

  return res.data;
};

export const deleteSection = async (sectionId) => {
  const res = await api.delete(`/section/${sectionId}`);

  return res.data;
};
