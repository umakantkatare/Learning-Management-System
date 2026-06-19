import {
  getDashboardStatsRepo,
  getAllUsersRepo,
  getAllCoursesAdminRepo,
  getAllOrdersRepo,
  getUserByIdAdminRepo,
  updateUserAdminRepo,
} from "../repositories/admin.repository.js";

import {
  getCourseByIdRepo,
  deleteCourseRepo,
} from "../repositories/course.repository.js";
import ApiError from "../utils/error.util.js";

/**
 * Dashboard
 */
export const getDashboardService =
  async () => {
    return await getDashboardStatsRepo();
  };

/**
 * Get All Users
 */
export const getAllUsersService =
  async () => {
    return await getAllUsersRepo();
  };

/**
 * Get All Courses
 */
export const getAllCoursesService =
  async () => {
    return await getAllCoursesAdminRepo();
  };

/**
 * Get All Orders
 */
export const getAllOrdersService =
  async () => {
    return await getAllOrdersRepo();
  };

/**
 * Change User Role
 */
export const updateUserRoleService =
  async (
    userId,
    role
  ) => {
    const allowedRoles = [
      "student",
      "instructor",
      "admin",
    ];

    if (
      !allowedRoles.includes(role)
    ) {
      throw new ApiError(
        "Invalid role value",
        400
      );
    }

    const user =
      await getUserByIdAdminRepo(
        userId
      );

    if (!user) {
      throw new ApiError(
        "User not found",
        404
      );
    }

    return await updateUserAdminRepo(
      userId,
      { role }
    );
  };

/**
 * Block / Unblock User
 */
export const updateUserStatusService =
  async (
    userId,
    isBlocked
  ) => {
    const user =
      await getUserByIdAdminRepo(
        userId
      );

    if (!user) {
      throw new ApiError(
        "User not found",
        404
      );
    }

    return await updateUserAdminRepo(
      userId,
      {
        isBlocked:
          Boolean(
            isBlocked
          ),
      }
    );
  };

/**
 * Delete Course
 */
export const deleteCourseAdminService =
  async (
    courseId
  ) => {
    const course =
      await getCourseByIdRepo(
        courseId
      );

    if (!course) {
      throw new ApiError(
        "Course not found",
        404
      );
    }

    await deleteCourseRepo(
      courseId
    );

    return true;
  };

/**
 * Analytics
 */
export const getAnalyticsService =
  async () => {
    const dashboard =
      await getDashboardStatsRepo();

    return {
      users: {
        total:
          dashboard.totalUsers,
        students:
          dashboard.totalStudents,
        instructors:
          dashboard.totalInstructors,
        admins:
          dashboard.totalAdmins,
      },

      courses: {
        total:
          dashboard.totalCourses,
      },

      orders: {
        total:
          dashboard.totalOrders,
        paid:
          dashboard.paidOrders,
      },

      revenue:
        dashboard.totalRevenue,
    };
  };