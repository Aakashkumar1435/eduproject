import mongoose from 'mongoose';
import Subject from '../models/Subject.js';
import Chapter from '../models/Chapter.js'; // Adjust path if needed
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

const insertDummyChapters = async () => {
  await connectDB();

  try {
    const subjects = await Subject.find(); // Get all subjects first

    const chapters = [];

    subjects.forEach((subject) => {
      if (subject.name === 'English') {
        chapters.push(
          { name: 'Noun', subject: subject._id, testsCount: 0 },
          { name: 'Pronoun', subject: subject._id, testsCount: 0 },
          { name: 'Adjective', subject: subject._id, testsCount: 0 },
          { name: 'Verb', subject: subject._id, testsCount: 0 },
          { name: 'Modal Verbs', subject: subject._id, testsCount: 0 },
          { name: 'Adverb', subject: subject._id, testsCount: 0 },
          { name: 'Conjunction / Interjection', subject: subject._id, testsCount: 0 },
          { name: 'Preposition', subject: subject._id, testsCount: 0 },
          { name: 'Articles', subject: subject._id, testsCount: 0 }
        );
      } else if (subject.name === 'Physics') {
        chapters.push(
          { name: 'Force and Motion', subject: subject._id, testsCount: 0 },
          { name: 'Work and Energy', subject: subject._id, testsCount: 0 },
          { name: 'Rotational and Circular Motion', subject: subject._id, testsCount: 0 },
          { name: 'Waves and Sounds', subject: subject._id, testsCount: 0 },
          { name: 'Oscillations', subject: subject._id, testsCount: 0 },
          { name: 'Thermodynamics', subject: subject._id, testsCount: 0 },
          { name: 'Electrostatics', subject: subject._id, testsCount: 0 },
          { name: 'Current Electricity', subject: subject._id, testsCount: 0 },
          { name: 'Electromagnetism', subject: subject._id, testsCount: 0 }
        );
      } else if (subject.name === 'Chemistry') {
        chapters.push(
          { name: 'Atomic Structure', subject: subject._id, testsCount: 0 },
          { name: 'Introduction of Fundamental Groups of Chemistry', subject: subject._id, testsCount: 0 },
          { name: 'Gases', subject: subject._id, testsCount: 0 },
          { name: 'Liquids', subject: subject._id, testsCount: 0 },
          { name: 'Solids', subject: subject._id, testsCount: 0 },
          { name: 'Chemical Equilibrium', subject: subject._id, testsCount: 0 },
          { name: 'Reaction Kinetics', subject: subject._id, testsCount: 0 },
          { name: 'Thermochemistry', subject: subject._id, testsCount: 0 },
          { name: 'Electrochemistry', subject: subject._id, testsCount: 0 }
        );
      } else if (subject.name === 'Biology') {
        chapters.push(
          { name: 'Cell Biology', subject: subject._id, testsCount: 0 },
          { name: 'Genetics', subject: subject._id, testsCount: 0 },
          { name: 'Biodiversity', subject: subject._id, testsCount: 0 },
          { name: 'Bioenergetics', subject: subject._id, testsCount: 0 },
          { name: 'Biological Molecules', subject: subject._id, testsCount: 0 },
          { name: 'Cell Structure and Function', subject: subject._id, testsCount: 0 },
          { name: 'Coordination and Control', subject: subject._id, testsCount: 0 },
          { name: 'Diversity Among Animals', subject: subject._id, testsCount: 0 },
          { name: 'Enzymes', subject: subject._id, testsCount: 0 },
          { name: 'Evolution', subject: subject._id, testsCount: 0 },
          { name: 'Life Processes in Animals and Plants', subject: subject._id, testsCount: 0 }
        );
      } else if (subject.name === 'Logical Reasoning') {
        chapters.push(
          { name: 'Puzzles', subject: subject._id, testsCount: 0 },
          { name: 'Number Series', subject: subject._id, testsCount: 0 },
          { name: 'Critical Thinking', subject: subject._id, testsCount: 0 },
          { name: 'Letter and Symbol Series', subject: subject._id, testsCount: 0 },
          { name: 'Logical Deduction', subject: subject._id, testsCount: 0 },
          { name: 'Logical Problems', subject: subject._id, testsCount: 0 },
          { name: 'Course of Action', subject: subject._id, testsCount: 0 },
          { name: 'Cause and Effect', subject: subject._id, testsCount: 0 }
        );
      }
    });

    await Chapter.insertMany(chapters);
    console.log('Dummy Chapters inserted!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting dummy chapters:', error);
    mongoose.disconnect();
  }
};

insertDummyChapters();
