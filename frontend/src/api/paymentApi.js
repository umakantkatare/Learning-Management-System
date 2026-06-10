import api from "./axios";

export const createOrder = async (courseId) => {
  const { data } = await api.post("/payment/create-order", {
    courseId,
  });

  return data;
};

export const verifyOrder = async (paymentData) => {
  const { data } = await api.post("/payment/verify", paymentData);
  return data;
};
