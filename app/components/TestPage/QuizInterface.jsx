"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Flag,
  LayoutGrid,
  X,
  LockIcon,
} from "lucide-react";

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
import Swal from "sweetalert2";

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
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [showNavigator, setShowNavigator] = useState(false);

  const timerInterval = useRef(null);

  // Fetch test data
  useEffect(() => {
    if (!userId) {
      localStorage.setItem("redirectAfterLogin", `/test/${testID}`);
      router.push("/User-Sign-In");
      return;
    }

    if (!testID) return;

    async function fetchTestData() {
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
  }, [testID, userId, router]);

  // Timer
  useEffect(() => {
    if (!startTime || !testData || testSubmitted) return;

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
  }, [startTime, testData, testSubmitted]);

  const handleAnswerSelect = (optionIndex) => {
    // If test is submitted or question already answered, prevent selection
    if (testSubmitted || selectedAnswers[currentQuestionIndex] !== undefined) {
      return;
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
    // Stop the timer
    clearInterval(timerInterval.current);
    // Mark test as submitted to prevent further answers
    setTestSubmitted(true);

    try {
      // Calculate total score
      const totalQuestions = mcqs.length;
      const correctCount = Object.values(correctAnswers).filter(
        (isCorrect) => isCorrect
      ).length;
      const score = Math.round((correctCount / totalQuestions) * 100);

      const submissionData = {
        percentage: score,
        totalScore: correctCount,
        timeSpent: timeSpent,
      };

      // Show the results in SweetAlert2
      Swal.fire({
        title: "Test Submitted!",
        html: `
        <div class="text-center">
          <div class="mb-4">
            <div class="text-3xl font-bold ${
              score >= 70
                ? "text-green-500"
                : score >= 50
                ? "text-amber-500"
                : "text-rose-500"
            }">
              ${score}%
            </div>
            <div class="text-gray-600 mt-1">Your Score</div>
          </div>
          <div class="flex justify-center gap-6 mb-2">
            <div>
              <div class="font-semibold text-lg">${correctCount}</div>
              <div class="text-sm text-gray-500">Correct</div>
            </div>
            <div>
              <div class="font-semibold text-lg">${
                totalQuestions - correctCount
              }</div>
              <div class="text-sm text-gray-500">Incorrect</div>
            </div>
            <div>
              <div class="font-semibold text-lg">${totalQuestions}</div>
              <div class="text-sm text-gray-500">Total</div>
            </div>
          </div>
        </div>
      `,
        icon: score >= 70 ? "success" : score >= 50 ? "info" : "warning",
        confirmButtonText: "View Details",
        allowOutsideClick: false,
        customClass: {
          confirmButton: "bg-cyan-600 hover:bg-cyan-700",
        },
      });

      const response = await fetch(
        `http://localhost:5000/api/progress/saveProgress?testId=${testID}&userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit test");
      }
    } catch (error) {
      console.error("Error submitting test:", error);
      Swal.fire({
        title: "Error!",
        text: "There was a problem submitting your test. Your results may not have been saved.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleNavigator = () => {
    setShowNavigator(!showNavigator);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
        <p className="ml-4 text-cyan-400 text-lg font-medium">
          Loading test...
        </p>
      </div>
    );
  }

  if (mcqs.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md p-8 bg-slate-800 rounded-xl shadow-xl text-center border border-slate-700">
          <AlertCircle
            className="mx-auto text-rose-500 w-12 h-12 mb-4"
            strokeWidth={1.5}
          />
          <h2 className="text-xl font-bold mb-3 text-white">
            No Questions Available
          </h2>
          <p className="text-slate-300 mb-6">
            Unable to load questions for this test.
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors shadow-lg"
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

  // Enhanced Quiz Header Component
  const EnhancedQuizHeader = () => (
    <div className="bg-slate-800 border-b border-slate-700 py-3 px-4 md:px-8 sticky top-0 z-10 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center">
          <button
            onClick={handleExit}
            className="mr-4 p-2 rounded-full hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
            aria-label="Exit test"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>

          <h1 className="text-lg md:text-xl font-bold text-white truncate max-w-xs md:max-w-md">
            {testData?.name || "Practice Test"}
          </h1>
        </div>

        <div className="flex items-center space-x-4 ml-auto">
          {timeRemaining !== null && (
            <div
              className={`flex items-center gap-2 ${
                timeRemaining < 300 ? "text-rose-400" : "text-cyan-400"
              }`}
            >
              <Clock size={20} strokeWidth={1.5} />
              <span className="font-mono text-lg">
                {formatTime(timeRemaining)}
              </span>
            </div>
          )}

          <button
            onClick={toggleNavigator}
            className="p-2 rounded-full hover:bg-slate-700 transition-colors bg-slate-750 border border-slate-600"
            aria-label="Show question navigator"
          >
            <LayoutGrid
              size={20}
              className="text-slate-300"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </div>
  );

  // Enhanced Progress Bar Component
  const EnhancedProgressBar = () => (
    <div className="h-2 bg-slate-700 relative overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-500 ease-out"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );

  // Enhanced Question Display Component
  const EnhancedQuestionDisplay = () => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-cyan-600 text-white py-1 px-3 rounded-full text-sm font-medium">
            Question {currentQuestionIndex + 1}/{mcqs.length}
          </span>
          {currentQuestion.subject && (
            <span className="bg-slate-700 text-cyan-300 py-1 px-3 rounded-full text-xs">
              {currentQuestion.subject}
            </span>
          )}
        </div>

        {testSubmitted && (
          <div className="flex items-center gap-2 text-amber-400 bg-amber-900/20 py-1 px-3 rounded-full">
            <LockIcon size={14} strokeWidth={1.5} />
            <span className="text-xs font-medium">Test Submitted</span>
          </div>
        )}
      </div>

      <div className="text-lg md:text-xl text-white font-medium leading-relaxed">
        {currentQuestion.question}
      </div>
    </div>
  );

  // Enhanced Options Section Component
  const EnhancedOptionsSection = () => {
    const options = currentQuestion.options || [];
    const selectedAnswer = selectedAnswers[currentQuestionIndex];
    const isAnswered = selectedAnswer !== undefined;
    const correctIndex = currentQuestion.correctAnswer;

    return (
      <div className="space-y-3 mt-6">
        {options.map((option, index) => {
          let optionClass =
            "border border-slate-700 bg-slate-800 hover:border-slate-500";

          if (testSubmitted) {
            // If test is submitted, show correct and incorrect answers
            if (index === correctIndex) {
              optionClass =
                "border-emerald-500 bg-emerald-900/20 text-emerald-300";
            } else if (selectedAnswer === index) {
              optionClass = "border-rose-500 bg-rose-900/20 text-rose-300";
            } else {
              optionClass = "border-slate-700 bg-slate-800 opacity-60";
            }
          } else if (isAnswered) {
            // If question is answered but test not submitted
            if (selectedAnswer === index) {
              if (index === correctIndex) {
                optionClass =
                  "border-emerald-500 bg-emerald-900/20 text-emerald-300";
              } else {
                optionClass = "border-rose-500 bg-rose-900/20 text-rose-300";
              }
            } else if (index === correctIndex && answerFeedback) {
              optionClass =
                "border-emerald-500 bg-emerald-900/20 text-emerald-300";
            } else {
              optionClass = "border-slate-700 bg-slate-800 opacity-60";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered || testSubmitted}
              className={`w-full p-4 md:p-5 rounded-lg text-left transition-all duration-200 flex items-start ${optionClass} ${
                !isAnswered && !testSubmitted ? "hover:bg-slate-750" : ""
              }`}
            >
              <div className="flex-shrink-0 mr-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                    isAnswered && selectedAnswer === index
                      ? "border-transparent"
                      : "border-slate-600"
                  } ${
                    selectedAnswer === index
                      ? index === correctIndex
                        ? "bg-emerald-500"
                        : "bg-rose-500"
                      : "bg-slate-700"
                  }`}
                >
                  <span className="text-white font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                </div>
              </div>
              <span className="text-slate-200 mt-1">{option}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // Enhanced Navigation Buttons Component
  const EnhancedNavigationButtons = () => (
    <div className="mt-8 flex flex-wrap justify-between items-center gap-4">
      <button
        onClick={goToPreviousQuestion}
        disabled={isFirstQuestion}
        className={`flex items-center gap-2 py-2.5 px-5 rounded-lg border border-slate-700 transition-colors ${
          isFirstQuestion
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-slate-700"
        }`}
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-4">
        <div className="text-slate-400 text-sm">
          <span className="text-cyan-400 font-medium">{answeredCount}</span> of{" "}
          {mcqs.length} answered
        </div>

        {!isLastQuestion ? (
          <button
            onClick={goToNextQuestion}
            className="bg-cyan-600 hover:bg-cyan-700 text-white py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        ) : (
          <button
            onClick={handleFinishClick}
            disabled={submitting || testSubmitted}
            className={`bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors ${
              submitting || testSubmitted ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                <span>Submitting...</span>
              </>
            ) : testSubmitted ? (
              <span>Submitted</span>
            ) : (
              <>
                <span>Finish Test</span>
                <Flag size={16} strokeWidth={1.5} />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );

  // Enhanced Question Navigator Component
  const EnhancedQuestionNavigator = () => (
    <div
      className={`fixed inset-0 bg-slate-900/95 z-20 transition-opacity duration-300 backdrop-blur-sm ${
        showNavigator ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="h-full max-w-xl mx-auto p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Question Navigator</h2>
          <button
            onClick={toggleNavigator}
            className="p-2 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 mb-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300">Progress</span>
            <span className="text-cyan-400 font-medium">
              {progressPercentage}%
            </span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
            {mcqs.map((_, index) => {
              const isSelected = currentQuestionIndex === index;
              const isAnswered = selectedAnswers[index] !== undefined;
              const isCorrect = correctAnswers[index];

              let btnClass =
                "flex items-center justify-center h-12 rounded-lg font-medium transition-all";

              if (isSelected) {
                btnClass +=
                  " ring-2 ring-cyan-500 ring-offset-2 ring-offset-slate-800";
              }

              if (isAnswered) {
                if (isCorrect) {
                  btnClass +=
                    " bg-emerald-900/30 border border-emerald-600 text-emerald-400";
                } else {
                  btnClass +=
                    " bg-rose-900/30 border border-rose-600 text-rose-400";
                }
              } else {
                btnClass +=
                  " bg-slate-750 border border-slate-700 text-slate-300 hover:border-cyan-600";
              }

              return (
                <button
                  key={index}
                  onClick={() => {
                    goToQuestion(index);
                    toggleNavigator();
                  }}
                  className={btnClass}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-900/30 border border-emerald-600"></div>
              <span className="text-sm text-slate-300">Correct</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-rose-900/30 border border-rose-600"></div>
              <span className="text-sm text-slate-300">Incorrect</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-750 border border-slate-700"></div>
              <span className="text-sm text-slate-300">Unanswered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Exit Confirmation Modal Component
  const EnhancedExitConfirmationModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-30">
      <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full mx-4 border border-slate-700 shadow-2xl">
        <div className="mb-4 text-center">
          <div className="bg-amber-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle
              size={32}
              className="text-amber-400"
              strokeWidth={1.5}
            />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Exit Test?</h3>
          <p className="text-slate-300">
            Your progress will be saved, but you'll need to restart the test
            from the beginning next time.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={cancelExit}
            className="flex-1 py-3 px-4 border border-slate-600 hover:bg-slate-700 rounded-lg text-slate-200 transition-colors"
          >
            Continue Test
          </button>
          <button
            onClick={confirmExit}
            className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-700 rounded-lg text-white transition-colors"
          >
            Exit Test
          </button>
        </div>
      </div>
    </div>
  );

  // Enhanced Finish Confirmation Modal Component
  const EnhancedFinishConfirmationModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-30">
      <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full mx-4 border border-slate-700 shadow-2xl">
        <div className="mb-4 text-center">
          <div className="bg-cyan-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Flag size={32} className="text-cyan-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Submit Test?</h3>
          <p className="text-slate-300">
            You've answered{" "}
            <span className="text-cyan-400 font-medium">{answeredCount}</span>{" "}
            out of{" "}
            <span className="text-cyan-400 font-medium">{mcqs.length}</span>{" "}
            questions.
          </p>

          {answeredCount < mcqs.length && (
            <div className="mt-4 bg-amber-900/20 p-3 rounded-lg border border-amber-800/30">
              <p className="text-amber-300 text-sm flex items-start">
                <AlertCircle
                  size={16}
                  className="mr-2 mt-0.5 flex-shrink-0"
                  strokeWidth={1.5}
                />
                You have {mcqs.length - answeredCount} unanswered questions. You
                won't be able to change your answers after submission.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={cancelFinish}
            className="flex-1 py-3 px-4 border border-slate-600 hover:bg-slate-700 rounded-lg text-slate-200 transition-colors"
          >
            Continue Test
          </button>
          <button
            onClick={confirmFinish}
            className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white transition-colors"
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Custom Header */}
      <EnhancedQuizHeader />

      {/* Custom Progress Bar */}
      <EnhancedProgressBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6">
        {error && (
          <div className="mb-4 p-4 bg-rose-900/30 border border-rose-700 rounded-lg text-rose-300 flex items-center">
            <AlertCircle
              size={20}
              className="mr-3 flex-shrink-0"
              strokeWidth={1.5}
            />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-slate-800 rounded-xl shadow-xl p-6 md:p-8 border border-slate-700">
          {/* Custom Question Display */}
          <EnhancedQuestionDisplay />

          {/* Custom Options Section */}
          <EnhancedOptionsSection />
        </div>

        {/* Custom Navigation Buttons */}
        <EnhancedNavigationButtons />
      </div>

      {/* Custom Question Navigator Overlay */}
      <EnhancedQuestionNavigator />

      {/* Custom Exit Confirmation Modal */}
      {showExitConfirmation && <EnhancedExitConfirmationModal />}

      {/* Custom Finish Test Confirmation Modal */}
      {showFinishConfirmation && <EnhancedFinishConfirmationModal />}
    </div>
  );
}
