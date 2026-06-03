// models/lecture.model.js

import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Lecture title is required"],
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    video: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
      duration: {
        type: Number, 
        default: 0,
      },
    },

    resources: [
      {
        title: String,
        url: String,
      },
    ],

    isPreviewFree: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
lectureSchema.index({ section: 1 });
lectureSchema.index({ section: 1, order: 1 });
lectureSchema.index({ course: 1 });

const lectureModel = mongoose.model("Lecture", lectureSchema);

export default lectureModel;
