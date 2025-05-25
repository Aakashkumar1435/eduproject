import { ArrowLeft, Clock } from 'lucide-react';

export default function QuizHeader({ testName, timeRemaining, timeSpent, handleExit, formatTime }) {
  return (
    <div className="w-full bg-gray-900 text-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left section with exit button */}
      <button 
        onClick={handleExit}
        className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="font-medium">Exit</span>
      </button>
      
      {/* Center section with test name */}
      <div className="text-xl font-bold text-center text-green-400">
        {testName || "Test"}
      </div>
      
      {/* Right section with timer */}
      <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg text-green-300">
        <Clock size={18} />
        <span className="font-mono text-lg">
          {timeRemaining ? formatTime(timeRemaining) : formatTime(timeSpent)}
        </span>
      </div>
    </div>
  );
}