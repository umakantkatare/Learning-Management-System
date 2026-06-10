import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Homepage from "@/pages/Homepage";

// Auth
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";

// Course
import Course from "@/pages/course/Course";
import CourseDetails from "@/pages/course/CourseDetails";
import WatchCourse from "@/pages/course/WatchCourse";
import CreateCoursePage from "@/pages/course/CreateCourse";
import CourseCurriculum from "@/pages/course/CourseCurriculam";
import ManageCoursePage from "@/pages/course/ManageCoursePage";
import CurriculumPage from "@/components/course/CurriculumList";

// Dashboard
import Profile from "@/pages/dashboard/Profile";
import ChangePassword from "@/components/dashboard/changePassword";

// Instructor
import MyCoursePage from "@/pages/instructor/MyCoursePage";

// Auth
import ProtectedRoute from "./ProtectedRoute";
import { profileThunk } from "@/features/auth/authThunk";
import EnrollmentCourses from "@/pages/student/EnrollmentCourses";
import ContactPage from "@/pages/contact/ContactPage";

function AppRoutes() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(profileThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/courses" element={<Course />} />
      <Route path="/enroll-courses" element={<EnrollmentCourses />} />
      <Route path="/course/:slug" element={<CourseDetails />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route
        element={
          <ProtectedRoute allowedRoles={["student", "instructor", "admin"]} />
        }
      >
        {/* <Route path="/profile" element={<StudentDashboard />} /> */}
      </Route>
      <Route
        element={<ProtectedRoute allowedRoles={["admin", "instructor"]} />}
      >
        <Route path="/create-course/basics" element={<CreateCoursePage />} />
      </Route>
      <Route path="/watch/:id" element={<WatchCourse />} />
      <Route path="/managecourse/:courseId" element={<ManageCoursePage />} />
      <Route
        path="/create-course/sections/:courseId"
        // element={<CreateSectionPage />}
      />
      <Route
        path="/create-course/lectures/:courseId"
        // element={<AddLecturePage />}
      />
      <Route path="/course/curriculum" element={<CurriculumPage />} />
      <Route path="/create-course/curriculum" element={<CourseCurriculum />} />
      <Route path="/instructor/my-courses" element={<MyCoursePage />} />
      <Route
        path="/instructor/managecourse/:courseId"
        element={<ManageCoursePage />}
      />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );

  // return (
  //   <Routes>
  //     {/* ================= PUBLIC ================= */}

  //     <Route path="/" element={<Homepage />} />

  //     <Route path="/login" element={<Login />} />
  //     <Route path="/register" element={<Register />} />
  //     <Route path="/forgot-password" element={<ForgotPassword />} />
  //     <Route path="/reset-password/:token" element={<ResetPassword />} />

  //     <Route path="/courses" element={<Course />} />
  //     <Route path="/course/:slug" element={<CourseDetails />} />

  //     {/* ================= AUTHENTICATED ================= */}

  //     <Route
  //       element={
  //         <ProtectedRoute allowedRoles={["student", "instructor", "admin"]} />
  //       }
  //     >
  //       <Route path="/profile" element={<Profile />} />
  //       <Route path="/change-password" element={<ChangePassword />} />
  //       <Route path="/watch/:courseId" element={<WatchCourse />} />
  //     </Route>

  //     {/* ================= INSTRUCTOR ================= */}

  //     <Route
  //       element={<ProtectedRoute allowedRoles={["instructor", "admin"]} />}
  //     >
  //       <Route path="/instructor/courses" element={<MyCoursePage />} />

  //       <Route
  //         path="/instructor/courses/create"
  //         element={<CreateCoursePage />}
  //       />

  //       <Route
  //         path="/instructor/courses/:courseId/manage"
  //         element={<ManageCoursePage />}
  //       />

  //       <Route
  //         path="/instructor/courses/:courseId/curriculum"
  //         element={<CourseCurriculum />}
  //       />

  //       <Route
  //         path="/instructor/courses/:courseId/content"
  //         element={<CurriculumPage />}
  //       />
  //     </Route>

  //     {/* ================= ADMIN ================= */}

  //     <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
  //       {/* Example */}
  //       {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
  //     </Route>

  //     {/* ================= 404 ================= */}

  //     <Route
  //       path="*"
  //       element={
  //         <div className="flex min-h-screen items-center justify-center">
  //           404 - Page Not Found
  //         </div>
  //       }
  //     />
  //   </Routes>
  // );
}

export default AppRoutes;

// return (
//   <Routes>
//     <Route path="/" element={<Homepage />} />
//     <Route path="/login" element={<Login />} />
//     <Route path="/register" element={<Register />} />
//     <Route path="/forgot-password" element={<ForgotPassword />} />
//     <Route path="/change-password" element={<ChangePassword />} />
//     <Route path="/reset-password/:token" element={<ResetPassword />} />
//     <Route path="/courses" element={<Course />} />
//     <Route path="/course/:slug" element={<CourseDetails />} />
//     <Route
//       element={
//         <ProtectedRoute allowedRoles={["student", "instructor", "admin"]} />
//       }
//     >
//       {/* <Route path="/profile" element={<StudentDashboard />} /> */}
//     </Route>
//     <Route
//       element={<ProtectedRoute allowedRoles={["admin", "instructor"]} />}
//     >
//       <Route path="/create-course/basics" element={<CreateCoursePage />} />
//     </Route>
//     <Route path="/watch/:id" element={<WatchCourse />} />
//     <Route path="/managecourse/:courseId" element={<ManageCoursePage />} />
//     <Route
//       path="/create-course/sections/:courseId"
//       // element={<CreateSectionPage />}
//     />
//     <Route
//       path="/create-course/lectures/:courseId"
//       // element={<AddLecturePage />}
//     />
//     <Route path="/course/curriculum" element={<CurriculumPage />} />
//     <Route path="/create-course/curriculum" element={<CourseCurriculum />} />
//     <Route path="/instructor/my-courses" element={<MyCoursePage />} />
//     <Route path="/instructor/managecourse/:courseId" element={<ManageCoursePage />} />
//     <Route path="/profile" element={<Profile />} />

//   </Routes>

// );
