import All from "../models/All.js";

// Save user progress after test is completed
import User from "../models/User.js";

export const saveUserProgress = async (req, res) => {
  try {
    const { testId, userId } = req.query;
    const { totalScore, timeSpent, percentage } = req.body;

    if (
      !testId ||
      !userId ||
      percentage == null ||
      totalScore == null ||
      !timeSpent
    ) {
      return res.status(400).json({
        message:
          "testId, userId, totalScore, timeSpent, and percentage are required.",
      });
    }

    const test = await All.findById(testId);
    if (!test) return res.status(404).json({ message: "Test not found." });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const existingProgressIndex = test.userProgress.findIndex(
      (progress) => progress.userId.toString() === userId
    );

    let scoreImprovedBy = 0;

    if (existingProgressIndex !== -1) {
      const existingProgress = test.userProgress[existingProgressIndex];
      const previousScore = existingProgress.totalScore || 0;

      if (totalScore > previousScore) {
        scoreImprovedBy = totalScore - previousScore;

        // Update the user's progress
        test.userProgress[existingProgressIndex].percentage = percentage;
        test.userProgress[existingProgressIndex].totalScore = totalScore;
        test.userProgress[existingProgressIndex].timeSpent = timeSpent;
        test.userProgress[existingProgressIndex].completedAt = new Date();
      }
    } else {
      // No previous progress: count entire score as improvement
      scoreImprovedBy = totalScore;

      test.userProgress.push({
        userId,
        percentage,
        totalScore,
        timeSpent,
        completedAt: new Date(),
      });
    }

    await test.save();

    // If score improved, update user points and level
    if (scoreImprovedBy > 0) {
      user.point += scoreImprovedBy;

      // Optional: Update level — 10 points per level
      user.level = Math.floor(user.point / 30) + 1;

      await user.save();
    }

    return res.status(200).json({
      message: "Progress saved successfully.",
      addedPoints: scoreImprovedBy,
    });
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

export const getAllUsersProgress = async (req, res) => {
  try {
    // Find users with points > 0 and select only required fields
    const users = await User.find({ point: { $gt: 0 } })
      .select("name level point avatar")
      .sort({ point: -1 });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users' progress:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};