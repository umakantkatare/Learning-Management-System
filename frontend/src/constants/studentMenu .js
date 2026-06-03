import { Home, BookOpen, PlusCircle, Users, Shield } from "lucide-react";

export const menuByRole = {
  student: [
    {
      name: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "My Courses",
      icon: BookOpen,
      path: "/my-courses",
    },
  ],

  instructor: [
    {
      name: "Dashboard",
      icon: Home,
      path: "/profile",
    },
    {
      name: "Create Course",
      icon: PlusCircle,
      path: "/create-course/basics",
    },
    {
      name: "My Courses",
      icon: BookOpen,
      path: "/instructor/my-courses",
    },
  ],

  admin: [
    {
      name: "Dashboard",
      icon: Home,
      path: "/profile",
    },
    {
      name: "All Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      name: "Create Course",
      icon: PlusCircle,
      path: "/create-course/basics",
    },
    {
      name: "Manage Courses",
      icon: Shield,
      path: "/instructor/mycourses",
    },
  ],
};

// import { LayoutDashboard, BookOpen, User, } from "lucide-react";

// export const studentMenu = [
//   {
//     name: "Dashboard",
//     icon: LayoutDashboard,
//     path: "/student/dashboard",
//     active: true
//   },
//   {
//     name: "My Courses",
//     icon: BookOpen,
//     path: "/student/my-courses",
//   },
//   {
//     name: "Profile",
//     icon: User,
//     path: "/student/profile",
//   },
// ];

// // const studentMenu = [
// //   { name: "Basic Info", icon: User, active: true },
// //   { name: "Batches", icon: Users },
// //   { name: "Projects", icon: FolderKanban },
// // ];
