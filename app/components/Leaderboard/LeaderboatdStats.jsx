import { 
  Trophy, 
  UserCircle2, 
  Sparkles
} from 'lucide-react';

const LeaderboardStats = ({ topperData }) => {
  console.log(topperData);
  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Trophy size={24} className="text-yellow-500" />
          </div>
          <p className="text-xs text-gray-400">TOP PLAYER</p>
          <p className="font-bold text-white">{topperData?.[0]?.name}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Sparkles size={24} className="text-green-400" />
          </div>
          <p className="text-xs text-gray-400">HIGHEST SCORE</p>
          <p className="font-bold text-white">{topperData?.[0]?.point || "100"}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <UserCircle2 size={24} className="text-blue-400" />
          </div>
          <p className="text-xs text-gray-400">TOTAL PLAYERS</p>
          <p className="font-bold text-white">{topperData.length || "12000"}</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardStats;