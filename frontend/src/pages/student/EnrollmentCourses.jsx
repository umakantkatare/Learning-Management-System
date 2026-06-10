import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getMyEnrollmentsThunk } from "@/features/enrollment/enrollmentThunk";
import { BookOpen, Clock, GraduationCap, PlayCircle } from "lucide-react";
import { useEffect, useMemo, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function EnrollmentCourses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { enrollments, enrollmentLoading } = useSelector(
    (state) => state.enrollment,
  );

  useEffect(() => {
    dispatch(getMyEnrollmentsThunk());
  }, [dispatch]);

  const stats = useMemo(() => {
    const totalCourses = enrollments.length;

    const completedCourses = enrollments.filter(
      (item) => item.progress === 100,
    ).length;

    const inProgressCourses = enrollments.filter(
      (item) => item.progress > 0 && item.progress < 100,
    ).length;

    return {
      totalCourses,
      completedCourses,
      inProgressCourses,
    };
  }, [enrollments]);

  const continueCourse =
    enrollments.find((item) => item.progress > 0 && item.progress < 100) ||
    enrollments[0];

  if (enrollmentLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090B] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>

          <p className="mt-2 text-zinc-400">Continue your learning journey.</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <BookOpen className="mb-4 h-6 w-6 text-violet-400" />
            <h3 className="text-3xl font-bold">{stats.totalCourses}</h3>
            <p className="mt-1 text-sm text-zinc-400">Purchased Courses</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <Clock className="mb-4 h-6 w-6 text-amber-400" />
            <h3 className="text-3xl font-bold">{stats.inProgressCourses}</h3>
            <p className="mt-1 text-sm text-zinc-400">In Progress</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <GraduationCap className="mb-4 h-6 w-6 text-emerald-400" />
            <h3 className="text-3xl font-bold">{stats.completedCourses}</h3>
            <p className="mt-1 text-sm text-zinc-400">Completed</p>
          </div>
        </div>

        {/* Continue Learning Banner */}
        {continueCourse && (
          <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-r from-violet-950 via-zinc-900 to-zinc-950 p-8">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />

            <div className="relative z-10">
              <p className="mb-2 text-sm uppercase tracking-widest text-violet-300">
                Continue Learning
              </p>

              <h2 className="text-3xl font-bold">
                {continueCourse.course?.title}
              </h2>

              <p className="mt-2 text-zinc-400">
                Progress: {continueCourse.progress || 0}%
              </p>

              <div className="mt-5 max-w-md">
                <Progress value={continueCourse.progress || 0} />
              </div>

              <Button
                onClick={() =>
                  navigate(`/student/course/${continueCourse.course?.slug}`)
                }
                className="mt-6 bg-violet-600 hover:bg-violet-700"
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Resume Course
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {enrollments.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 py-20">
            <BookOpen className="h-12 w-12 text-zinc-600" />

            <h3 className="mt-4 text-xl font-semibold">No Courses Yet</h3>

            <p className="mt-2 text-zinc-400">
              Start learning by purchasing your first course.
            </p>

            <Button className="mt-6 bg-violet-600 hover:bg-violet-700">
              Explore Courses
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {enrollments.map((enrollment) => {
              const course = enrollment.course;

              return (
                <div
                  key={enrollment._id}
                  className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
                >
                  {/* Thumbnail */}
                  <div className="relative">
                    <img
                      src={
                        course?.thumbnail?.url || course?.thumbnail?.secure_url
                      }
                      alt={course?.title}
                      className="h-52 w-full object-cover"
                    />

                    <div className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium backdrop-blur">
                      {enrollment.progress === 100
                        ? "Completed"
                        : "In Progress"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 p-5">
                    <div>
                      <h3 className="line-clamp-1 text-lg font-semibold">
                        {course?.title}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-400">
                        {course?.slug}
                      </p>
                    </div>

                    <Progress value={enrollment.progress || 0} />

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">
                        {enrollment.progress || 0}% Complete
                      </span>

                      <span
                        className={
                          enrollment.progress === 100
                            ? "font-medium text-emerald-400"
                            : "font-medium text-violet-400"
                        }
                      >
                        {enrollment.progress === 100 ? "Completed" : "Continue"}
                      </span>
                    </div>

                    <div className="rounded-lg bg-zinc-800/50 p-3">
                      <p className="text-xs text-zinc-500">Enrolled On</p>

                      <p className="mt-1 text-sm text-zinc-300">
                        {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </p>
                    </div>

                    <Button
                      onClick={() =>
                        navigate(`/watch/${course?._id}`)
                      }
                      className={`w-full ${
                        enrollment.progress === 100
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : "bg-violet-600 hover:bg-violet-700"
                      }`}
                    >
                      {enrollment.progress === 100
                        ? "Review Course"
                        : "Continue Learning"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { getMyEnrollmentsThunk } from "@/features/enrollment/enrollmentThunk";
// import { BookOpen, Clock, GraduationCap, PlayCircle } from "lucide-react";
// import { useEffect, useMemo, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function EnrollmentCourses() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [enrollments, setEnrollments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await dispatch(getMyEnrollmentsThunk());

//         if (res?.payload?.success) {
//           setEnrollments(res.payload.data || []);
//         }
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [dispatch]);

//   const stats = useMemo(() => {
//     const totalCourses = enrollments.length;

//     const completedCourses = enrollments.filter(
//       (item) => item.progress === 100,
//     ).length;

//     const inProgressCourses = enrollments.filter(
//       (item) => item.progress > 0 && item.progress < 100,
//     ).length;

//     return {
//       totalCourses,
//       completedCourses,
//       inProgressCourses,
//     };
//   }, [enrollments]);

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#09090B] text-white">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#09090B] text-white">
//       <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
//         {/* Header */}
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>

//           <p className="mt-2 text-zinc-400">Continue your learning journey.</p>
//         </div>

//         {/* Stats */}
//         <div className="grid gap-4 md:grid-cols-3">
//           <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
//             <BookOpen className="mb-4 h-6 w-6 text-violet-400" />

//             <h3 className="text-3xl font-bold">{stats.totalCourses}</h3>

//             <p className="mt-1 text-sm text-zinc-400">Purchased Courses</p>
//           </div>

//           <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
//             <Clock className="mb-4 h-6 w-6 text-amber-400" />

//             <h3 className="text-3xl font-bold">{stats.inProgressCourses}</h3>

//             <p className="mt-1 text-sm text-zinc-400">In Progress</p>
//           </div>

//           <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
//             <GraduationCap className="mb-4 h-6 w-6 text-emerald-400" />

//             <h3 className="text-3xl font-bold">{stats.completedCourses}</h3>

//             <p className="mt-1 text-sm text-zinc-400">Completed</p>
//           </div>
//         </div>

//         {/* Empty State */}
//         {enrollments.length === 0 ? (
//           <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 py-20">
//             <BookOpen className="h-12 w-12 text-zinc-600" />

//             <h3 className="mt-4 text-xl font-semibold">No Courses Yet</h3>

//             <p className="mt-2 text-zinc-400">
//               Start learning by purchasing your first course.
//             </p>

//             <Button className="mt-6 bg-violet-600 hover:bg-violet-700">
//               Explore Courses
//             </Button>
//           </div>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
//             {enrollments.map((enrollment) => {
//               const course = enrollment.course;

//               return (
//                 <div
//                   key={enrollment._id}
//                   className="
//                     group
//                     overflow-hidden
//                     rounded-2xl
//                     border
//                     border-zinc-800
//                     bg-zinc-900/50
//                     transition-all
//                     duration-300
//                     hover:-translate-y-1
//                     hover:border-violet-500/40
//                     hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]
//                   "
//                 >
//                   {/* Thumbnail */}
//                   <div className="relative">
//                     <img
//                       src={course?.thumbnail?.url}
//                       alt={course?.title}
//                       className="h-52 w-full object-cover"
//                     />

//                     <div className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium backdrop-blur">
//                       {enrollment.progress === 100
//                         ? "Completed"
//                         : "In Progress"}
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="space-y-4 p-5">
//                     <div>
//                       <h3 className="line-clamp-1 text-lg font-semibold">
//                         {course?.title}
//                       </h3>

//                       <p className="mt-1 text-sm text-zinc-400">
//                         {course?.slug}
//                       </p>
//                     </div>

//                     <Progress value={enrollment.progress || 0} />

//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-zinc-400">
//                         {enrollment.progress || 0}% Complete
//                       </span>

//                       <span
//                         className={
//                           enrollment.progress === 100
//                             ? "font-medium text-emerald-400"
//                             : "font-medium text-violet-400"
//                         }
//                       >
//                         {enrollment.progress === 100 ? "Completed" : "Continue"}
//                       </span>
//                     </div>

//                     <div className="rounded-lg bg-zinc-800/50 p-3">
//                       <p className="text-xs text-zinc-500">Enrolled On</p>

//                       <p className="mt-1 text-sm text-zinc-300">
//                         {new Date(enrollment.enrolledAt).toLocaleDateString()}
//                       </p>
//                     </div>

//                     <Button
//                       onClick={() => navigate(`/watch/${course._id}`)}
//                       className={`w-full ${
//                         enrollment.progress === 100
//                           ? "bg-emerald-600 hover:bg-emerald-700"
//                           : "bg-violet-600 hover:bg-violet-700"
//                       }`}
//                     >
//                       {enrollment.progress === 100
//                         ? "Review Course"
//                         : "Continue Learning"}
//                     </Button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
