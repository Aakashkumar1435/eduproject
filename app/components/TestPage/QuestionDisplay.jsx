export default function QuestionDisplay({ question }) {
  return (
    <div className="mb-6 flex-grow">
      <div className="p-6 border border-gray-700 rounded-lg bg-gray-800 shadow-md">
        <h2 className="text-base sm:text-lg font-medium text-white mb-3">{question.question}</h2>
        
        {/* Tags */}
        {question.subject && (
          <div className="flex flex-wrap gap-2 mb-1">
            <div className="bg-green-900 px-3 py-1 rounded-md text-green-300 text-xs font-medium">
              {question.subject || "Quiz"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}