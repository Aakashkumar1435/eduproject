// models/All.js

import mongoose from "mongoose";

const allSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },

    type: {
      type: String,
      enum: ["Chapter", "Subject", "FullLength"],
      required: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: function () {
        return this.type === "Subject" || this.type === "FullLength";
      },
    },

    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: function () {
        return this.type === "Chapter";
      },
    },

    mcqs: [
      {
        question: { type: String },
        options: [{ type: String }],
        correctAnswer: { type: Number },
        reason: { type: String },
      },
    ],

    numberOfMcqs: { type: Number, required: true },

    duration: {
      type: Number,
      default: 60, // minutes
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    averageScore: {
      type: Number,
      default: 0,
    },

    userProgress: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        timeSpent: {
          type: Number,
          default: 0,
        },
        totalScore:{
          type: Number,
          default: 0,
        },
        percentage: {
          type: Number,
          default: 0,
        },
        completedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// ✅ Index for userProgress.userId
allSchema.index({ "userProgress.userId": 1 });

// ✅ Pre-save hook
allSchema.pre("save", function (next) {
  // Validate chapter/subject presence
  if (this.type === "Chapter" && !this.chapter) {
    return next(new Error("Chapter must be specified for Chapter type test."));
  }

  if (
    (this.type === "Subject" || this.type === "FullLength") &&
    !this.subject
  ) {
    return next(
      new Error("Subject must be specified for Subject/FullLength type test.")
    );
  }

  // Update numberOfMcqs
  this.numberOfMcqs = Array.isArray(this.mcqs) ? this.mcqs.length : 0;

  // ✅ Update averageScore based on userProgress
  if (Array.isArray(this.userProgress) && this.userProgress.length > 0) {
    const totalPercentage = this.userProgress.reduce((acc, progress) => acc + (progress.percentage || 0), 0);
    this.averageScore = totalPercentage / this.userProgress.length;
  } else {
    this.averageScore = 0;
  }

  next();
});

// ✅ Model
const All = mongoose.model("All", allSchema);

export default All;
