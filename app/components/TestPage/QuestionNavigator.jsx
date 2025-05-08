// components/QuestionNavigator.jsx
import { Layout } from 'lucide-react';

export default function QuestionNavigator({ 
  mcqs, 
  currentQuestionIndex, 
  selectedAnswers, 
  savedQuestions, 
  correctAnswers, 
  goToQuestion, 
  progressPercentage 
}) {
  return (
    <div className="mt-6 pt-4 border-t">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xs font-medium text-gray-700 flex items-center">
          <Layout size={14} className="mr-1" />
          Question Navigator
        </h3>
        <div className="text-xs text-gray-500">{progressPercentage}% Complete</div>
      </div>
      
      <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-20 gap-1">
        {mcqs.map((_, index) => {
          const isAnswered = selectedAnswers[index] !== undefined;
          const isSaved = savedQuestions.includes(mcqs[index]._id || mcqs[index].id);
          const isCorrect = correctAnswers[index] === true;
          const isIncorrect = correctAnswers[index] === false;
          
          let buttonStyles = "w-full h-6 flex items-center justify-center rounded text-xs font-medium";
          
          if (currentQuestionIndex === index) {
            buttonStyles += " bg-green-600 text-white";
          } else if (isIncorrect) {
            buttonStyles += " bg-red-100 text-red-800";
          } else if (isCorrect) {
            buttonStyles += " bg-green-100 text-green-800";
          } else if (isAnswered) {
            buttonStyles += " bg-blue-100 text-blue-800";
          } else if (isSaved) {
            buttonStyles += " bg-yellow-100 text-yellow-800 border border-yellow-300";
          } else {
            buttonStyles += " bg-gray-100 text-gray-700 hover:bg-green-50";
          }
          
          return (
            <button
              key={index}
              onClick={() => goToQuestion(index)}
              className={buttonStyles}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-gray-600">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-600 rounded mr-1"></div>
          <span>Current</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-100 rounded mr-1"></div>
          <span>Answered</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-100 rounded mr-1"></div>
          <span>Correct</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-100 rounded mr-1"></div>
          <span>Incorrect</span>
        </div>
        {/* <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded mr-1"></div>
          <span>Saved</span>
        </div> */}
      </div>
    </div>
  );
}