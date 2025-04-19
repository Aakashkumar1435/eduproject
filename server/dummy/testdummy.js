import mongoose from 'mongoose';
import Subject from '../models/Subject.js';
import Chapter from '../models/Chapter.js';
import MCQ from '../models/Mcq.js';
import Test from '../models/Test.js';

import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const insertDummyTests = async () => {
  await connectDB();

  try {
    const subjects = await Subject.find();
    const chapters = await Chapter.find();
    const mcqs = await MCQ.find();

    const tests = [];

    for (const subject of subjects) {
      // 🔹 Full Subject Test
      const subjectMcqs = mcqs.filter(m => m.subject.toString() === subject._id.toString() && !m.chapter);
      const selectedSubjectMcqs = subjectMcqs.slice(0, 10).map(m => m._id);

      if (selectedSubjectMcqs.length > 0) {
        tests.push(new Test({
          name: `${subject.name} Subject Test`,
          description: `Test covering important concepts from the full ${subject.name} subject.`,
          type: 'Subject',
          subject: subject._id,
          mcqs: selectedSubjectMcqs,
          numberOfMcqs: selectedSubjectMcqs.length,
        }));
      }

      // 🔹 Chapter Tests
      const relatedChapters = chapters.filter(ch => ch.subject.toString() === subject._id.toString());
      for (const chapter of relatedChapters) {
        const chapterMcqs = mcqs.filter(m => m.chapter?.toString() === chapter._id.toString());
        const selectedChapterMcqs = chapterMcqs.slice(0, 5).map(m => m._id);

        if (selectedChapterMcqs.length > 0) {
          tests.push(new Test({
            name: `${chapter.name} - ${subject.name} Chapter Test`,
            description: `Focused test for ${chapter.name} in ${subject.name}.`,
            type: 'Chapter',
            subject: subject._id,
            chapter: chapter._id,
            mcqs: selectedChapterMcqs,
            numberOfMcqs: selectedChapterMcqs.length,
          }));
        }
      }
    }

    // 🔹 Optional: Add a full-length mock test (random MCQs across subjects)
    if (mcqs.length >= 50) {
      const randomMcqs = mcqs.sort(() => 0.5 - Math.random()).slice(0, 50).map(m => m._id);

      const physicsSubject = subjects.find(s => s.name.toLowerCase().includes('physics')); // example if you want Physics
      if (physicsSubject) {
        tests.push(new Test({
          name: 'Physics Full Length Test',
          description: 'Full-length practice test for Physics.',
          type: 'FullLength',
          subject: physicsSubject._id,
          mcqs: randomMcqs,
          numberOfMcqs: randomMcqs.length,
        }));
      }
    }

    for (const test of tests) {
      await test.save(); // important: so your post save hooks work for testsCount
    }

    console.log('Dummy Tests inserted successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting dummy tests:', error);
    mongoose.disconnect();
  }
};

insertDummyTests();
