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

  // Parse description string: "/*main /-point1 /-point2"
  const parseDescription = (desc) => {
    if (!desc) return { main: '', points: [] };

    const clean = desc.startsWith('/*') ? desc.slice(2).trim() : desc;
    const parts = clean.split('/-');

    return {
      main: parts[0]?.trim() || '',
      points: parts.slice(1).map((p) => p.trim()).filter((p) => p.length > 0),
    };
  };

  const { main, points } = parseDescription(banner.description);

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleConfirmDelete = () => {
    onDelete();
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 max-w-xs">
        {/* Banner Image */}
        <div className="w-full aspect-[4/5] overflow-hidden">
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card Content */}
        <div className="p-3">
          <h3 className="font-medium text-gray-900 mb-1.5 text-sm">{banner.title}</h3>

          {/* Main description */}
          {main && <p className="text-xs text-gray-700 mb-1.5">{main}</p>}

          {/* Points */}
          {points.length > 0 && (
            <ul className="space-y-0.5 mb-3">
              {points.map((point, idx) => (
                <li key={idx} className="flex items-start text-xs text-gray-600">
                  <span className="text-blue-500 text-xs mt-0.5 mr-1.5 flex-shrink-0">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Action buttons */}
          <div className="flex justify-end gap-2">
            <button
              onClick={onEdit}
              className="px-2 py-1 text-xs font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-150"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="px-2 py-1 text-xs font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-150"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <h2 className="text-lg font-semibold mb-4 text-red-600">Delete Banner</h2>
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete "{banner.title}"? This action cannot be undone.
        </p>
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
