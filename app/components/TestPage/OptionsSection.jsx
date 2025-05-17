// components/OptionsSection.jsx
import { CheckCircle, X } from 'lucide-react';

export default function OptionsSection({ 
  currentQuestion, 
  currentQuestionIndex, 
  selectedAnswers, 
  answerFeedback, 
  handleAnswerSelect,
  correctAnswers
}) {
  // Determine if this question has been answered
  const isAnswered = selectedAnswers[currentQuestionIndex] !== undefined;
  // Get the correct answer for this question
  const correctAnswerIndex = currentQuestion.correctAnswer;
  // Get user's selected answer for this question
  const selectedAnswerIndex = selectedAnswers[currentQuestionIndex];
  // Determine if user's answer was correct
  const isCorrect = selectedAnswerIndex === correctAnswerIndex;

  return (
    <div className="space-y-3 mb-6">
      {currentQuestion.options.map((option, index) => {
        // Determine if this option is selected by the user
        const isSelected = selectedAnswerIndex === index;
        // Determine if this option is the correct answer
        const isCorrectOption = index === correctAnswerIndex;
        // Determine if this is a wrong selection
        const isWrongSelection = isSelected && !isCorrect;
        
        let optionStyles = "border rounded-md p-3 flex items-center transition-colors";
        
        // Not answered yet - show clickable state
        if (!isAnswered) {
          optionStyles += " cursor-pointer hover:border-green-500 hover:bg-gray-700 border-gray-600";
        } 
        // Question answered
        else {
          // This option is selected by user
          if (isSelected) {
            // If correct selection
            if (isCorrect) {
              optionStyles += " border-green-500 bg-green-900 bg-opacity-30";
            } 
            // If wrong selection
            else {
              optionStyles += " border-red-500 bg-red-900 bg-opacity-30";
            }
          }
          // This option is the correct answer (but wasn't selected)
          else if (isCorrectOption) {
            optionStyles += " border-green-500 bg-green-900 bg-opacity-30";
          }
          // Neither selected nor correct
          else {
            optionStyles += " border-gray-600 opacity-70";
          }
        }
        
        return (
          <div 
            key={index}
            className={optionStyles}
            onClick={() => !isAnswered && handleAnswerSelect(index)}
          >
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
              // Not answered yet
              !isAnswered
                ? 'border-gray-500'
                // This is the selected option
                : isSelected
                  // Correct selection
                  ? isCorrect 
                    ? 'border-green-500 bg-green-500'
                    // Wrong selection 
                    : 'border-red-500 bg-red-500'
                  // This is the correct option but wasn't selected
                  : isCorrectOption
                    ? 'border-green-500 bg-green-500'
                    // Neither selected nor correct
                    : 'border-gray-500'
            }`}>
              {/* Show checkmark for user's correct selection */}
              {isSelected && isCorrect && (
                <CheckCircle size={12} className="text-gray-900" />
              )}
              {/* Show X for user's wrong selection */}
              {isSelected && !isCorrect && (
                <X size={12} className="text-gray-900" />
              )}
              {/* Show checkmark for correct answer that wasn't selected */}
              {!isSelected && isCorrectOption && isAnswered && (
                <CheckCircle size={12} className="text-gray-900" />
              )}
            </div>
            <span className="text-gray-200">{option}</span>
            
            {/* Feedback indicators on the right side */}
            {isAnswered && (
              <>
                {isSelected && isCorrect && (
                  <div className="ml-auto text-green-400 flex items-center">
                    <CheckCircle size={16} className="mr-1" />
                    <span className="text-xs">Correct</span>
                  </div>
                )}
                {isSelected && !isCorrect && (
                  <div className="ml-auto text-red-400 flex items-center">
                    <X size={16} className="mr-1" />
                    <span className="text-xs">Incorrect</span>
                  </div>
                )}
                {!isSelected && isCorrectOption && (
                  <div className="ml-auto text-green-400 flex items-center">
                    <CheckCircle size={16} className="mr-1" />
                    <span className="text-xs">Correct Answer</span>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}