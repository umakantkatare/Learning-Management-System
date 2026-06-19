import {
  findUserByIdRepo,
  updateUserByIdRepo,
  removeRefreshTokenRepo,
  deleteUserByIdRepo,
} from "../repositories/user.repository.js";
import { deleteFromImageKit, uploadToImageKit } from "../utils/avatar.util.js";
import ErrorHandler from "../utils/errorHandler.util.js";
import logger from "../utils/logger.util.js";

/**
 * Get Profile
 */
export const getProfileService = async (userId) => {
  const user = await findUserByIdRepo(userId);

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  return user;
};

/**
 * Update Profile
 */
export const updateProfileService = async (userId, body) => {
  const payload = {
    name: body.name,
  };

  const user = await updateUserByIdRepo(userId, payload);

  return user;
};

/**
 * Update Avatar
 */
export const updateAvatarService = async (userId, file) => {
  try {
    logger.info("updateAvatarService started", { userId });

    if (!file) {
      logger.warn("Avatar file missing", { userId });
      throw new ErrorHandler("Avatar file required", 400);
    }

    const user = await findUserByIdRepo(userId);

    if (!user) {
      logger.warn("User not found", { userId });
      throw new ErrorHandler("User not found", 404);
    }

    logger.info("User fetched successfully", {
      userId,
      oldAvatar: user.avatar?.secure_url || null,
    });

    const uploaded = await uploadToImageKit(file, "/lms/users/avatar");

    logger.info("Avatar uploaded successfully", {
      userId,
      public_id: uploaded.public_id,
      secure_url: uploaded.secure_url,
    });

    if (user.avatar?.secure_url) {
      logger.info("Deleting old avatar", {
        userId,
        oldAvatar: user.avatar.secure_url,
      });
      try {
        await deleteFromImageKit(user.avatar.secure_url);
        logger.info("Old avatar deleted successfully", { userId });
      } catch (error) {
        logger.error("Old avatar delete failed", error);
      }
    }

    const updated = await updateUserByIdRepo(userId, {
      avatar: {
        public_id: uploaded.public_id,
        secure_url: uploaded.secure_url,
      },
    });

    logger.info("User avatar updated successfully", { userId });

    return updated;
  } catch (error) {
    logger.error("updateAvatarService failed", {
      userId,
      message: error.message,
      stack: error.stack,
    });

    throw error;
  }
};

/**
 * Delete Account
 */
export const deleteAccountService = async (userId) => {
  const user = await findUserByIdRepo(userId);

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  if (user.avatar?.fileId) {
    await deleteFromImageKit(user.avatar.fileId);
  }

  await deleteUserByIdRepo(userId);
};

/**
 * Dashboard
 */
export const getDashboardService = async (user) => {
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    stats: {
      enrolledCourses: 0,
      completedCourses: 0,
      certificates: 0,
    },
  };
};
