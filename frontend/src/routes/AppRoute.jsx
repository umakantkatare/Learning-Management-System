import { createBrowserRouter } from "react-router-dom";

import Homepage from "../pages/HomePage";
import Login from "../pages/auth/Login";
import Register from "..//pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ChangePassword from "../components/dashboard/ChangePassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Course from "../pages/course/Course";
import EnrollmentCourses from "../pages/student/EnrollmentCourses";
import CourseDetails from "../pages/course/CourseDetails";
import ContactPage from "../pages/contact/ContactPage";
import CreateCoursePage from "../pages/course/CreateCourse";
import WatchCourse from "../pages/course/WatchCourse";
import ManageCoursePage from "../pages/course/ManageCoursePage";
import CurriculumPage from "../components/course/CurriculumList";
import CourseCurriculum from "../pages/course/CourseCurriculam";
import MyCoursePage from "../pages/instructor/MyCoursePage";
import Profile from "../pages/dashboard/Profile";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/courses",
    element: <Course />,
  },
  {
    path: "/course/:slug",
    element: <CourseDetails />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },

  // Student + Instructor + Admin Routes
  {
    element: (
      <ProtectedRoute allowedRoles={["student", "instructor", "admin"]} />
    ),
    children: [
      {
        path: "/enroll-courses",
        element: <EnrollmentCourses />,
      },
      {
        path: "/watch/:id",
        element: <WatchCourse />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },

  // Instructor + Admin Routes
  {
    element: <ProtectedRoute allowedRoles={["admin", "instructor"]} />,
    children: [
      {
        path: "/create-course/basics",
        element: <CreateCoursePage />,
      },
      {
        path: "/managecourse/:courseId",
        element: <ManageCoursePage />,
      },
      {
        path: "/instructor/managecourse/:courseId",
        element: <ManageCoursePage />,
      },
      {
        path: "/instructor/my-courses",
        element: <MyCoursePage />,
      },
      {
        path: "/create-course/curriculum",
        element: <CourseCurriculum />,
      },
      {
        path: "/create-course/sections/:courseId",
        element: <div>Create Section Page</div>,
      },
      {
        path: "/create-course/lectures/:courseId",
        element: <div>Add Lecture Page</div>,
      },
    ],
  },

  // Common Route
  {
    path: "/course/curriculum",
    element: <CurriculumPage />,
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

// import { Routes, Route } from "react-router-dom";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import Login from "@/pages/auth/Login";
// import Register from "@/pages/auth/Register";
// import ForgotPassword from "@/pages/auth/ForgotPassword";
// import ResetPassword from "@/pages/auth/ResetPassword";

// import Course from "@/pages/course/Course";
// import CourseDetails from "@/pages/course/CourseDetails";
// import WatchCourse from "@/pages/course/WatchCourse";
// import CreateCoursePage from "@/pages/course/CreateCourse";
// import CourseCurriculum from "@/pages/course/CourseCurriculam";
// import ManageCoursePage from "@/pages/course/ManageCoursePage";
// import CurriculumPage from "@/components/course/CurriculumList";

// // Dashboard
// import Profile from "@/pages/dashboard/Profile";

// // Instructor
// import MyCoursePage from "@/pages/instructor/MyCoursePage";

// // Auth
// import ProtectedRoute from "./ProtectedRoute";
// import { profileThunk } from "@/features/auth/authThunk";
// import EnrollmentCourses from "@/pages/student/EnrollmentCourses";
// import ContactPage from "@/pages/contact/ContactPage";
// import Homepage from "../pages/Homepage";
// import ChangePassword from "../components/dashboard/ChangePassword";

// function AppRoutes() {
// const dispatch = useDispatch();
// const { loading } = useSelector((state) => state.auth);

// useEffect(() => {
//   dispatch(profileThunk());
// }, [dispatch]);

// if (loading) {
//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       Loading...
//     </div>
//   );
// }

//   return (
//     <Routes>
//       <Route path="/" element={<Homepage />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/change-password" element={<ChangePassword />} />
//       <Route path="/reset-password/:token" element={<ResetPassword />} />
//       <Route path="/courses" element={<Course />} />
//       <Route path="/enroll-courses" element={<EnrollmentCourses />} />
//       <Route path="/course/:slug" element={<CourseDetails />} />
//       <Route path="/contact" element={<ContactPage />} />
//       <Route
//         element={
//           <ProtectedRoute allowedRoles={["student", "instructor", "admin"]} />
//         }
//       >
//         {/* <Route path="/profile" element={<StudentDashboard />} /> */}
//       </Route>
//       <Route
//         element={<ProtectedRoute allowedRoles={["admin", "instructor"]} />}
//       >
//         <Route path="/create-course/basics" element={<CreateCoursePage />} />
//       </Route>
//       <Route path="/watch/:id" element={<WatchCourse />} />
//       <Route path="/managecourse/:courseId" element={<ManageCoursePage />} />
//       <Route
//         path="/create-course/sections/:courseId"
//         // element={<CreateSectionPage />}
//       />
//       <Route
//         path="/create-course/lectures/:courseId"
//         // element={<AddLecturePage />}
//       />
//       <Route path="/course/curriculum" element={<CurriculumPage />} />
//       <Route path="/create-course/curriculum" element={<CourseCurriculum />} />
//       <Route path="/instructor/my-courses" element={<MyCoursePage />} />
//       <Route
//         path="/instructor/managecourse/:courseId"
//         element={<ManageCoursePage />}
//       />
//       <Route path="/profile" element={<Profile />} />
//     </Routes>
//   );
// }

// export default AppRoutes;
