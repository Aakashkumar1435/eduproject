// server/scripts/insertVideos.js
import mongoose from "mongoose";
import VideoLecture from "../models/VideoLectures.js";
import Subject from "../models/Subject.js";
import Chapter from "../models/Chapter.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI
const BASE_URL = "http://localhost:5000/videos";

const insertVideoLectures = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const videoLecturesData = [
    {
      title: "WhatsApp Video 2025-05-07 at 01.33.04",
      subjectID: "680322d12b1f7b317ca74a35",
      chapterID: "680325e4736d90f15e462bca",
      filename: "WhatsApp Video 2025-05-07 at 01.33.04_eb040ae6.mp4",
      videoType: "mp4",
      duration: 1200,
    },
    {
      title: "WhatsApp Video 2025-05-10 at 13.18.14",
      subjectID: "680322d12b1f7b317ca74a35",
      chapterID: "680325e4736d90f15e462bcb",
      filename: "WhatsApp Video 2025-05-10 at 13.18.14_c7c2397e.mp4",
      videoType: "mp4",
      duration: 1300,
    },
    {
      title: "WhatsApp Video 2025-05-10 at 13.18.15",
      subjectID: "680322d12b1f7b317ca74a35",
      chapterID: "680325e4736d90f15e462bcc",
      filename: "WhatsApp Video 2025-05-10 at 13.18.15_25a6bc11.mp4",
      videoType: "mp4",
      duration: 1250,
    },
    {
      title: "WhatsApp Video 2025-05-10 at 17.33.12",
      subjectID: "680322d12b1f7b317ca74a35",
      chapterID: "680325e4736d90f15e462bcd",
      filename: "WhatsApp Video 2025-05-10 at 17.33.12_1f67f56b.mp4",
      videoType: "mp4",
      duration: 1400,
    },
    {
      title: "WhatsApp Video 2025-05-10 at 23.22.19",
      subjectID: "680322d12b1f7b317ca74a35",
      chapterID: "680325e4736d90f15e462bce",
      filename: "WhatsApp Video 2025-05-10 at 23.22.19_27ce7952.mp4",
      videoType: "mp4",
      duration: 1500,
    },
  ];

  for (const video of videoLecturesData) {
    const subject = await Subject.findById(video.subjectID);
    const chapter = await Chapter.findById(video.chapterID);

    if (!subject || !chapter) {
      console.log(`❌ Skipping ${video.title} - subject or chapter not found.`);
      continue;
    }

    const newVideo = new VideoLecture({
      title: video.title,
      subjectID: video.subjectID,
      subjectName: subject.name,
      chapterID: video.chapterID,
      chapterName: chapter.name,
      videoUrl: `${BASE_URL}/${video.filename}`,
      videoType: video.videoType,
      duration: video.duration,
    });

    await newVideo.save();
    console.log(`✅ Inserted: ${newVideo.title}`);
  }

  mongoose.connection.close();
  console.log("🔌 Disconnected");
};

insertVideoLectures();
