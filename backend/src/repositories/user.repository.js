import userModel from "../models/nosql/user.model.js";

/**
 * Find userModel By Id
 */
export const findUserByIdRepo = async (userId, selectPassword = false) => {
  let query = userModel.findById(userId);

  if (selectPassword) {
    query = query.select("+password");
  }

  return await query;
};

/**
 * Find userModel By Email
 */
export const findUserByEmailRepo = async (email, selectPassword = false) => {
  let query = userModel.findOne({
    email,
  });

  if (selectPassword) {
    query = query.select("+password");
  }

  return await query;
};

/**
 * Update userModel By Id
 */
export const updateUserByIdRepo = async (userId, payload) => {
  return await userModel.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete userModel By Id
 */
export const deleteUserByIdRepo = async (userId) => {
  return await userModel.findByIdAndDelete(userId);
};

/**
 * Get userModel Dashboard Data
 */
export const getUserDashboardRepo = async (userId) => {
  return await userModel
    .findById(userId)
    .select("name email role avatar createdAt");
};

/**
 * Count Users
 */
export const countUsersRepo = async () => {
  return await userModel.countDocuments();
};

/**
 * Find All Users
 */
export const findAllUsersRepo = async (filter = {}, options = {}) => {
  const {
    skip = 0,
    limit = 10,
    sort = {
      createdAt: -1,
    },
  } = options;

  return await userModel.find(filter).skip(skip).limit(limit).sort(sort);
};

/**
 * Remove Refresh Token
 */
export const removeRefreshTokenRepo = async (userId) => {
  return await useModel.findByIdAndUpdate(
    userId,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );
};

export const saveUser = (userModel) => {
  return userModel.save();
};
