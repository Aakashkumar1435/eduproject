// components/NavigationButtons.jsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function NavigationButtons({
  isFirstQuestion,
  isLastQuestion,
  goToPreviousQuestion,
  goToNextQuestion,
  handleFinishClick,
  answeredCount,
  totalQuestions,
  submitting
}) {
  return (
    <div className="flex justify-between items-center mt-auto">
      <button 
        className={`px-3 py-1.5 rounded flex items-center ${
          isFirstQuestion 
            ? 'text-gray-500 bg-gray-800 cursor-not-allowed' 
            : 'bg-gray-700 text-green-400 hover:bg-gray-600 border border-green-700'
        }`}
        onClick={goToPreviousQuestion}
        disabled={isFirstQuestion}
      >
        <ChevronLeft size={16} className="mr-1" />
        <span>Previous</span>
      </button>

      <div className="flex items-center text-xs sm:text-sm">
        <div className="font-medium text-green-400">{answeredCount}</div>
        <span className="mx-1 text-gray-400">of</span>
        <div className="text-gray-300">{totalQuestions}</div>
        <span className="ml-1 text-gray-400">answered</span>
      </div>

      <button 
        className={`px-3 py-1.5 rounded flex items-center ${
          isLastQuestion 
            ? 'bg-green-700 hover:bg-green-600 text-white' 
            : 'bg-green-800 hover:bg-green-700 text-white'
        }`}
        onClick={isLastQuestion ? handleFinishClick : goToNextQuestion}
        disabled={submitting}
      >
        {submitting ? (
          <>
            <span>Submitting</span>
            <div className="ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </>
        ) : (
          <>
            <span>{isLastQuestion ? 'Finish' : 'Next'}</span>
            <ChevronRight size={16} className="ml-1" />
          </>
        )}
      </button>
    </div>
  );
}