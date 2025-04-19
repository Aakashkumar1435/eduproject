import mongoose from 'mongoose';
import Subject from '../models/Subject.js';
import Chapter from '../models/Chapter.js';
import MCQ from '../models/Mcq.js'; // Your MCQ model
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const insertDummyMCQs = async () => {
  await connectDB();

  try {
    const subjects = await Subject.find();
    const chapters = await Chapter.find();

    const mcqs = [];

    for (const subject of subjects) {
      const relatedChapters = chapters.filter(ch => ch.subject.toString() === subject._id.toString());

      // Insert 3 MCQs per subject: 1 without chapter (full subject) + 2 with chapters
      mcqs.push({
        question: `What is the basic concept of ${subject.name}?`,
        options: ['Concept A', 'Concept B', 'Concept C', 'Concept D'],
        correctAnswer: 'Concept A',
        subject: subject._id,
      });

      relatedChapters.forEach((chapter) => {
        mcqs.push({
          question: `Question from ${chapter.name} in ${subject.name}?`,
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          correctAnswer: 'Option 2',
          subject: subject._id,
          chapter: chapter._id
        });
      });
    }

    await MCQ.insertMany(mcqs);
    console.log('Dummy MCQs inserted!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting dummy MCQs:', error);
    mongoose.disconnect();
  }
};

insertDummyMCQs();
