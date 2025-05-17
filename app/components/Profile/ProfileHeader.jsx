import React from "react";
import { User, Edit3 } from "lucide-react";

const ProfileHeader = ({ userData, onEditClick }) => {
  const { name, email, points, level, avatar } = userData;

  // Calculate progress towards next level
  const pointsPerLevel = 30;
  const currentLevelPoints = points % pointsPerLevel;
  const progressPercentage = (currentLevelPoints / pointsPerLevel) * 100;

  // Get styling based on level range
  const getLevelStyling = (level) => {
    if (level <= 5) {
      return {
        borderColor: "border-green-500",
        textColor: "text-green-500",
        bgColor: "bg-green-500",
        iconColor: "text-green-500",
        badgeBg: "bg-green-100",
        badgeText: "text-green-800",
        title: "Beginner",
      };
    } else if (level <= 10) {
      return {
        borderColor: "border-blue-500",
        textColor: "text-blue-500",
        bgColor: "bg-blue-500",
        iconColor: "text-blue-500",
        badgeBg: "bg-blue-100",
        badgeText: "text-blue-800",
        title: "Intermediate",
      };
    } else if (level <= 15) {
      return {
        borderColor: "border-purple-500",
        textColor: "text-purple-500",
        bgColor: "bg-purple-500",
        iconColor: "text-purple-500",
        badgeBg: "bg-purple-100",
        badgeText: "text-purple-800",
        title: "Advanced",
      };
    } else if (level <= 20) {
      return {
        borderColor: "border-yellow-500",
        textColor: "text-yellow-500",
        bgColor: "bg-yellow-500",
        iconColor: "text-yellow-500",
        badgeBg: "bg-yellow-100",
        badgeText: "text-yellow-800",
        title: "Expert",
      };
    } else if (level <= 30) {
      return {
        borderColor: "border-orange-500",
        textColor: "text-orange-500",
        bgColor: "bg-orange-500",
        iconColor: "text-orange-500",
        badgeBg: "bg-orange-100",
        badgeText: "text-orange-800",
        title: "Master",
      };
    } else if (level <= 40) {
      return {
        borderColor: "border-red-500",
        textColor: "text-red-500",
        bgColor: "bg-red-500",
        iconColor: "text-red-500",
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

  const styling = getLevelStyling(level);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <div
            className={`w-28 h-28 rounded-full overflow-hidden border-4 ${styling.borderColor} flex items-center justify-center bg-gray-700`}
          >
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className={`w-16 h-16 ${styling.iconColor}`} />
            )}
          </div>
          <div
            className={`absolute -top-2 -right-2 ${styling.badgeBg} ${styling.badgeText} text-xs font-bold px-3 py-1 rounded-full`}
          >
            {styling.title}
          </div>
          <button
            onClick={onEditClick}
            className={`absolute bottom-0 right-0 ${styling.bgColor} p-2 rounded-full hover:opacity-90 transition-colors`}
            aria-label="Edit profile picture"
          >
            <Edit3 className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="flex-grow text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{name}</h1>
          <p className="text-gray-400 mt-1">{email}</p>

          <div className="mt-6 bg-gray-700 rounded-lg p-4 w-full">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className={`text-xl font-bold ${styling.textColor}`}>
                  Level {level}
                </span>
                <span
                  className={`${styling.badgeBg} ${styling.badgeText} text-xs px-2 py-1 rounded-full`}
                >
                  {styling.title}
                </span>
              </div>
              <span className="text-gray-400 text-sm">
                {currentLevelPoints}/{pointsPerLevel} points to next level
              </span>
            </div>

            <div className="relative w-full h-4 bg-gray-600 rounded-full overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full ${styling.bgColor} rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-full ${styling.bgColor} bg-opacity-20`}
                >
                  <svg
                    className={`w-5 h-5 ${styling.textColor}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Points</p>
                  <p className={`font-bold ${styling.textColor}`}>{points}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-full ${styling.bgColor} bg-opacity-20`}
                >
                  <svg
                    className={`w-5 h-5 ${styling.textColor}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Next Goal</p>
                  <p className={`font-bold ${styling.textColor}`}>
                    Level {level + 1}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
