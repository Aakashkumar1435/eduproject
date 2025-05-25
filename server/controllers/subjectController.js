// controllers/subjectController.js

import Chapter from '../models/Chapter.js';
import Subject from '../models/Subject.js';
import All from '../models/All.js';

export const getChaptersBySubjectName = async (req, res) => {
  try {
    const { subjectName } = req.query; // frontend sends subjectName

    if (!subjectName) {
      return res.status(400).json({
        success: false,
        message: 'Subject name is required',
      });
    }

    // Find subject by name (case insensitive)
    const subject = await Subject.findOne({
      name: { $regex: new RegExp(`^${subjectName}$`, 'i') },
    });

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found',
      });
    }

    // Find chapters linked to that subject
    const chapters = await Chapter.find({ subject: subject._id }).select('name');

    res.status(200).json({
      success: true,
      subjectName: subject.name,
      subjectId: subject._id,
      chapters: chapters.map((chapter) => ({
        chapterId: chapter._id,
        chapterName: chapter.name,
      })),
    });
  } catch (error) {
    console.error('Error fetching chapters by subject name:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

export const getDetailedFLPTestsBySubject = async (req, res) => {
  try {
    const { subjectName } = req.query; // Get subjectName from the URL parameter

    if (!subjectName) {
      return res.status(400).json({
        success: false,
        message: 'Subject name is required',
      });
    }

    // Find the subject by name (case insensitive)
    const subject = await Subject.findOne({ name: { $regex: new RegExp(`^${subjectName}$`, 'i') } });

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found',
      });
    }

    // Retrieve all FullLength tests for the given subject
    const tests = await All.find({
      type: 'Subject',
      subject: subject._id, // Filter by the subject ID
    }).select('name description mcqs numberOfMcqs duration difficulty averageScore');

    if (tests.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No Subject tests found for the subject: ${subjectName}`,
      });
    }

    // Format the response to include detailed test information
    const detailedTests = tests.map(test => ({
      testId: test._id,
      name: test.name,
      description: test.description,
      mcqs: test.mcqs.map(mcq => ({
        question: mcq.question,
        options: mcq.options,
        correctAnswer: mcq.correctAnswer,
      })),
      numberOfMcqs: test.numberOfMcqs,
      duration: test.duration,
      difficulty: test.difficulty,
      averageScore: test.averageScore,
    }));

    res.status(200).json({
      success: true,
      subjectName,
      totalFLPTests: detailedTests.length, // Return the number of FullLength tests
      tests: detailedTests, // Return the detailed FullLength tests
    });
  } catch (error) {
    console.error('Error fetching detailed FullLength tests for the subject:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};