import All from "../models/All.js";

// Save user progress after test is completed
export const saveUserProgress = async (req, res) => {
  try {
    // Get testId and userId from query params
    const { testId, userId } = req.query;

    // Get totalScore, timeSpent, and percentage from the request body
    const { totalScore, timeSpent, percentage } = req.body;

    // Validate the presence of required fields
    if (!testId || !userId || percentage == null || totalScore == null || !timeSpent) {
      return res.status(400).json({ message: "testId, userId, totalScore, timeSpent, and percentage are required." });
    }

    // Find the test document by testId
    const test = await All.findById(testId);

    if (!test) {
      return res.status(404).json({ message: "Test not found." });
    }

    // Find the existing progress entry for the user
    const existingProgressIndex = test.userProgress.findIndex(
      (progress) => progress.userId.toString() === userId
    );

    // If the user has already taken the test, we may want to update their progress
    if (existingProgressIndex !== -1) {
      const existingPercentage = test.userProgress[existingProgressIndex].percentage || 0;

      // Only update if the new percentage is better than the existing one
      if (percentage > existingPercentage) {
        test.userProgress[existingProgressIndex].percentage = percentage;
        test.userProgress[existingProgressIndex].totalScore = totalScore;
        test.userProgress[existingProgressIndex].timeSpent = timeSpent;
        test.userProgress[existingProgressIndex].completedAt = new Date();
      }
      // Otherwise, do not update the existing progress if it's not better
    } else {
      // If no progress exists for the user, create a new entry
      test.userProgress.push({
        userId,
        percentage,
        totalScore,
        timeSpent,
        completedAt: new Date(),
      });
    }

    // Save the updated test document
    await test.save();

    return res.status(200).json({ message: "Progress saved successfully." });
  } catch (error) {
    console.error("Error saving progress:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};


// Get user progress for a specific test
export const getUserProgress = async (req, res) => {
  try {
    const { testId, userId } = req.query;

    if (!testId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "testId and userId are required." });
    }

    const test = await All.findById(testId);

    if (!test) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found." });
    }

    const userProgress = test.userProgress.find(
      (progress) => progress.userId.toString() === userId
    );

    if (!userProgress) {
      // 👉 Proper error response
      return res.status(200).json({
        success: true,
        percentage: 0,
      });
    }

    // 👉 Success response
    return res.status(200).json({
      success: true,
      percentage: userProgress.percentage,
    });
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};

export const getUserTestSummary = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is required." });
    }

    // Fetch all tests
    const allTests = await All.find({});

    const totalTests = allTests.length;

    let attemptedTests = 0;

    allTests.forEach((test) => {
      const hasAttempted = test.userProgress.some(
        (progress) => progress.userId.toString() === userId
      );
      if (hasAttempted) {
        attemptedTests += 1;
      }
    });

    const unattemptedTests = totalTests - attemptedTests;

    return res.status(200).json({
      success: true,
      totalTests,
      attemptedTests,
      unattemptedTests,
    });
  } catch (error) {
    console.error("Error fetching test summary:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};