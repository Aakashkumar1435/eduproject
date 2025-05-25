'use client'

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Search,
  Filter,
  PlayCircle,
  Clock,
  Calendar,
  ChevronDown,
} from "lucide-react";

export default function VideoLectures() {
  const router = useRouter();
  const params = useParams();
  const subject = params.subject;
  console.log("Subject from params:", subject);

  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Only fetch when subjectName is available
    if (subject) {
      fetchLectures();
    }
  }, [subject]);

  const fetchLectures = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch(
        `http://localhost:5000/api/videos/getLectures?subject=${subject}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch lectures");
      }

      const data = await response.json();
      setLectures(data);

      // Extract unique chapters
      const uniqueChapters = [
        ...new Set(data.map((lecture) => lecture.chapterName)),
      ];
      setChapters(uniqueChapters);

      // Set the first video as selected by default if available
      if (data.length > 0) {
        setSelectedVideo(data[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter lectures based on search term and selected chapter
  const filteredLectures = lectures.filter((lecture) => {
    const matchesSearch = lecture.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesChapter = selectedChapter
      ? lecture.chapterName === selectedChapter
      : true;
    return matchesSearch && matchesChapter;
  });

  // Format seconds to MM:SS
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading && !lectures.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-600">
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <p>{error}</p>
        <button
          onClick={fetchLectures}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {subject} Lectures
          </h1>
          <p className="text-gray-600 mt-2">
            Browse and watch video lectures for {subject}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main video display */}
          <div className="w-full lg:w-8/12">
            {selectedVideo ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Fixed-size video container */}
                <div className="relative bg-black">
                  <div className="w-full h-96 md:h-96 lg:h-96 xl:h-96">
                    <video
                      src={selectedVideo.videoUrl}
                      controls
                      className="absolute top-0 left-0 w-full h-full object-contain"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
                <div className="p-4 border-t">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedVideo.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>{formatDate(selectedVideo.uploadedAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>{formatDuration(selectedVideo.duration)}</span>
                    </div>
                    <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {selectedVideo.chapterName}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center h-96">
                <p className="text-gray-500">No video selected</p>
              </div>
            )}
          </div>

          {/* Sidebar with search, filter and video list */}
          <div className="w-full lg:w-4/12">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              {/* Search input */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search lectures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <Search
                  size={18}
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                />
              </div>

              {/* Chapter filter */}
              <div className="relative">
                <select
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(e.target.value)}
                  className="w-full pl-10 pr-8 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                  <option value="">All Chapters</option>
                  {chapters.map((chapter) => (
                    <option key={chapter} value={chapter}>
                      {chapter}
                    </option>
                  ))}
                </select>
                <Filter
                  size={18}
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                />
                <ChevronDown
                  size={18}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            {/* Video list */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900">
                  {filteredLectures.length}{" "}
                  {filteredLectures.length === 1 ? "Lecture" : "Lectures"}{" "}
                  Available
                </h3>
              </div>

              <div className="divide-y max-h-96 overflow-y-auto">
                {filteredLectures.length > 0 ? (
                  filteredLectures.map((lecture) => (
                    <div
                      key={lecture._id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition ${
                        selectedVideo && selectedVideo._id === lecture._id
                          ? "bg-blue-50"
                          : ""
                      }`}
                      onClick={() => setSelectedVideo(lecture)}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 flex items-start">
                          <div className="w-24 h-16 bg-gray-200 rounded relative overflow-hidden">
                            {/* Video thumbnail would ideally be here */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <PlayCircle size={24} className="text-gray-500" />
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {lecture.title}
                          </h4>
                          <div className="flex items-center mt-1 text-xs text-gray-600">
                            <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                              {lecture.chapterName}
                            </span>
                            <span className="mx-2">•</span>
                            <Clock size={12} className="mr-1" />
                            <span>{formatDuration(lecture.duration)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No lectures found matching your criteria
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}