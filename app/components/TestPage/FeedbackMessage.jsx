// components/FeedbackMessage.jsx
import { CheckCircle, X } from 'lucide-react';

export default function FeedbackMessage({ answerFeedback }) {
  if (!answerFeedback) return null;
  
  return (
    <div className={`p-3 rounded-md mb-4 text-center ${
      answerFeedback.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {answerFeedback.isCorrect ? (
        <div className="flex items-center justify-center">
          <CheckCircle size={16} className="mr-2" />
          <span>Correct answer! Well done.</span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <X size={16} className="mr-2" />
          <span>Incorrect. The correct answer is option {String.fromCharCode(65 + answerFeedback.correctIndex)}.</span>
        </div>
      )}
    </div>
  );
}