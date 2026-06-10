import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import courseReducer from "../features/course/courseSlice";
import enrollmentReducer from "../features/enrollment/enrollmentSlice";
import uploadReducer from "../features/upload/uploadVideoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    course: courseReducer,
    upload: uploadReducer,
    enrollment: enrollmentReducer,
  },
});
