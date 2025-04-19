import All from '../models/All.js';

export const getAllFullLengthTests = async (req, res) => {
  try {
    // Retrieve all FullLength-type tests
    const tests = await All.find({
      type: 'FullLength'
    }).select('name description mcqs numberOfMcqs duration difficulty averageScore subject');

    if (tests.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No FullLength tests found',
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
      subjectId: test.subject, // Optional: Include the subject reference
    }));

    res.status(200).json({
      success: true,
      totalFullLengthTests: detailedTests.length,
      tests: detailedTests,
    });
  } catch (error) {
    console.error('Error fetching all FullLength tests:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
