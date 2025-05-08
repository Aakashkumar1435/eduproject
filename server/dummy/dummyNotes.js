import mongoose from "mongoose";
import Notes from "../models/Notes.js";
import Subject from "../models/Subject.js";
import Chapter from "../models/Chapter.js";

// MongoDB connection string
const MONGO_URI = "mongodb://localhost:27017/educational-platform";

// Helper function to create a note with subject/chapter names populated
const createNote = async ({ name, subjectID, chapterID, fileType, fileUrl }) => {
  const subject = await Subject.findById(subjectID);
  const chapter = await Chapter.findById(chapterID);

  if (!subject || !chapter) {
    console.warn(`Subject or Chapter not found for note "${name}"`);
    return null;
  }

  return new Notes({
    name,
    subjectID,
    subjectName: subject.name,
    chapterID,
    chapterName: chapter.name,
    fileType,
    fileUrl,
  });
};

const insertDummyNotesData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const notesData = [
      {
        name: "English. Chapter Noun",
        subjectID: "680322d12b1f7b317ca74a35",
        chapterID: "680325e4736d90f15e462bca",
        fileType: "ppt",
        fileUrl: "E:\\new\\mdcat-prep\\client\\Notes\\06 NFA-DFA Equivalence.pptx",
      },
      {
        name: "English. Chapter Pronoun",
        subjectID: "680322d12b1f7b317ca74a35",
        chapterID: "680325e4736d90f15e462bcb",
        fileType: "ppt",
        fileUrl: "E:\\new\\mdcat-prep\\client\\Notes\\17 Normal Forms for CFGs.pptx",
      },
      {
        name: "Physics. Chapter Force and Motion",
        subjectID: "680322d12b1f7b317ca74a36",
        chapterID: "680325e4736d90f15e462bd3",
        fileType: "pdf",
        fileUrl: "E:\\new\\mdcat-prep\\client\\Notes\\Notes on MyhillNerode.pdf",
      },
      {
        name: "Physics. Chapter Work and Energy",
        subjectID: "680322d12b1f7b317ca74a36",
        chapterID: "680325e4736d90f15e462bd4",
        fileType: "ppt",
        fileUrl: "E:\\new\\mdcat-prep\\client\\Notes\\13 PushDown Automata.pptx",
      },
      {
        name: "Chemistry. Chapter Gases",
        subjectID: "680322d12b1f7b317ca74a37",
        chapterID: "680325e4736d90f15e462bde",
        fileType: "image",
        fileUrl: "E:\\new\\mdcat-prep\\client\\Notes\\MyPhoto.jpg",
      },
    ];

    // Create and save all notes
    for (const data of notesData) {
      const note = await createNote(data);
      if (note) {
        await note.save();
        console.log(`Inserted note: ${note.name}`);
      }
    }

    console.log("All notes inserted (if subject/chapter matched).");

    mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error inserting data:", error);
    mongoose.connection.close();
  }
};

insertDummyNotesData();
