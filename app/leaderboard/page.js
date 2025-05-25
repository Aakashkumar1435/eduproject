"use client";
import React, { useState, useEffect } from "react";
import { HomeNavbar } from '../components/Mdcat/PageNavbar';

import {
  Trophy,
  Medal,
  UserCircle2,
  ChevronUp,
  ChevronDown,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  Loader2,
} from "lucide-react";
import LeaderboardHeader from "@/app/components/Leaderboard/LeaderboardHeader";
import LeaderboardStats from "@/app/components/Leaderboard/LeaderboatdStats";
import SearchBar from "@/app/components/Leaderboard/SearchBar";
import LeaderboardFilter from "@/app/components/Leaderboard/LeaderboardFilter";

// Updated UserCard component for the new data structure
const UserCard = ({ user, expanded, toggleExpand, rank }) => {
  // Extract user data based on what's available from your backend
  const { name, level, point, avatar, _id } = user;
  const loggedInUserId = localStorage.getItem("userId");
  const isCurrentUser = user._id === loggedInUserId;
  let userStyling;

  const getLevelStyling = (level) => {
    if (level <= 5) {
      return {
        borderColor: "border-green-500",
        textColor: "text-green-500",
        bgColor: "bg-green-500",
        badgeBg: "bg-green-100",
        badgeText: "text-green-800",
        title: "Beginner",
      };
    } else if (level <= 10) {
      return {
        borderColor: "border-blue-500",
        textColor: "text-blue-500",
        bgColor: "bg-blue-500",
        badgeBg: "bg-blue-100",
        badgeText: "text-blue-800",
        title: "Intermediate",
      };
    } else if (level <= 15) {
      return {
        borderColor: "border-purple-500",
        textColor: "text-purple-500",
        bgColor: "bg-purple-500",
        badgeBg: "bg-purple-100",
        badgeText: "text-purple-800",
        title: "Advanced",
      };
    } else if (level <= 20) {
      return {
        borderColor: "border-yellow-500",
        textColor: "text-yellow-500",
        bgColor: "bg-yellow-500",
        badgeBg: "bg-yellow-100",
        badgeText: "text-yellow-800",
        title: "Expert",
      };
    } else if (level <= 30) {
      return {
        borderColor: "border-orange-500",
        textColor: "text-orange-500",
        bgColor: "bg-orange-500",
        badgeBg: "bg-orange-100",
        badgeText: "text-orange-800",
        title: "Master",
      };
    } else if (level <= 40) {
      return {
        borderColor: "border-red-500",
        textColor: "text-red-500",
        bgColor: "bg-red-500",
        badgeBg: "bg-red-100",
        badgeText: "text-red-800",
        title: "Champion",
      };
    } else {
      return {
        borderColor: "border-red-600",
        textColor: "text-red-600",
        bgColor: "bg-gradient-to-r from-yellow-400 via-red-500 to-orange-600",
        badgeBg: "bg-orange-100",
        badgeText: "text-orange-800",
        title: "Legend",
      };
    }
  };

  if (isCurrentUser) {
    userStyling = {
      borderColor: "border-cyan-500",
      textColor: "text-cyan-500",
      bgColor: "bg-cyan-500",
      badgeBg: "bg-cyan-100",
      badgeText: "text-cyan-800",
      title: "You",
    };
  }

  const styling = getLevelStyling(level);

  // Calculate progress to next level
  const pointsPerLevel = 30;
  const currentLevelPoints = point % pointsPerLevel;
  const progressPercentage = (currentLevelPoints / pointsPerLevel) * 100;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-200 hover:bg-gray-750">
      <div
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => toggleExpand(_id)}
      >
        <div className="flex items-center space-x-4">
          <div className="text-center w-8">
            <span
              className={`text-lg font-semibold ${
                rank <= 3 ? styling.textColor : "text-gray-400"
              }`}
            >
              {rank}
            </span>
          </div>

          <div
            className={`relative h-12 w-12 rounded-full overflow-hidden border-2 ${styling.borderColor}`}
          >
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center ${styling.bgColor} bg-opacity-20`}
              >
                <UserCircle2 className={`w-8 h-8 ${styling.textColor}`} />
              </div>
            )}

            <div
              className={`absolute -bottom-1 -right-1 ${styling.badgeBg} ${styling.badgeText} text-xs font-bold px-1 rounded-full`}
            >
              {level}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">{name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-xs ${styling.badgeBg} ${styling.badgeText} px-2 py-0.5 rounded-full`}
              >
                {styling.title}
              </span>
              <span className="text-gray-400 text-xs">{point} points</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:block">
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${styling.bgColor}`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400">
                {currentLevelPoints}/{pointsPerLevel}
              </span>
            </div>
          </div>

          {expanded ? (
            <ChevronUp size={20} className="text-gray-400" />
          ) : (
            <ChevronDown size={20} className="text-gray-400" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-2 bg-gray-750 border-t border-gray-700">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-2">Level Progress</p>
              <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${styling.bgColor}`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">Level {level}</span>
                <span className="text-xs text-gray-400">
                  {currentLevelPoints}/{pointsPerLevel} to Level {level + 1}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-xs text-gray-400">Total Points</p>
                <p className={`text-lg font-bold ${styling.textColor}`}>
                  {point}
                </p>
              </div>

              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-xs text-gray-400">Rank</p>
                <p className={`text-lg font-bold ${styling.textColor}`}>
                  #{rank}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LeaderboardComponent = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Global");
  const [sortField, setSortField] = useState("point"); // Default sort by points
  const [sortDirection, setSortDirection] = useState("desc"); // Default descending (highest first)
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, default to descending for points and ascending for level
      setSortField(field);
      setSortDirection(field === "point" ? "desc" : "asc");
    }
  };

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call your API endpoint
      const response = await fetch(
        "http://localhost:5000/api/progress/getAllUsers"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      // Sort data based on current sort settings
      const sortedData = [...data].sort((a, b) => {
        const valueA = a[sortField];
        const valueB = b[sortField];

        if (sortDirection === "asc") {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      });

      setUsers(sortedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      setError("Failed to load leaderboard data. Please try again later.");
      setLoading(false);
    }
  };

  // Fetch users on component mount and when sort settings change
  useEffect(() => {
    fetchUsers();
  }, [sortField, sortDirection, activeFilter]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
    <HomeNavbar />
    <div className="max-w-3xl mx-auto p-4 md:p-8">
        <LeaderboardHeader />
        <LeaderboardStats topperData={users} />

        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-start md:items-center mb-6">
          {/* <LeaderboardFilter
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          /> */}

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleSort("level")}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortField === "level"
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                Level
                {sortField === "level" &&
                  (sortDirection === "asc" ? (
                    <ArrowUp size={16} className="ml-1" />
                  ) : (
                    <ArrowDown size={16} className="ml-1" />
                  ))}
              </button>

              <button
                onClick={() => toggleSort("point")}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortField === "point"
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                Points
                {sortField === "point" &&
                  (sortDirection === "asc" ? (
                    <ArrowUp size={16} className="ml-1" />
                  ) : (
                    <ArrowDown size={16} className="ml-1" />
                  ))}
              </button>
            </div>
          </div>
        </div>

        <SearchBar />

        {error && (
          <div className="text-center py-6 text-red-400">
            {error}
            <button
              onClick={fetchUsers}
              className="block mx-auto mt-2 text-sm underline text-gray-400 hover:text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 size={32} className="animate-spin text-green-500" />
          </div>
        ) : (
          <>
            <div className="space-y-1">
              {users.map((user, index) => (
                <UserCard
                  key={user._id}
                  user={user}
                  rank={index + 1}
                  expanded={expandedId === user._id}
                  toggleExpand={toggleExpand}
                />
              ))}
            </div>

            {users.length === 0 && !loading && !error && (
              <div className="text-center py-12 text-gray-400">
                No results found
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderboardComponent;
