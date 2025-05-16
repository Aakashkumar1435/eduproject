import React from 'react';
import { Clock, CheckCircle, AlertCircle, Award } from 'lucide-react';

const StatCards = ({ testStats, totalTests, completedTests }) => {
  return (
    <>
      <StatCard 
        title="Total Tests" 
        value={totalTests}
        icon={<Clock className="w-6 h-6 text-blue-400" />}
        bgColor="bg-gray-800"
        accentColor="border-blue-500"
      />
      <StatCard 
        title="Completed" 
        value={completedTests}
        icon={<CheckCircle className="w-6 h-6 text-green-400" />}
        bgColor="bg-gray-800"
        accentColor="border-green-500"
      />
      <StatCard 
        title="Remaining" 
        value={totalTests - completedTests}
        icon={<AlertCircle className="w-6 h-6 text-amber-400" />}
        bgColor="bg-gray-800"
        accentColor="border-amber-500"
      />
      <StatCard 
        title="Avg. Score" 
        value={`${testStats.overallAverage}%`}
        icon={<Award className="w-6 h-6 text-purple-400" />}
        bgColor="bg-gray-800"
        accentColor="border-purple-500"
      />
    </>
  );
};

const StatCard = ({ title, value, icon, bgColor, accentColor }) => {
  return (
    <div className={`${bgColor} border-l-4 ${accentColor} rounded-lg shadow-lg p-4`}>
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="text-lg font-medium text-gray-300">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-white mt-2">{value}</p>
    </div>
  );
};

export default StatCards;