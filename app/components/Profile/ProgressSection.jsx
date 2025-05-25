import React from 'react';
import { TrendingUp } from 'lucide-react';

const ProgressSection = ({ userData, testStats }) => {
  const { point, level } = userData;
  
  // Calculate progress percentage (example logic - adjust as needed)
  const nextLevelPoints = level * 1000; // Assuming each level requires level * 1000 points
  const progressPercent = Math.min(100, (point / nextLevelPoints) * 100);
  const testCompletionPercent = testStats.totalTests > 0 
    ? (testStats.attemptedTests / testStats.totalTests) * 100 
    : 0;

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
          Your Progress
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Level Progress */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">Level Progress</span>
            <span className="text-green-500 font-medium">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-600 to-green-400 h-4 rounded-full" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-400">Level {level}</span>
            <span className="text-gray-400">Level {level + 1}</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            {point} / {nextLevelPoints} points to next level
          </p>
        </div>

        {/* Test Completion */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">Test Completion</span>
            <span className="text-green-500 font-medium">{Math.round(testCompletionPercent)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-600 to-green-400 h-4 rounded-full" 
              style={{ width: `${testCompletionPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-400">0</span>
            <span className="text-gray-400">{testStats.totalTests}</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            {testStats.attemptedTests} of {testStats.totalTests} tests completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;