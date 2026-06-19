import cookieOptions from "../configs/cookie.config.js";

const sendToken = (res, accessToken, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    accessToken,
  });
};

export default sendToken;
