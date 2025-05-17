import React from 'react';
import { BarChart, TrendingUp, TrendingDown } from 'lucide-react';

const SubjectPerformance = ({ testStats, className = "" }) => {
  // Helper function to get color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-blue-500";
    if (score >= 40) return "text-amber-500";
    return "text-red-500";
  };

  const getProgressBarColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className={`bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <BarChart className="w-5 h-5 mr-2 text-green-500" />
          Subject Performance
        </h2>
      </div>

      {testStats.subjectPerformance && testStats.subjectPerformance.length > 0 ? (
        <div className="space-y-4">
          {testStats.subjectPerformance.map((subject, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">{subject.name}</span>
                <span className={`font-medium ${getScoreColor(subject.score)}`}>
                  {subject.score}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className={`${getProgressBarColor(subject.score)} h-2.5 rounded-full`}
                  style={{ width: `${subject.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-4">No subject data available</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Strong Subjects */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
            <h3 className="text-lg font-medium text-white">Strong Subjects</h3>
          </div>
          {testStats.strongSubjects && testStats.strongSubjects.length > 0 ? (
            <ul className="space-y-2">
              {testStats.strongSubjects.map((subject, index) => (
                <li key={index} className="text-gray-300 flex justify-between">
                  <span>{subject.name}</span>
                  <span className="text-green-500">{subject.score}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm">No data available</p>
          )}
        </div>

        {/* Weak Subjects */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <TrendingDown className="w-5 h-5 text-red-500 mr-2" />
            <h3 className="text-lg font-medium text-white">Needs Improvement</h3>
          </div>
          {testStats.weakSubjects && testStats.weakSubjects.length > 0 ? (
            <ul className="space-y-2">
              {testStats.weakSubjects.map((subject, index) => (
                <li key={index} className="text-gray-300 flex justify-between">
                  <span>{subject.name}</span>
                  <span className="text-red-500">{subject.score}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectPerformance;