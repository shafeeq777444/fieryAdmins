import React, { useState } from "react";
import { useUpdateDish } from "../../services/queries/useMenu";

const DishListItem = ({ dish, onEdit, onDelete }) => {
  const vendor = "fieryGrills";
  const { mutate } = useUpdateDish({ vendor, category: dish?.category });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    setShowDeleteModal(false);
    onDelete(dish._id);
  };

  const handleStatusToggle = () => {
    mutate({ id: dish._id, dishData: { isAvailable: !dish?.isAvailable } });
  };

  return (
    <div className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Mobile View */}
      <div className="md:hidden p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-black">{dish.name}</h3>
          <div className="flex space-x-2">
            <button onClick={() => onEdit(dish)} className="p-1 hover:bg-gray-200 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button onClick={() => setShowDeleteModal(true)} className="p-1 hover:bg-gray-200 rounded text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-500 mb-1">
          <span className="font-medium">Category:</span> {dish.category}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Description:</span> {dish.description}
        </div>
        <div className="text-sm flex items-center mt-2">
          <span className="font-medium mr-2">Status:</span>
          <button
            onClick={handleStatusToggle}
            className="relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none"
            aria-pressed={dish.isAvailable}
            aria-label={`Toggle status to ${dish.isAvailable ? "inactive" : "active"}`}
          >
            <span className={`${dish.isAvailable ? "bg-black" : "bg-gray-300"} absolute w-11 h-6 mx-auto rounded-full transition-colors duration-200 ease-in-out`} />
            <span className={`${dish.isAvailable ? "translate-x-6" : "translate-x-1"} absolute left-0 inline-block h-4 w-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out`} />
          </button>
          <span className="ml-2 text-xs text-gray-600">{dish.isAvailable ? "Active" : "Inactive"}</span>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-12 p-4 items-center">
        <div className="col-span-2 font-medium text-black">{dish.name}</div>
        <div className="col-span-2 text-gray-600">{dish.category}</div>
        <div className="col-span-4 text-gray-600 truncate">{dish.description}</div>
        <div className="col-span-2 text-center">
          <div className="flex items-center justify-center">
            <button
              onClick={handleStatusToggle}
              className="relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none"
              aria-pressed={dish.isAvailable}
              aria-label={`Toggle status to ${dish.isAvailable ? "inactive" : "active"}`}
            >
              <span className={`${dish.isAvailable ? "bg-black" : "bg-gray-300"} absolute w-11 h-6 mx-auto rounded-full transition-colors duration-200 ease-in-out`} />
              <span className={`${dish.isAvailable ? "translate-x-6" : "translate-x-1"} absolute left-0 inline-block h-4 w-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out`} />
            </button>
            <span className="ml-2 text-xs text-gray-600">{dish.isAvailable ? "Active" : "Inactive"}</span>
          </div>
        </div>
        <div className="col-span-2 flex justify-end space-x-2">
          <button onClick={() => onEdit(dish)} className="p-1 hover:bg-gray-200 rounded" aria-label="Edit dish">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button onClick={() => setShowDeleteModal(true)} className="p-1 hover:bg-gray-200 rounded text-gray-700" aria-label="Delete dish">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-medium">{dish.name}</span>? This action can't be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 text-gray-700">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 border border-transparent rounded bg-black text-white hover:bg-gray-800">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DishListItem;
