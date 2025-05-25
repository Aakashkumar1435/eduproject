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
  BookOpenCheck,
  Award,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useUser } from "@/app/context/UserContext"; // Assuming you have this context available
import {Navbar} from "@/app/components/Mdcat/Navbar";

export default function SubjectTests() {
  const router = useRouter();
  const params = useParams();
  const subjectName = params?.subject;
  const userId = localStorage.getItem("userId");

  const [loading, setLoading] = useState(true);
  const [chapters, setChapters] = useState([]);
  const [flps, setFlps] = useState([]);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [userProgress, setUserProgress] = useState({});

  // Fetch data when component mounts or subject changes
  useEffect(() => {
    if(!userId) {
      // Redirect to login if userId is not found
      // Also store redirectAfterLogin
      localStorage.setItem("redirectAfterLogin", `/Mdcat/${subjectName}/Tests`);
      router.push("/User-Sign-In");
    }
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

              console.log("Progress result:", progressResponse); // Debugging line

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
    if (percentage === 0) return "bg-slate-700"; // Not started
    if (percentage < 50) return "bg-rose-500"; // Below 50%
    if (percentage < 75) return "bg-amber-500"; // Below 75%
    return "bg-emerald-500"; // 75% or above
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
      return "from-green-700 to-teal-900";
    case "chemistry":
      return "from-purple-700 to-indigo-900";
    case "physics":
      return "from-yellow-600 to-amber-800";
    case "english":
      return "from-pink-600 to-rose-900";
    case "logical-reasoning":
      return "from-sky-600 to-blue-900";
    default:
      return "from-fuchsia-600 to-violet-900";
  }
};


  // Subject-specific accent color
  const getSubjectAccentColor = () => {
  switch (subjectName.toLowerCase()) {
    case "biology":
      return "border-teal-400 text-teal-300";
    case "chemistry":
      return "border-indigo-400 text-indigo-300";
    case "physics":
      return "border-amber-400 text-amber-300";
    case "english":
      return "border-rose-400 text-rose-300";
    case "logical-reasoning":
      return "border-blue-400 text-blue-300";
    default:
      return "border-violet-400 text-violet-300";
  }
};


  // Progress Circle Component
  const ProgressCircle = ({ percentage }) => {
    const displayPercentage = percentage || 0;
    const colorClass = getProgressColor(displayPercentage);

    return (
      <div className="relative inline-flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
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
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
        <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mb-4" />
        <p className="text-slate-300 font-medium">
          Loading {subjectName} content...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-slate-900 min-h-screen text-slate-200">
      <Navbar />


      {/* Hero Section */}
      <div
        className={`mb-12 rounded-xl shadow-xl p-8 text-white bg-gradient-to-r ${getSubjectColor()} border border-slate-700`}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-black bg-opacity-20 flex items-center justify-center backdrop-blur-sm border border-white border-opacity-10">
            <BookOpenCheck className="w-8 h-8 text-white" strokeWidth={1.5} />
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
          <div className="bg-slate-800 rounded-xl shadow-xl p-6 mb-8 border border-slate-700">
            <h2
              className={`text-xl font-bold mb-6 pb-2 border-b-2 ${getSubjectAccentColor()}`}
            >
              <BookOpen className="inline-block mr-2 mb-1" size={20} strokeWidth={1.5} />
              Chapter-wise Tests
            </h2>

            {chapters.length === 0 ? (
              <p className="text-slate-400 text-center py-8">
                No chapters available for this subject.
              </p>
            ) : (
              <div className="space-y-4">
                {chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="border border-slate-700 rounded-lg overflow-hidden bg-slate-850"
                  >
                    {/* Chapter header - clickable to expand/collapse */}
                    <div
                      className="bg-slate-800 p-4 flex justify-between items-center cursor-pointer hover:bg-slate-750 transition-colors duration-200"
                      onClick={() => toggleChapter(chapter.id)}
                    >
                      <div className="flex items-center">
                        <span className="text-lg font-medium text-slate-200">
                          {chapter.number}. {chapter.name}
                        </span>
                        <span className="ml-3 text-sm bg-slate-700 text-cyan-300 px-2 py-1 rounded-full">
                          {chapter.tests.length} Tests
                        </span>
                      </div>
                      {expandedChapters[chapter.id] ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" strokeWidth={1.5} />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" strokeWidth={1.5} />
                      )}
                    </div>

                    {/* Tests list - shown when chapter is expanded */}
                    {expandedChapters[chapter.id] && (
                      <div className="divide-y divide-slate-700">
                        {chapter.tests.length > 0 ? (
                          chapter.tests.map((test) => (
                            <div
                              key={test.id}
                              className="p-4 hover:bg-slate-750 transition-colors duration-200"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="font-medium text-slate-200">
                                    {test.name}
                                  </h3>
                                  <p className="text-sm text-slate-400 mt-1 flex items-center gap-1">
                                    <CheckCircle2 size={14} className="inline mr-1" strokeWidth={1.5} />
                                    {test.questionCount} Questions 
                                    <span className="mx-1">•</span>
                                    <Clock size={14} className="inline mr-1" strokeWidth={1.5} />
                                    {test.timeLimit} minutes
                                    <span className="mx-1">•</span>
                                    <AlertCircle size={14} className="inline mr-1" strokeWidth={1.5} />
                                    {test.difficulty}
                                  </p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <ProgressCircle
                                    percentage={userProgress[test.id]}
                                  />
                                  <button
                                    onClick={() => startTest(test.id)}
                                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                  >
                                    Start Test
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-slate-400">
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
          <div className="bg-slate-800 rounded-xl shadow-xl p-6 h-full border border-slate-700">
            <h2
              className={`text-xl font-bold mb-6 pb-2 border-b-2 ${getSubjectAccentColor()}`}
            >
              <Award className="inline-block mr-2 mb-1" size={20} strokeWidth={1.5} />
              Full Length Papers (FLPs)
            </h2>

            {flps.length === 0 ? (
              <p className="text-slate-400 text-center py-8">
                No FLPs available for this subject.
              </p>
            ) : (
              <div className="space-y-4">
                {flps.map((flp) => (
                  <div
                    key={flp.id}
                    className="border border-slate-700 rounded-lg p-4 hover:border-cyan-800 hover:bg-slate-750 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-slate-700 p-2 rounded-lg">
                        <FileText className="w-6 h-6 text-cyan-400" strokeWidth={1.5} />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-slate-200">
                          {flp.name}
                        </h3>
                        <p className="text-sm text-slate-400 mt-1 flex items-center">
                          <CheckCircle2 size={14} className="inline mr-1" strokeWidth={1.5} />
                          {flp.questionCount} Questions
                          <span className="mx-1">•</span> 
                          <Clock size={14} className="inline mr-1" strokeWidth={1.5} />
                          {flp.timeLimit} minutes
                        </p>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className="bg-slate-700 text-emerald-400 text-xs px-2 py-1 rounded-full">
                            {flp.year}
                          </span>
                          {flp.featured && (
                            <span className="bg-slate-700 text-amber-400 text-xs px-2 py-1 rounded-full">
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
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
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

    </div>
  );
}