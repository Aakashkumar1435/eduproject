import { Trophy, Medal } from "lucide-react";

const UserRankBadge = ({ rank }) => {
  if (rank === 1) {
    return (
      <div className="flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full">
        <Trophy size={18} className="text-gray-800" />
      </div>
    );
  } else if (rank === 2) {
    return (
      <div className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full">
        <Medal size={18} className="text-gray-800" />
      </div>
    );
  } else if (rank === 3) {
    return (
      <div className="flex items-center justify-center w-8 h-8 bg-amber-600 rounded-full">
        <Medal size={18} className="text-gray-800" />
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full">
        <span className="text-sm font-bold text-gray-200">{rank}</span>
      </div>
    );
  }
};

export default UserRankBadge;