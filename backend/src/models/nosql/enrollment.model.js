import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default:null,
    },

    enrolledAt: {
      type: Date,
      default: Date.now,
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    lastLecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
      default: null,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: Date,
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate enrollment
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

enrollmentSchema.index({ user: 1, createdAt: -1 });

const enrollmentModel = mongoose.model("Enrollment", enrollmentSchema);

export default enrollmentModel;
