"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  FileText,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useUser } from "@/app/context/UserContext"; // Assuming you have this context available

export default function SubjectTests() {
  const router = useRouter();
  const params = useParams();
  const subjectName = params?.subject;
  const { userId } = useUser(); // Get userId from context

  const [loading, setLoading] = useState(true);
  const [chapters, setChapters] = useState([]);
  const [flps, setFlps] = useState([]);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [userProgress, setUserProgress] = useState({});

  // Fetch data when component mounts or subject changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch chapters data using the correct API endpoint
        const chaptersResponse = await fetch(
          `http://localhost:5000/api/subjects/getChapters?subjectName=${subjectName}`
        );
        const chaptersData = await chaptersResponse.json();

        let chaptersWithTests = [];

        if (chaptersData.success) {
          // Transform the API response to match the component's expected format
          const chaptersWithoutTests = chaptersData.chapters.map(
            (chapter, index) => {
              return {
                id: chapter.chapterId,
                number: index + 1, // Add chapter number based on index
                name: chapter.chapterName,
                tests: [], // Initialize with empty tests array
              };
            }
          );

          // Fetch tests for each chapter
          chaptersWithTests = await Promise.all(
            chaptersWithoutTests.map(async (chapter) => {
              try {
                // Fetch detailed tests for this chapter
                const chapterTestsResponse = await fetch(
                  `http://localhost:5000/api/chapters/detailedChapWiseTests?chapterName=${chapter.name}`
                );
                const chapterTestsData = await chapterTestsResponse.json();

                if (chapterTestsData.success && chapterTestsData.tests) {
                  // Transform the test data to match the component's expected format
                  const formattedTests = chapterTestsData.tests.map((test) => ({
                    id: test.testId,
                    name: test.name,
                    questionCount: test.numberOfMcqs,
                    timeLimit: test.duration,
                    difficulty: test.difficulty,
                  }));

                  return {
                    ...chapter,
                    tests: formattedTests,
                  };
                }
                return chapter;
              } catch (error) {
                console.error(
                  `Error fetching tests for chapter ${chapter.name}:`,
                  error
                );
                return chapter;
              }
            })
          );

          setChapters(chaptersWithTests);

          // Initialize expanded state for chapters
          const expandedState = {};
          chaptersWithTests.forEach((chapter) => {
            expandedState[chapter.id] = false;
          });
          setExpandedChapters(expandedState);
        } else {
          console.error("Failed to fetch chapters:", chaptersData);
          setChapters(dummyChapters);
          chaptersWithTests = dummyChapters;

          // Initialize expanded state for dummy chapters
          const expandedState = {};
          dummyChapters.forEach((chapter) => {
            expandedState[chapter.id] = false;
          });
          setExpandedChapters(expandedState);
        }

        // Fetch FLPs data (subject-wise tests)
        let formattedFlps = [];
        try {
          const flpsResponse = await fetch(
            `http://localhost:5000/api/subjects/detailedSubWiseTests?subjectName=${subjectName}`
          );
          const flpsData = await flpsResponse.json();

          if (flpsData.success && flpsData.tests) {
            // Transform the FLP data to match the component's expected format
            formattedFlps = flpsData.tests.map((test) => ({
              id: test.testId,
              name: test.name,
              questionCount: test.numberOfMcqs,
              timeLimit: test.duration,
              year: "2024", // This data isn't in your API response, so using a default
              featured:
                test.difficulty === "Medium" || test.difficulty === "Hard", // Making featured based on difficulty
            }));

            setFlps(formattedFlps);
          } else {
            console.error("Failed to fetch FLPs:", flpsData);
            setFlps(dummyFlps);
            formattedFlps = dummyFlps;
          }
        } catch (error) {
          console.error("Error fetching FLPs:", error);
          setFlps(dummyFlps);
          formattedFlps = dummyFlps;
        }

        // Fetch user progress for all tests
        const progressData = {};

        // Gather all test IDs
        const allTestIds = [
          ...chaptersWithTests.flatMap((chapter) =>
            chapter.tests.map((test) => test.id)
          ),
          ...formattedFlps.map((flp) => flp.id),
        ];

        // Fetch progress for each test
        await Promise.all(
          allTestIds.map(async (testId) => {
            try {
              const progressResponse = await fetch(
                `http://localhost:5000/api/progress/getProgress?testId=${testId}&userId=${userId}`
              );
              const progressResult = await progressResponse.json();

              console.log("Progress result:", progressResult); // Debugging line

              if (progressResult.success && progressResult.percentage != null) {
                progressData[testId] = progressResult.percentage;
              } else {
                progressData[testId] = 0;
              }
            } catch (error) {
              console.error(
                `Error fetching progress for test ${testId}:`,
                error
              );
              progressData[testId] = 0; // Default to 0% if fetch fails
            }
          })
        );

        setUserProgress(progressData);
      } catch (error) {
        console.error("Error fetching subject data:", error);
        // Use dummy data if fetch fails
        setChapters(dummyChapters);
        setFlps(dummyFlps);

        // Initialize expanded state for dummy chapters
        const expandedState = {};
        dummyChapters.forEach((chapter) => {
          expandedState[chapter.id] = false;
        });
        setExpandedChapters(expandedState);

        // Set dummy progress data
        const dummyProgress = {};
        dummyChapters.forEach((chapter) => {
          chapter.tests.forEach((test) => {
            dummyProgress[test.id] = Math.floor(Math.random() * 100); // Random progress for demo
          });
        });
        dummyFlps.forEach((flp) => {
          dummyProgress[flp.id] = Math.floor(Math.random() * 100); // Random progress for demo
        });
        setUserProgress(dummyProgress);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subjectName, userId]);

  // Helper function to get progress circle color
  const getProgressColor = (percentage) => {
    if (percentage === 0) return "bg-gray-200"; // Not started
    if (percentage < 50) return "bg-red-500"; // Below 50%
    if (percentage < 75) return "bg-yellow-500"; // Below 75%
    return "bg-green-500"; // 75% or above
  };

  // Toggle chapter expansion
  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  // Handle starting an FLP test
  const startTest = (testID) => {
    const userId = localStorage.getItem("userId");
  
    if (userId) {
      router.push(`/Mdcat/${subjectName}/Tests/${testID}`);
    } else {
      // Save the intended path
      localStorage.setItem("redirectAfterLogin", `/Mdcat/${subjectName}/Tests/${testID}`);
      router.push("/User-Sign-In");
    }
  };
  

  // Go back to the main MDCAT tests page
  const goBack = () => {
    router.back();
  };

  // Subject-specific styling
  const getSubjectColor = () => {
    switch (subjectName.toLowerCase()) {
      case "biology":
        return "from-pink-400 to-pink-600";
      case "chemistry":
        return "from-indigo-800 to-indigo-900";
      case "physics":
        return "from-amber-400 to-amber-600";
      case "english":
        return "from-pink-400 to-red-500";
      case "logical-reasoning":
        return "from-blue-400 to-blue-600";
      default:
        return "from-purple-500 to-purple-700";
    }
  };

  // Subject-specific icon styling
  const getSubjectBorderColor = () => {
    switch (subjectName.toLowerCase()) {
      case "biology":
        return "border-pink-500";
      case "chemistry":
        return "border-indigo-900";
      case "physics":
        return "border-amber-500";
      case "english":
        return "border-red-500";
      case "logical-reasoning":
        return "border-blue-500";
      default:
        return "border-purple-600";
    }
  };

  // Progress Circle Component
  const ProgressCircle = ({ percentage }) => {
    const displayPercentage = percentage || 0;
    const colorClass = getProgressColor(displayPercentage);

    return (
      <div className="relative inline-flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <div
            className={`w-8 h-8 rounded-full ${colorClass} flex items-center justify-center`}
          >
            <span className="text-xs font-medium text-white">
              {displayPercentage}%
            </span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-700 font-medium">
          Loading {subjectName} content...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header with back button */}
      <div className="mb-8 flex items-center">
        <button
          onClick={goBack}
          className="flex items-center text-gray-600 hover:text-indigo-700 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Back</span>
        </button>
      </div>

      {/* Hero Section */}
      <div
        className={`mb-12 rounded-xl shadow-lg p-8 text-white bg-gradient-to-r ${getSubjectColor()}`}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {subjectName} Tests
          </h1>
        </div>
        <p className="text-white text-opacity-90 text-lg max-w-2xl">
          Practice chapter-wise tests and full-length papers to master{" "}
          {subjectName} concepts for MDCAT.
        </p>
      </div>

      {/* Content section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chapter-wise Tests Section - Takes 2/3 of the screen on larger devices */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2
              className={`text-xl font-bold mb-6 pb-2 border-b-2 ${getSubjectBorderColor()}`}
            >
              Chapter-wise Tests
            </h2>

            {chapters.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No chapters available for this subject.
              </p>
            ) : (
              <div className="space-y-4">
                {chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    {/* Chapter header - clickable to expand/collapse */}
                    <div
                      className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => toggleChapter(chapter.id)}
                    >
                      <div className="flex items-center">
                        <span className="text-lg font-medium text-gray-800">
                          {chapter.number}. {chapter.name}
                        </span>
                        <span className="ml-3 text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                          {chapter.tests.length} Tests
                        </span>
                      </div>
                      {expandedChapters[chapter.id] ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </div>

                    {/* Tests list - shown when chapter is expanded */}
                    {expandedChapters[chapter.id] && (
                      <div className="divide-y divide-gray-200">
                        {chapter.tests.length > 0 ? (
                          chapter.tests.map((test) => (
                            <div
                              key={test.id}
                              className="p-4 hover:bg-gray-50 transition-colors duration-200"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="font-medium text-gray-800">
                                    {test.name}
                                  </h3>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {test.questionCount} Questions •{" "}
                                    {test.timeLimit} minutes • {test.difficulty}
                                  </p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <ProgressCircle
                                    percentage={userProgress[test.id]}
                                  />
                                  <button
                                    onClick={() => startTest(test.id)}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                  >
                                    Start Test
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-gray-500">
                            No tests available for this chapter yet.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FLPs Section - Takes 1/3 of the screen on larger devices */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 h-full">
            <h2
              className={`text-xl font-bold mb-6 pb-2 border-b-2 ${getSubjectBorderColor()}`}
            >
              Full Length Papers (FLPs)
            </h2>

            {flps.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No FLPs available for this subject.
              </p>
            ) : (
              <div className="space-y-4">
                {flps.map((flp) => (
                  <div
                    key={flp.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <FileText className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-800">
                          {flp.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {flp.questionCount} Questions • {flp.timeLimit}{" "}
                          minutes
                        </p>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {flp.year}
                          </span>
                          {flp.featured && (
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ProgressCircle percentage={userProgress[flp.id]} />
                      </div>
                    </div>
                    <div className="mt-3 text-right">
                      <button
                        onClick={() => startTest(flp.id)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        Start Test
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500">
          Master {subjectName} concepts with our comprehensive MDCAT preparation
          resources
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
            Updated for 2025
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
            PMDC Aligned
          </span>
        </div>
      </div>
    </div>
  );
}

// Dummy data for chapters (used as fallback if API fails)
const dummyChapters = [
  {
    id: "ch1",
    number: 1,
    name: "Introduction to Cell Biology",
    tests: [
      {
        id: "test1",
        name: "Cell Structure Test",
        questionCount: 25,
        timeLimit: 30,
        difficulty: "Moderate",
      },
      {
        id: "test2",
        name: "Cell Functions Quiz",
        questionCount: 15,
        timeLimit: 20,
        difficulty: "Easy",
      },
      {
        id: "test3",
        name: "Advanced Cell Biology",
        questionCount: 30,
        timeLimit: 45,
        difficulty: "Hard",
      },
    ],
  },
  {
    id: "ch2",
    number: 2,
    name: "Biological Molecules",
    tests: [
      {
        id: "test4",
        name: "Carbohydrates Test",
        questionCount: 20,
        timeLimit: 25,
        difficulty: "Moderate",
      },
      {
        id: "test5",
        name: "Proteins and Enzymes",
        questionCount: 30,
        timeLimit: 40,
        difficulty: "Hard",
      },
    ],
  },
  {
    id: "ch3",
    number: 3,
    name: "Cell Division and Genetics",
    tests: [
      {
        id: "test6",
        name: "Mitosis and Meiosis",
        questionCount: 25,
        timeLimit: 30,
        difficulty: "Moderate",
      },
      {
        id: "test7",
        name: "Mendelian Genetics",
        questionCount: 20,
        timeLimit: 25,
        difficulty: "Moderate",
      },
    ],
  },
];

// Dummy data for FLPs (used as fallback if API fails)
const dummyFlps = [
  {
    id: "flp1",
    name: "Biology Paper 2024",
    questionCount: 100,
    timeLimit: 90,
    year: "2024",
    featured: true,
  },
  {
    id: "flp2",
    name: "PMDC Model Test",
    questionCount: 100,
    timeLimit: 90,
    year: "2024",
    featured: false,
  },
  {
    id: "flp3",
    name: "Biology Paper 2023",
    questionCount: 100,
    timeLimit: 90,
    year: "2023",
    featured: false,
  },
];
