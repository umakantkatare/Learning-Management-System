import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * One review per user per course
 */
reviewSchema.index({ user: 1, course: 1 }, { unique: true });

/**
 * Fast course review listing
 */
reviewSchema.index({
  course: 1,
  createdAt: -1,
});

const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;
