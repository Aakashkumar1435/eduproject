import mongoose from 'mongoose';
import All from '../models/All.js'; // Adjust the path if needed
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
const allDummyData = [
    {
      name: "Modal Verbs Test",
      description: "Test your understanding of modal verbs.",
      type: "Chapter",
      chapter: "680325e4736d90f15e462bce", // Modal Verbs
      mcqs: [
        {
          question: "Which of these is a modal verb?",
          options: ["Run", "Can", "Beautiful", "Quickly"],
          correctAnswer: 1,
        },
        {
          question: "Choose the correct usage of 'must'.",
          options: [
            "You must to leave now.",
            "You must leave now.",
            "You musted leave now.",
            "You must leaving now.",
          ],
          correctAnswer: 1,
        },
      ],
      numberOfMcqs: 2,
      duration: 20,
      difficulty: "Easy",
    },
    {
      name: "Adverb Basics Test",
      description: "A quick test on Adverbs.",
      type: "Chapter",
      chapter: "680325e4736d90f15e462bcf", // Adverb
      mcqs: [
        {
          question: "Which sentence contains an adverb?",
          options: [
            "She sings beautifully.",
            "She is beautiful.",
            "The beautiful painting",
            "A beautiful day",
          ],
          correctAnswer: 0,
        },
      ],
      numberOfMcqs: 1,
      duration: 10,
      difficulty: "Easy",
    },
    {
      name: "English Subject Full Test",
      description: "Complete English Subject Test.",
      type: "Subject",
      subject: "680322d12b1f7b317ca74a35", // English
      mcqs: [
        {
          question: "Which part of speech is 'however'?",
          options: ["Noun", "Adverb", "Preposition", "Conjunction"],
          correctAnswer: 3,
        },
      ],
      numberOfMcqs: 1,
      duration: 60,
      difficulty: "Medium",
    },
    {
      name: "Physics Force and Motion Quiz",
      description: "Quick quiz on Force and Motion chapter.",
      type: "Chapter",
      chapter: "680325e4736d90f15e462bd3", // Force and Motion
      mcqs: [
        {
          question: "What is the unit of force?",
          options: ["Joule", "Pascal", "Newton", "Watt"],
          correctAnswer: 2,
        },
      ],
      numberOfMcqs: 1,
      duration: 15,
      difficulty: "Medium",
    },
    {
      name: "Physics Full Length Test",
      description: "Full Length Physics Paper",
      type: "FullLength",
      subject: "680322d12b1f7b317ca74a36", // Physics
      mcqs: [
        {
          question: "What is Work?",
          options: [
            "Force × Displacement",
            "Mass × Acceleration",
            "Energy ÷ Time",
            "Force ÷ Area",
          ],
          correctAnswer: 0,
        },
        {
          question: "Which law states action and reaction are equal?",
          options: [
            "Newton's First Law",
            "Newton's Second Law",
            "Newton's Third Law",
            "Law of Conservation of Energy",
          ],
          correctAnswer: 2,
        },
      ],
      numberOfMcqs: 2,
      duration: 90,
      difficulty: "Hard",
    },
    {
      name: "Work and Energy Quiz",
      description: "Short quiz for Work and Energy chapter.",
      type: "Chapter",
      chapter: "680325e4736d90f15e462bd4", // Work and Energy
      mcqs: [
        {
          question: "The SI unit of energy is:",
          options: ["Joule", "Watt", "Newton", "Pascal"],
          correctAnswer: 0,
        },
      ],
      numberOfMcqs: 1,
      duration: 15,
      difficulty: "Medium",
    },
  ];

  

const insertDummyData = async () => {
  await connectDB();
  
  try {
    await All.insertMany(allDummyData);
    console.log('Dummy Subjects inserted!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting dummy subjects:', error);
    mongoose.disconnect();
  }
};

insertDummyData();
