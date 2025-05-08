// components/QuizHeader.jsx
import { ArrowLeft, Clock } from 'lucide-react';


export default function QuizHeader({ testName, timeRemaining, timeSpent, handleExit, formatTime }) {
  return (
    <div className="bg-green-600 text-white py-2 px-4 flex justify-between items-center shadow-md">
      <button 
        className="flex items-center hover:bg-green-700 p-1.5 rounded"
        onClick={handleExit}
      >
        <ArrowLeft size={16} className="mr-1" />
        <span>Exit</span>
      </button>
      
      <div className="font-medium text-sm md:text-base">{testName || "Test"}</div>
      
      <div className="flex items-center bg-green-700 px-2 py-1 rounded-md text-sm">
        <Clock size={16} className="mr-1" />
        <span>{timeRemaining ? formatTime(timeRemaining) : formatTime(timeSpent)}</span>
      </div>
    </div>
  );
}
