import React from 'react';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Veg', value: 'vegetarian' },
  { label: 'Non-Veg', value: 'non-vegetarian' },
  { label: 'Salads', value: 'salad' },
];

const FilterBar = ({ activeCategory, onCategoryChange, onAddClick }) => {
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      <div className="flex flex-wrap gap-2">
        {categories.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onCategoryChange(value)}
            className={`px-3 py-1 rounded border text-sm transition whitespace-nowrap ${
              activeCategory === value
                ? 'bg-black text-white border-black'
                : 'border-gray-300 text-gray-600 hover:border-gray-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        onClick={onAddClick}
        className="px-3 py-1 text-sm rounded bg-black text-white hover:bg-gray-800 transition self-start sm:self-auto"
      >
        + Add Dish
      </button>
    </div>
  );
};

export default FilterBar;
