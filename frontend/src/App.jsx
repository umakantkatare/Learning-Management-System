import { RouterProvider } from "react-router";
import { router } from "./routes/AppRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { refreshTokenThunk, profileThunk } from "./features/auth/authThunk";
import SkeletonUI from "./components/layout/SkeletonUI";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [initializing, setInitializing] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    const initAuth = async () => {
      try {
        if (!user) {
          await dispatch(refreshTokenThunk()).unwrap();
          await dispatch(profileThunk()).unwrap();
        }
      } catch (error) {
        console.log("Session initialization skipped or no active session.");
      } finally {
        setInitializing(false);
      }
    };

    initAuth();
  }, [dispatch, user]);

  // 2. Initializing state par Shadcn Skeleton render karein
  if (initializing) {
    return <SkeletonUI />;
  }

  return <RouterProvider router={router} />;
};

export default App;
