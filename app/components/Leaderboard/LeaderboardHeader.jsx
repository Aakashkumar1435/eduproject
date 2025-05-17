import { 
  Trophy
} from 'lucide-react';

const LeaderboardHeader = () => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-white flex items-center">
        <Trophy className="mr-2 text-green-500" size={28} />
        Leaderboard
      </h1>
      <p className="text-gray-400 mt-1">
        Compete with players worldwide and climb the ranks
      </p>
    </div>
  );
};

export default LeaderboardHeader;