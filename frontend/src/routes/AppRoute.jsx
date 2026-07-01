import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import SkeletonUI from "@/components/layout/SkeletonUI";

const Homepage = lazy(() => import("../pages/HomePage"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ChangePassword = lazy(
  () => import("../components/dashboard/ChangePassword"),
);
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const Course = lazy(() => import("../pages/course/Course"));
const EnrollmentCourses = lazy(
  () => import("../pages/student/EnrollmentCourses"),
);
const CourseDetails = lazy(() => import("../pages/course/CourseDetails"));
const ContactPage = lazy(() => import("../pages/contact/ContactPage"));
const CreateCoursePage = lazy(() => import("../pages/course/CreateCourse"));
const WatchCourse = lazy(() => import("../pages/course/WatchCourse"));
const ManageCoursePage = lazy(() => import("../pages/course/ManageCoursePage"));
const CurriculumPage = lazy(
  () => import("../components/course/CurriculumList"),
);
const CourseCurriculum = lazy(() => import("../pages/course/CourseCurriculam"));
const MyCoursePage = lazy(() => import("../pages/instructor/MyCoursePage"));
const Profile = lazy(() => import("../pages/dashboard/Profile"));

const withSuspense = (Component) => (
  <Suspense fallback={<SkeletonUI />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(Homepage),
  },
  {
    path: "/login",
    element: withSuspense(Login),
  },
  {
    path: "/register",
    element: withSuspense(Register),
  },
  {
    path: "/forgot-password",
    element: withSuspense(ForgotPassword),
  },
  {
    path: "/change-password",
    element: withSuspense(ChangePassword),
  },
  {
    path: "/reset-password/:token",
    element: withSuspense(ResetPassword),
  },
  {
    path: "/courses",
    element: withSuspense(Course),
  },
  {
    path: "/course/:slug",
    element: withSuspense(CourseDetails),
  },
  {
    path: "/contact",
    element: withSuspense(ContactPage),
  },

  // Student + Instructor + Admin Routes
  {
    element: (
      <ProtectedRoute allowedRoles={["student", "instructor", "admin"]} />
    ),
    children: [
      {
        path: "/enroll-courses",
        element: withSuspense(EnrollmentCourses),
      },
      {
        path: "/watch/:id",
        element: withSuspense(WatchCourse),
      },
      {
        path: "/profile",
        element: withSuspense(Profile),
      },
    ],
  },

  // Instructor + Admin Routes
  {
    element: <ProtectedRoute allowedRoles={["admin", "instructor"]} />,
    children: [
      {
        path: "/create-course/basics",
        element: withSuspense(CreateCoursePage),
      },
      {
        path: "/managecourse/:courseId",
        element: withSuspense(ManageCoursePage),
      },
      {
        path: "/instructor/managecourse/:courseId",
        element: withSuspense(ManageCoursePage),
      },
      {
        path: "/instructor/my-courses",
        element: withSuspense(MyCoursePage),
      },
      {
        path: "/create-course/curriculum",
        element: withSuspense(CourseCurriculum),
      },
      {
        path: "/create-course/sections/:courseId",
        element: <div>Create Section Page</div>, // Static element (No lazy loading needed)
      },
      {
        path: "/create-course/lectures/:courseId",
        element: <div>Add Lecture Page</div>, // Static element
      },
    ],
  },

  // Common Route
  {
    path: "/course/curriculum",
    element: withSuspense(CurriculumPage),
  },

  // Unauthorized Route
  {
    path: "/unauthorized",
    element: (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Unauthorized Access</h1>
      </div>
    ),
  },
]);