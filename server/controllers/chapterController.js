import Chapter from '../models/Chapter.js';
import All from '../models/All.js';

export const getDetailedChapterTestsByChapter = async (req, res) => {
  try {
    const { chapterName } = req.query; // Get chapterName from the URL parameter

    if (!chapterName) {
      return res.status(400).json({
        success: false,
        message: 'Chapter name is required',
      });
    }

    // Find the chapter by name (case insensitive)
    const chapter = await Chapter.findOne({ name: { $regex: new RegExp(`^${chapterName}$`, 'i') } });

    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: 'Chapter not found',
      });
    }

    // Retrieve all Chapter-type tests for the given chapter
    const tests = await All.find({
      type: 'Chapter', // Only looking for Chapter-type tests
      chapter: chapter._id, // Filter by the chapter ID
    }).select('name description mcqs numberOfMcqs duration difficulty averageScore');

    if (tests.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No chapter-wise tests found for the chapter: ${chapterName}`,
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
      chapterName,
      totalChapterTests: detailedTests.length, // Return the number of chapter tests
      tests: detailedTests, // Return the detailed chapter tests
    });
  } catch (error) {
    console.error('Error fetching detailed chapter tests for the chapter:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
