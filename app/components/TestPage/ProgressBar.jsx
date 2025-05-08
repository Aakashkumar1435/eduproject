// components/ProgressBar.jsx
export default function ProgressBar({ progressPercentage }) {
    return (
      <div className="h-1 w-full bg-gray-200">
        <div 
          className="h-full bg-green-600 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    );
  }