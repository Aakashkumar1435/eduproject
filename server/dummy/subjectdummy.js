import mongoose from 'mongoose';
import Subject from '../models/Subject.js'; // Adjust the path if needed
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Dummy Data
const subjects = [
  {
    name: 'English',
    testsCount: 0
  },
  {
    name: 'Physics',
    testsCount: 0
  },
  {
    name: 'Chemistry',
    testsCount: 0
  },
  {
    name: 'Biology',
    testsCount: 0
  },
  {
    name: 'Logical-Reasoning',
    testsCount: 0
  }
];

const insertDummySubjects = async () => {
  await connectDB();
  
  try {
    await Subject.insertMany(subjects);
    console.log('Dummy Subjects inserted!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting dummy subjects:', error);
    mongoose.disconnect();
  }
};

insertDummySubjects();
