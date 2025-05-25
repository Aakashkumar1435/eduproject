// components/FinishConfirmationModal.jsx
import { CheckCircle } from 'lucide-react';

export default function FinishConfirmationModal({ 
  answeredCount,
  totalQuestions,
  cancelFinish,
  confirmFinish
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-4">
        <div className="flex items-center mb-3">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="font-medium">Finish Test?</h3>
        </div>
        
        <p className="text-gray-600 mb-2 text-sm">
          You have answered {answeredCount} out of {totalQuestions} questions.
        </p>
        
        {answeredCount < totalQuestions && (
          <p className="text-yellow-600 mb-4 text-sm">
            There are {totalQuestions - answeredCount} unanswered questions.
          </p>
        )}
        
        <div className="flex justify-end space-x-3">
          <button 
            className="px-3 py-1.5 border border-gray-300 rounded text-gray-700 text-sm hover:bg-gray-50"
            onClick={cancelFinish}
          >
            Cancel
          </button>
          <button 
            className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700"
            onClick={confirmFinish}
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
}