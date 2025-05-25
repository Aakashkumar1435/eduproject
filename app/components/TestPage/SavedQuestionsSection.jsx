// components/SavedQuestionsSection.jsx
import { Bookmark } from 'lucide-react';
import React from 'react';

export default function SavedQuestionsSection({ savedQuestions, goToSavedQuestion, mcqs }) {
  if (savedQuestions.length === 0) return null;
  
  return (
    <div className="mb-4 p-4 bg-green-50 rounded-md border border-green-200 shadow-sm">
      <h3 className="text-sm font-medium text-green-800 mb-3 flex items-center">
        <Bookmark size={16} className="mr-2" />
        Saved Questions
      </h3>
      <div className="flex flex-wrap gap-2">
        {savedQuestions.map((id, i) => {
          const index = mcqs.findIndex(q => (q._id || q.id) === id);
          return (
            <React.Fragment key={id || i}>
              <button
                onClick={() => goToSavedQuestion(id)}
                className="text-xs py-1.5 px-3 bg-white rounded-full border border-green-300 hover:bg-green-100 hover:border-green-400 transition-colors flex items-center justify-center shadow-sm"
              >
                <span className="font-medium text-green-700">Q{index + 1}</span>
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}