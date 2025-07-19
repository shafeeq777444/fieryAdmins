import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchQuery, 
  onSearchChange, 
  onClearSearch 
}) => {
  return (
    <div className="mb-6 ">
      <div className="relative">
        <input
          type="text"
          placeholder="Search dishes by name or description..."
          value={searchQuery}
          onChange={onSearchChange}
          className="w-full p-3 border focus:border-[#2d2d2d] border-gray-300 pr-10 rounded-xl text-xs leading-tight outline-none placeholder:text-xs"
        />
        {searchQuery && (
          <button 
            onClick={onClearSearch}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;