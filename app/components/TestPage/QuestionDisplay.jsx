// components/QuestionDisplay.jsx
export default function QuestionDisplay({ question }) {
    return (
      <div className="mb-6 flex-grow">
        <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
          <h2 className="text-base sm:text-lg font-medium text-gray-800 mb-2">{question.question}</h2>
          
          {/* Tags */}
          {question.subject && (
            <div className="flex flex-wrap gap-1 mb-1">
              <div className="bg-green-100 px-2 py-0.5 rounded text-green-800 text-xs">
                {question.subject || "Quiz"}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }