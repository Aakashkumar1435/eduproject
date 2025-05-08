// components/ExitConfirmationModal.jsx
import { AlertCircle } from 'lucide-react';

export default function ExitConfirmationModal({ cancelExit, confirmExit }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-4">
        <div className="flex items-center mb-3">
          <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
          <h3 className="font-medium">Exit Test?</h3>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm">
          Your progress will not be saved and you'll have to start over again.
        </p>
        
        <div className="flex justify-end space-x-3">
          <button 
            className="px-3 py-1.5 border border-gray-300 rounded text-gray-700 text-sm hover:bg-gray-50"
            onClick={cancelExit}
          >
            Cancel
          </button>
          <button 
            className="px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700"
            onClick={confirmExit}
          >
            Exit Test
          </button>
        </div>
      </div>
    </div>
  );
}