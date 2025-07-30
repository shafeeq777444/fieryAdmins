import React, { useState } from 'react';

// Simple Modal component
const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const OfferBannerCard = ({ banner, onEdit, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <img src={banner.image} alt={banner.title} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2">{banner.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">{banner.description}</p>

          <div className="flex justify-end gap-3">
            <button 
              onClick={onEdit} 
              className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-150"
            >
              Edit
            </button>
            <button 
              onClick={handleDeleteClick} 
              className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-150"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <h2 className="text-lg font-semibold mb-4 text-red-600">Delete Banner</h2>
        <p className="mb-6 text-gray-600">Are you sure you want to delete "{banner.title}"? This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
            onClick={handleConfirmDelete}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
};

export default OfferBannerCard;