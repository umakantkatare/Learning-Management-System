import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import useAuth from "@/hooks/useAuth";
import { checkEnrollment } from "@/api/enrollmentApi";
import { createEnrollmentThunk } from "@/features/enrollment/enrollmentThunk";

import useRazorpayPayment from "./useRazorpayPayment";

const useEnrollment = (course) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { startPayment, isPaying } = useRazorpayPayment();

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loadingEnrollment, setLoadingEnrollment] = useState(true);

  const isInstructor = user?._id === course?.instructor?._id;

  const fetchEnrollmentStatus = async () => {
    if (!course?._id || !user?._id) {
      setLoadingEnrollment(false);
      return;
    }

    try {
      const res = await checkEnrollment(course._id);

      if (res?.data?.success) {
        setIsEnrolled(res.data.enrolled);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingEnrollment(false);
    }
  };

  useEffect(() => {
    fetchEnrollmentStatus();
  }, [course?._id, user?._id]);

  const enrollFreeCourse = async () => {
    const result = await dispatch(createEnrollmentThunk(course._id));

    if (createEnrollmentThunk.fulfilled.match(result)) {
      setIsEnrolled(true);

      toast.success("Successfully enrolled!");

      navigate(`/watch/${course._id}`);
    } else {
      toast.error(result.payload || "Enrollment failed");
    }
  };

  const handleEnroll = async () => {
    try {
      if (!user) {
        toast.error("Please login first");
        return;
      }

      if (isEnrolled) {
        navigate(`/watch/${course._id}`);
        return;
      }

      // Free Course
      if ((course?.discountPrice || 0) === 0) {
        await enrollFreeCourse();
        return;
      }

      // Paid Course
      await startPayment({
        course,
        onSuccess: async () => {
          setIsEnrolled(true);

          navigate(`/watch/${course._id}`);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isEnrolled,
    loadingEnrollment,
    isPaying,
    isInstructor,
    handleEnroll,
    refreshEnrollment: fetchEnrollmentStatus,
  };
};

export default useEnrollment;
