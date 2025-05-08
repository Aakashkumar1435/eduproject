// components/TopControls.jsx
import { Bookmark } from 'lucide-react';

export default function TopControls({ 
  currentQuestionIndex, 
  totalQuestions,
  savedQuestions,
  isQuestionSaved,
  toggleSaveQuestion,
  setShowSavedSection
}) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center text-xs sm:text-sm text-gray-600">
        <span className="bg-green-600 text-white w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full font-medium mr-1">
          {currentQuestionIndex + 1}
        </span>
        <span>of {totalQuestions}</span>
      </div>
      
      <div className="flex space-x-2">
        <button 
          onClick={() => setShowSavedSection(prev => !prev)}
          className={`p-1.5 rounded border flex items-center text-xs sm:text-sm ${
            savedQuestions.length > 0
              ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
              : 'border-gray-200 text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Bookmark size={14} className={`mr-1 ${savedQuestions.length > 0 ? 'fill-green-200' : ''}`} />
          <span>Saved ({savedQuestions.length})</span>
        </button>
        
        <button 
          onClick={toggleSaveQuestion}
          className={`p-1.5 rounded border flex items-center text-xs sm:text-sm transition-colors ${
            isQuestionSaved 
              ? 'bg-green-100 text-green-700 border-green-300' 
              : 'border-gray-200 text-gray-600 hover:bg-green-50'
          }`}
        >
          <Bookmark 
            size={14} 
            className={`mr-1 ${isQuestionSaved ? 'fill-green-700' : ''}`} 
          />
          <span>{isQuestionSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </div>
  );
}