import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import logger from "./utils/logger.util.js";
import userRoutes from "./routes/user.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import courseRoutes from "./routes/course.route.js";
import paymentRoutes from "./routes/payment.route.js";
import orderRoutes from "./routes/order.route.js";
import enrollmentRoutes from "./routes/enrollment.route.js";
import contactRouter from "./routes/contact.route.js";
import authRoutes from "./routes/auth.route.js";
import sectionRoutes from "./routes/section.route.js";
import lectureRoutes from "./routes/lecture.route.js";
import uploadRoutes from "./routes/upload.route.js";
import progressRoutes from "./routes/progress.route.js";
import reviewRoutes from "./routes/review.route.js";
import adminRoutes from "./routes/admin.route.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://lms-frontend-phi-pied.vercel.app",
      "https://lms-frontend-git-main-umakant-katares-projects.vercel.app/"
    ],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  morgan("dev", {
    stream: {
      write: (message) => {
        logger.info(message.trim());
      },
    },
  }),
);

app.use("/uploads", express.static("uploads"));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/section", sectionRoutes);
app.use("/api/v1/lecture", lectureRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/enrollment", enrollmentRoutes);
app.use("/api/v1/progress", progressRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/admin", adminRoutes);

app.use((req, res) => {
  logger.warn(`404 - ${req.method} ${req.originalUrl}`);

  res.status(404).send("OOPS!! 404 PAGE NOT FOUND");
});

app.use(errorMiddleware);
export default app;
