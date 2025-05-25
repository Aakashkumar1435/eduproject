// LeaderboardFilter component
const LeaderboardFilter = ({ activeFilter, setActiveFilter }) => {
  const filters = ["Global", "Friends", "Weekly", "Monthly"];
  
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
            activeFilter === filter
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default LeaderboardFilter;