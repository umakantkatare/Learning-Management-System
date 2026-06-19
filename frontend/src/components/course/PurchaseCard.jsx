import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle2, Clock3 } from "lucide-react";
import useEnrollment from "@/hooks/useEnrollment";
import { useNavigate } from "react-router-dom";

export default function PurchaseCard({ course }) {
  const navigate = useNavigate();
  const {
    isEnrolled,
    loadingEnrollment,
    isPaying,
    isInstructor,
    handleEnroll,
  } = useEnrollment(course);

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
                disabled={loadingEnrollment || isPaying}
              >
                {isEnrolled ? "Go To Course" : "Enroll Now"}
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
