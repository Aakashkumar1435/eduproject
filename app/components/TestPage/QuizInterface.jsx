"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { AlertCircle, CheckCircle } from "lucide-react";

// Import components
import QuizHeader from "./QuizHeader";
import ProgressBar from "./ProgressBar";
import QuestionDisplay from "./QuestionDisplay";
import OptionsSection from "./OptionsSection";
import FeedbackMessage from "./FeedbackMessage";
import NavigationButtons from "./NavigationButtons";
import QuestionNavigator from "./QuestionNavigator";
import ExitConfirmationModal from "./ExitConfirmationModal";
import FinishConfirmationModal from "./FinishConfirmationModal";

export default function QuizInterface() {
  const userId = localStorage.getItem("userId");
  const router = useRouter();
  const params = useParams();
  const testID = params?.testID;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testData, setTestData] = useState(null);
  const [mcqs, setMcqs] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [showFinishConfirmation, setShowFinishConfirmation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState(null);

  const timerInterval = useRef(null);

  // Fetch test data
  useEffect(() => {
    async function fetchTestData() {
      if (!testID) return;

      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/mcqs/getMcqs?testId=${testID}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch test data");
        }
        const data = await response.json();
        setTestData(data);

        if (data.test && data.test.mcqs && Array.isArray(data.test.mcqs)) {
          // Add correctAnswer field to each MCQ for demo
          const processedMcqs = data.test.mcqs.map((mcq) => {
            // For demonstration, set first option as correct if correctAnswer is not provided
            if (!mcq.correctAnswer && mcq.options && mcq.options.length > 0) {
              return { ...mcq, correctAnswer: 0 }; // First option (index 0) is correct
            }
            return mcq;
          });
          setMcqs(processedMcqs);
        } else {
          console.log("MCQs not fetched properly");
          // Demo data
          setMcqs([
            {
              id: "q1",
              question: "What is the SI unit of force?",
              options: ["Newton", "Joule", "Watt", "Pascal"],
              correctAnswer: 0,
              subject: "Physics",
            },
            {
              id: "q2",
              question: "Which of the following is NOT a noble gas?",
              options: ["Helium", "Neon", "Nitrogen", "Argon"],
              correctAnswer: 2,
              subject: "Chemistry",
            },
          ]);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load test data. Using demo data.");
        // Demo data
        setMcqs([
          {
            id: "q1",
            question: "What is the SI unit of force?",
            options: ["Newton", "Joule", "Watt", "Pascal"],
            correctAnswer: 0,
            subject: "Physics",
          },
          {
            id: "q2",
            question: "Which of the following is NOT a noble gas?",
            options: ["Helium", "Neon", "Nitrogen", "Argon"],
            correctAnswer: 2,
            subject: "Chemistry",
          },
        ]);
      } finally {
        setLoading(false);
        setStartTime(Date.now());
      }
    }

    fetchTestData();
  }, [testID]);

  // Timer
  useEffect(() => {
    if (!startTime || !testData) return;

    timerInterval.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeSpent(elapsed);

      if (testData.duration) {
        const remaining = Math.max(0, testData.duration * 60 - elapsed);
        setTimeRemaining(remaining);

        if (remaining <= 0) {
          clearInterval(timerInterval.current);
          handleSubmitTest();
        }
      }
    }, 1000);

    return () => clearInterval(timerInterval.current);
  }, [startTime, testData]);

  const handleAnswerSelect = (optionIndex) => {
    // Check if this question already has an answer
    if (selectedAnswers[currentQuestionIndex] !== undefined) {
      return; // Cannot change answer
    }

    // Set selected answer
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex,
    });

    // Determine if answer is correct
    const correctAnswer = mcqs[currentQuestionIndex].correctAnswer;
    const isCorrect = optionIndex === correctAnswer;

    // Save correct/incorrect status
    setCorrectAnswers({
      ...correctAnswers,
      [currentQuestionIndex]: isCorrect,
    });

    // Show feedback
    setAnswerFeedback({
      isCorrect,
      correctIndex: correctAnswer,
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < mcqs.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerFeedback(null);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswerFeedback(null);
    }
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < mcqs.length) {
      setCurrentQuestionIndex(index);
      setAnswerFeedback(null);
    }
  };

  const handleExit = () => {
    setShowExitConfirmation(true);
  };

  const confirmExit = () => {
    router.back();
  };

  const cancelExit = () => {
    setShowExitConfirmation(false);
  };

  const handleFinishClick = () => {
    setShowFinishConfirmation(true);
  };

  const confirmFinish = () => {
    setShowFinishConfirmation(false);
    handleSubmitTest();
  };

  const cancelFinish = () => {
    setShowFinishConfirmation(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleSubmitTest = async () => {
    setSubmitting(true);

    try {
      // Calculate total score
      const totalQuestions = mcqs.length;
      const correctCount = Object.values(correctAnswers).filter(isCorrect => isCorrect).length;
      const score = Math.round((correctCount / totalQuestions) * 100);

      const submissionData = {
        percentage: score,
        totalScore: correctCount,
        timeSpent: timeSpent,
      };

      const response = await fetch(`http://localhost:5000/api/progress/saveProgress?testId=${testID}&userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit test");
      }

    } catch (error) {
      console.error("Error submitting test:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
        <p className="ml-4 text-green-400 text-lg">Loading test...</p>
      </div>
    );
  }

  if (mcqs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md p-8 bg-gray-800 rounded-xl shadow-xl text-center">
          <AlertCircle className="mx-auto text-red-500 w-12 h-12 mb-4" />
          <h2 className="text-xl font-bold mb-3 text-white">No Questions Available</h2>
          <p className="text-gray-300 mb-6">
            Unable to load questions for this test.
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = mcqs[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === mcqs.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercentage =
    mcqs.length > 0 ? Math.floor((answeredCount / mcqs.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <QuizHeader
        testName={testData?.name}
        timeRemaining={timeRemaining}
        timeSpent={timeSpent}
        handleExit={handleExit}
        formatTime={formatTime}
      />

      {/* Progress Bar */}
      <ProgressBar progressPercentage={progressPercentage} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6">
        {error && (
          <div className="mb-4 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300 flex items-center">
            <AlertCircle size={20} className="mr-3 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-gray-800 rounded-xl shadow-xl p-6 md:p-8">
          {/* Question */}
          <QuestionDisplay 
            question={currentQuestion} 
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={mcqs.length}
          />

          {/* Options */}
          <OptionsSection
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswers={selectedAnswers}
            answerFeedback={answerFeedback}
            handleAnswerSelect={handleAnswerSelect}
          />

          {/* Feedback Message */}
          <FeedbackMessage answerFeedback={answerFeedback} />
        </div>

        {/* Navigation Buttons */}
        <NavigationButtons
          isFirstQuestion={isFirstQuestion}
          isLastQuestion={isLastQuestion}
          goToPreviousQuestion={goToPreviousQuestion}
          goToNextQuestion={goToNextQuestion}
          handleFinishClick={handleFinishClick}
          answeredCount={answeredCount}
          totalQuestions={mcqs.length}
          submitting={submitting}
        />

        {/* Question Navigator */}
        <QuestionNavigator
          mcqs={mcqs}
          currentQuestionIndex={currentQuestionIndex}
          selectedAnswers={selectedAnswers}
          correctAnswers={correctAnswers}
          goToQuestion={goToQuestion}
          progressPercentage={progressPercentage}
        />
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirmation && (
        <ExitConfirmationModal
          cancelExit={cancelExit}
          confirmExit={confirmExit}
        />
      )}

      {/* Finish Test Confirmation Modal */}
      {showFinishConfirmation && (
        <FinishConfirmationModal
          answeredCount={answeredCount}
          totalQuestions={mcqs.length}
          cancelFinish={cancelFinish}
          confirmFinish={confirmFinish}
        />
      )}
    </div>
  );
}