import mongoose from "mongoose";
import Subject from "./Subject.js";
import Chapter from "./Chapter.js";

const { Schema, model } = mongoose;

const videoLectureSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subjectID: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  chapterID: {
    type: Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
  chapterName: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  videoType: {
    type: String,
    enum: ["mp4", "mov", "avi", "mkv", "other"],
    required: true,
  },
  duration: {
    type: Number, // Duration in seconds
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

// Static method to get subject name by ID
videoLectureSchema.statics.getSubjectNameById = async function (subjectID) {
  const subject = await Subject.findById(subjectID);
  return subject ? subject.name : null;
};

// Static method to get chapter name by ID
videoLectureSchema.statics.getChapterNameById = async function (chapterID) {
  const chapter = await Chapter.findById(chapterID);
  return chapter ? chapter.name : null;
};

// Pre-save hook to auto-fill subjectName and chapterName
videoLectureSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("subjectID")) {
    this.subjectName = await this.constructor.getSubjectNameById(this.subjectID);
  }
  if (this.isNew || this.isModified("chapterID")) {
    this.chapterName = await this.constructor.getChapterNameById(this.chapterID);
  }
  next();
});

const VideoLecture = model("VideoLecture", videoLectureSchema);
export default VideoLecture;
