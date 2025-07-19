import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
  prevPage: () => void;
  nextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate,
  prevPage,
  nextPage,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-2">
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex space-x-1 sm:space-x-2">
        {/* Prev Button */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-2 sm:px-3 py-1 border rounded ${
            currentPage === 1
              ? 'border-gray-200 text-gray-400 cursor-not-allowed'
              : 'border-gray-300 hover:bg-gray-100'
          }`}
        >
          Prev
        </button>

        {/* Page Numbers (only show current on mobile) */}
        <div className="flex space-x-1 items-center">
          {currentPage > 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className="hidden sm:inline px-3 py-1 border border-gray-300 hover:bg-gray-100 rounded"
            >
              {currentPage - 1}
            </button>
          )}

          <button className="px-3 py-1 border border-black bg-black text-white rounded">
            {currentPage}
          </button>

          {currentPage < totalPages && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className="hidden sm:inline px-3 py-1 border border-gray-300 hover:bg-gray-100 rounded"
            >
              {currentPage + 1}
            </button>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-2 sm:px-3 py-1 border rounded ${
            currentPage === totalPages
              ? 'border-gray-200 text-gray-400 cursor-not-allowed'
              : 'border-gray-300 hover:bg-gray-100'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
