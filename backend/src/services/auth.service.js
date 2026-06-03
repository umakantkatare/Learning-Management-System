// src/services/auth.service.js

import bcrypt from "bcryptjs";
import crypto from "crypto";

import cookieOptions from "../configs/cookie.config.js";
import ErrorHandler from "../utils/errorHandler.util.js";
import sendEmail from "../utils/sendEmail.util.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.util.js";

import {
  createUserRepo,
  findUserByEmailRepo,
  findUserByIdRepo,
  updateUserByIdRepo,
  saveRefreshTokenRepo,
  removeRefreshTokenRepo,
  findUserByResetTokenRepo,
  saveResetTokenRepo,
  clearResetTokenRepo,
} from "../repositories/auth.repository.js";

import logger from "../utils/logger.util.js";
import { deleteFromImageKit, uploadToImageKit } from "../utils/avatar.util.js";
import { saveUser } from "../repositories/user.repository.js";

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

/**
 * Register Service
 */
export const registerService = async (body, file) => {
  const { name, email, password } = body;

  const existingUser = await findUserByEmailRepo(email);
  if (existingUser) {
    throw new ErrorHandler("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  let uploadedFile = null;

  try {
    let avatar = { public_id: "", secure_url: "" };

    if (file) {
      uploadedFile = await uploadToImageKit(file, "/lms/users/avatar");
      avatar = {
        public_id: uploadedFile.public_id,
        secure_url: uploadedFile.secure_url,
      };
    }

    const user = await createUserRepo({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };
  } catch (error) {
    logger.error("Register Service Error", {
      message: error.message,
      email,
    });

    if (uploadedFile?.fileId) {
      await deleteFromImageKit(uploadedFile.fileId);
    }

    throw error;
  }
};

/**
 * Login Service
 */
export const loginService = async (body, res) => {
  const { email, password } = body;

  const user = await findUserByEmailRepo(email, true);
  if (!user) {
    throw new ErrorHandler("Invalid credentials", 401);
  }

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    throw new ErrorHandler("Invalid credentials", 401);
  }

  user.lastLoginAt = new Date();
  await saveUser(user);

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  const hashedRefreshToken = await hashToken(refreshToken);
  await saveRefreshTokenRepo(user._id, hashedRefreshToken);

  return {
    accessToken,
    refreshToken,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

/**
 * Logout Service
 */
export const logoutService = async (refreshToken) => {
  if (!refreshToken) return;

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    await removeRefreshTokenRepo(decoded.id, refreshToken);
  } catch {
    return;
  }
};

/**
 * Get Current User
 */
export const getMeService = async (userId) => {
  const user = await findUserByIdRepo(userId);

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  return user;
};

/**
 * Change Password
 */
export const changePasswordService = async (userId, body) => {
  const { oldPassword, newPassword } = body;
  console.log("userId:", userId);
  console.log("body:", body);
  const user = await findUserByIdRepo(userId, true);
  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  const isMatched = await bcrypt.compare(oldPassword, user.password);
  if (!isMatched) {
    throw new ErrorHandler("Old password incorrect", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await updateUserByIdRepo(userId, {
    password: hashedPassword,
  });
};

/**
 * Refresh Token Service (with rotation)
 */
export const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new ErrorHandler("Refresh token missing", 401);
  }

  let decoded;

  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new ErrorHandler("Invalid or expired refresh token", 401);
  }

  const hashedRefreshToken = hashToken(refreshToken);
  const user = await findUserByIdRepo(decoded.id, false, true);

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  const tokenExists = user.refreshToken.includes(hashedRefreshToken);

  if (!tokenExists) {
    throw new ErrorHandler("Refresh token mismatch", 401);
  }

  const newRefreshToken = generateRefreshToken(user._id);

  const accessToken = generateAccessToken(user._id);

  const hashedNewRefreshToken = hashToken(newRefreshToken);

  await removeRefreshTokenRepo(user._id, hashedRefreshToken);

  await saveRefreshTokenRepo(user._id, hashedNewRefreshToken);

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

/**
 * Forgot Password
 */
export const forgotPasswordService = async (email) => {
  const user = await findUserByEmailRepo(email);
  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const expireTime = Date.now() + 15 * 60 * 1000;
  const hashedResetToken = hashToken(resetToken);
  await saveResetTokenRepo(user._id, hashedResetToken, expireTime);

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: "Reset Password",
    text: `Reset your password here: ${resetUrl}`,
  });
};

/**
 * Reset Password
 */
export const resetPasswordService = async (token, password) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await findUserByResetTokenRepo(hashedToken);
  if (!user) {
    throw new ErrorHandler("Token expired or invalid", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await updateUserByIdRepo(user._id, {
    password: hashedPassword,
  });

  await clearResetTokenRepo(user._id);
};
