import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import useAuth from "@/hooks/useAuth";
import { createOrder, verifyOrder } from "@/api/paymentApi";

const useRazorpayPayment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isPaying, setIsPaying] = useState(false);

  const startPayment = async ({ course, onSuccess }) => {
    try {
      setIsPaying(true);

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return false;
      }

      const response = await createOrder(course._id);
      const order = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.meta.amount,
        currency: order.currency,
        order_id: order.razorpayOrderId,

        name: "Skill Learning",
        description: course?.title,
        image: course?.thumbnail?.url,

        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },

        notes: {
          courseId: course?._id,
          userId: user?._id,
        },

        theme: {
          color: "#000000",
        },

        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled");
          },
        },

        handler: async (response) => {
          try {
            const result = await verifyOrder({
              courseId: course._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (result?.success) {
              toast.success("Payment successful!");

              if (onSuccess) {
                await onSuccess(result);
              } else {
                navigate(`/watch/${course._id}`);
              }
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            toast.error(
              error?.response?.data?.message || "Verification failed",
            );
          }
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        toast.error(
          response?.error?.description || "Payment failed. Please try again.",
        );
      });

      razorpay.open();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsPaying(false);
    }
  };

  return {
    startPayment,
    isPaying,
  };
};

export default useRazorpayPayment;
