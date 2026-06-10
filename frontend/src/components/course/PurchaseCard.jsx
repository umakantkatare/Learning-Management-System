import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle2, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

import useAuth from "@/hooks/useAuth";
import { createOrder, verifyOrder } from "@/api/paymentApi";
import { createEnrollmentThunk } from "@/features/enrollment/enrollmentThunk";
import { checkEnrollment } from "@/api/enrollmentApi";

export default function PurchaseCard({ course }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isPaying, setIsPaying] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loadingEnrollment, setLoadingEnrollment] = useState(true);

  const isInstructor = user?._id === course?.instructor?._id;

  useEffect(() => {
    const fetchEnrollmentStatus = async () => {
      if (!course?._id || !user?._id) return;

      try {
        const res = await checkEnrollment(course._id);
        console.log('enrollment res', res?.data);
        if (res?.data?.success) {
          setIsEnrolled(res.data.enrolled);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingEnrollment(false);
      }
    };

    fetchEnrollmentStatus();
  }, [course?._id, user?._id]);
  const handlePayment = async () => {
    try {
      setIsPaying(true);

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }

      const response = await createOrder(course?._id);

      const order = response.data;

      console.log("Order:", order);

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
          console.log("Razorpay Response:", response);

          try {
            const result = await verifyOrder({
              courseId: course?._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (result?.success) {
              toast.success("Payment successful!");
              navigate(`/watch/${course?._id}`);
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Verification Error:", error);

            toast.error(
              error?.response?.data?.message || "Verification failed",
            );
          }
        },
      };

      console.log("Opening Razorpay with:", {
        amount: options.amount,
        currency: options.currency,
        order_id: options.order_id,
      });

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        console.error("Payment Failed:", response);

        toast.error(
          response?.error?.description || "Payment failed. Please try again.",
        );
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsPaying(false);
    }
  };
  const handleEnroll = async () => {
    try {
      setIsPaying(true);

      if ((course?.discountPrice || 0) === 0) {
        const result = await dispatch(createEnrollmentThunk(course._id));

        if (createEnrollmentThunk.fulfilled.match(result)) {
          toast.success("Successfully enrolled!");
          navigate(`/watch/${course._id}`);
        } else {
          toast.error(result.payload || "Enrollment failed");
        }

        return;
      }

      await handlePayment();
    } finally {
      setIsPaying(false);
    }
  };
  return (
    <div className="relative z-20 lg:-mt-44">
      <Card className="sticky top-24 overflow-hidden rounded-2xl shadow-xl">
        {/* Thumbnail */}
        <img
          src={course?.thumbnail?.url}
          alt={course?.title}
          className="h-56 w-full object-cover"
        />

        <CardContent className="space-y-5 p-5">
          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-primary text-3xl font-bold">
              ₹{course?.discountPrice}
            </span>

            {course?.price && (
              <span className="text-slate-400 line-through">
                ₹{course?.price}
              </span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            {loadingEnrollment ? (
              <Button disabled className="w-full">
                Loading...
              </Button>
            ) : isInstructor || isEnrolled ? (
              <Button
                className="w-full"
                onClick={() => navigate(`/watch/${course._id}`)}
              >
                Go to Course
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={handleEnroll}
                disabled={isPaying}
              >
                {isPaying ? "Processing..." : "Enroll Now"}
              </Button>
            )}
          </div>

          {/* Course Includes */}
          <div className="space-y-3 text-sm text-slate-600">
            <h3 className="font-semibold text-slate-900">
              This course includes:
            </h3>

            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4" />
                {course?.duration} on-demand video
              </p>

              <p className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                Full lifetime access
              </p>

              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Certificate of completion
              </p>

              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Access on mobile & desktop
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
