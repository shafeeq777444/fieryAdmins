import React from "react";

const DeleteConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Confirm Deletion</h3>
        <p className="mb-6 text-gray-600">Are you sure you want to delete this add-on?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
