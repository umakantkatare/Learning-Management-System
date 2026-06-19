import jwt from "jsonwebtoken";
import ErrorHandler from "./errorHandler.util.js";

/**
 * Generate Access Token
 * Short Expiry
 */
export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "15m",
  });
};

/**
 * Generate Refresh Token
 * Long Expiry
 */
export const generateRefreshToken = (userId) => {
  const generateRefreshTokens = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || "7d",
    },
  );
  return generateRefreshTokens;
};

/**
 * Verify Access Token
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new ErrorHandler("Invalid access token", 401);
  }
};

/**
 * Verify Refresh Token
 */
export const verifyRefreshToken = (token) => {
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return verifiedToken;
  } catch (error) {
    throw new ErrorHandler("Invalid refresh token", 401);
  }
};
