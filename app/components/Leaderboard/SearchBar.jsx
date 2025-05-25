import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5"
        placeholder="Search players..."
      />
    </div>
  );
};

export default SearchBar;