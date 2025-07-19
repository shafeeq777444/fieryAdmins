import React from 'react';
import DishListItem from './DishListItem';

const DishList = ({
  dishes,
  searchQuery,
  onEdit,
  onDelete,
  itemsPerPage,
  onItemsPerPageChange,
  totalDishes,
  currentPage,
  indexOfFirstItem,
  indexOfLastItem
}) => {
  const handleStatusChange = (id, status) => {
    console.log(`Status changed for dish ${id} to ${status ? 'active' : 'inactive'}`);
    // This should typically be lifted and handled in the parent component
  };

  return (
    <div className="w-full">
      {/* Results Stats and Items Per Page */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-2 md:space-y-0">
        <div className="text-sm text-gray-600">
          {searchQuery && (
            <span>
              Found {totalDishes} {totalDishes === 1 ? 'dish' : 'dishes'} matching "{searchQuery}"
            </span>
          )}
          {!searchQuery && totalDishes > 0 && (
            <span>
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalDishes)} of {totalDishes} dishes
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Items per page:</span>
          <select
            value={itemsPerPage}
            onChange={onItemsPerPageChange}
            className="border border-gray-300 p-1 bg-white text-black"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Dishes List */}
      <div className="border border-gray-200 rounded">
        {/* Header row - hidden on mobile */}
        <div className="hidden md:grid grid-cols-12 font-bold p-4 border-b border-gray-200 bg-gray-50">
          <div className="col-span-2">Name</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-4">Description</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="max-h-[40vh] overflow-auto">
          {dishes.length > 0 ? (
            dishes.map((dish) => (
              <DishListItem
                key={dish.id}
                dish={dish}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              {searchQuery
                ? `No dishes found matching "${searchQuery}"`
                : "No dishes found in this category"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishList;
