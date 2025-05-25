import Chapter from '../models/Chapter.js';
import All from '../models/All.js';

export const getMcqsByTestId = async (req, res) => {
  try {
    const { testId } = req.query; // Get testId from the URL query parameter

    if (!testId) {
      return res.status(400).json({
        success: false,
        message: 'Test ID is required',
      });
    }

    // Find the test by testId
    const test = await All.findById(testId);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found',
      });
    }

    // If the test exists, format the response to include detailed test information
    const detailedTest = {
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
    };

    res.status(200).json({
      success: true,
      testId,
      test: detailedTest, // Return the detailed test
    });
  } catch (error) {
    console.error('Error fetching MCQs for the test:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
