import UserRankBadge from './UserRankBadge';

import {
  ChevronUp, 
  ChevronDown, 
  ArrowUpRight,
} from 'lucide-react';

const UserCard = ({ user, expanded, toggleExpand }) => {
  return (
    <div className="relative mb-3">
      <div 
        className={`bg-gray-800 rounded-lg p-4 border border-gray-700 transition-all duration-300 ${
          expanded ? "ring-2 ring-green-500 shadow-lg shadow-green-900/20" : "hover:border-green-500"
        }`}
      >
        {/* Main Card */}
        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleExpand(user.id)}>
          <div className="flex items-center space-x-4">
            <UserRankBadge rank={user.rank} />
            
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="rounded-full w-10 h-10 border-2 border-gray-700" 
              />
            </div>
            
            <div>
              <h3 className="font-bold text-white">{user.name}</h3>
              <p className="text-sm text-gray-400">@{user.username}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-green-400 font-bold text-lg">{user.score.toLocaleString()}</p>
              <p className="text-xs text-gray-400">SCORE</p>
            </div>
            
            <div className="text-gray-400">
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
        </div>
        
        {/* Expanded Card */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-2 bg-gray-700 rounded">
              <p className="text-sm text-gray-400">LEVEL</p>
              <p className="text-green-300 font-bold">{user.level}</p>
            </div>
            <div className="text-center p-2 bg-gray-700 rounded">
              <p className="text-sm text-gray-400">WIN RATE</p>
              <p className="text-green-300 font-bold">{user.winRate}</p>
            </div>
            <div className="text-center p-2 bg-gray-700 rounded">
              <p className="text-sm text-gray-400">GAMES</p>
              <p className="text-green-300 font-bold">{user.gamesPlayed}</p>
            </div>
            <div className="text-center p-2 bg-gray-700 rounded">
              <p className="text-sm text-gray-400">ACTIVITY</p>
              <p className="text-green-300 font-bold text-xs">{user.recentActivity}</p>
            </div>
            <div className="col-span-2 md:col-span-4 mt-2">
              <button className="w-full py-2 bg-green-600 hover:bg-green-700 transition-colors rounded-md text-white font-medium flex items-center justify-center space-x-2">
                <span>View Profile</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Highlight for top 3 */}
      {user.rank <= 3 && (
        <div className={`absolute -top-1 -bottom-1 -left-1 -right-1 rounded-lg -z-10 ${
          user.rank === 1 ? "bg-gradient-to-b from-yellow-500/30 to-transparent" :
          user.rank === 2 ? "bg-gradient-to-b from-gray-400/30 to-transparent" :
          "bg-gradient-to-b from-amber-700/30 to-transparent"
        }`}></div>
      )}
    </div>
  );
};

export default UserCard;