import paymentModel from "../models/nosql/payment.model.js";
/**
 * Create Order
 */
export const createOrderRepo = async (payload) => {
  return await paymentModel.create(payload);
};

/**
 * Get Order By Id
 */
export const getOrderByIdRepo = async (orderId) => {
  return await paymentModel
    .findById(orderId)
    .populate("user", "name email")
    .populate("course", "title slug price");
};

/**
 * Get Order By Razorpay Order Id
 */
export const getOrderByRazorpayOrderIdRepo = async (razorpayOrderId) => {
  return await paymentModel.findOne({ razorpayOrderId });
};

/**
 * Get Order By Payment Id
 */
export const getOrderByPaymentIdRepo = async (razorpayPaymentId) => {
  return await paymentModel.findOne({ razorpayPaymentId });
};

/**
 * Get User Orders
 */
export const getUserOrdersRepo = async (userId) => {
  return await paymentModel
    .find({ user: userId })
    .populate("course", "title slug thumbnail")
    .sort({ createdAt: -1 });
};

/**
 * Get Existing Active Order
 * Used to prevent duplicate create-order requests
 */
export const getPendingOrderRepo = async (userId, courseId) => {
  return await paymentModel
    .findOne({
      user: userId,
      course: courseId,
      status: { $in: ["created", "pending"] },
    })
    .sort({ createdAt: -1 });
};

/**
 * Update Order
 */
export const updateOrderRepo = async (orderId, payload) => {
  return await paymentModel.findByIdAndUpdate(orderId, payload, {
    new: true,
    runValidators: true,
  });
};

/**
 * Update By Razorpay Order Id
 */
export const updateOrderByRazorpayOrderIdRepo = async (
  razorpayOrderId,
  payload,
) => {
  return await paymentModel.findOneAndUpdate({ razorpayOrderId }, payload, {
    new: true,
  });
};
