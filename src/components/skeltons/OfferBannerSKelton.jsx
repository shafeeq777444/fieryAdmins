import React from 'react';

const OfferBannerSkeletonCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-40 bg-gray-300" />

      {/* Content Placeholder */}
      <div className="p-4">
        {/* Title */}
        <div className="h-5 w-2/3 bg-gray-300 rounded mb-3" />

        {/* Description lines */}
        <div className="space-y-2 mb-4">
          <div className="h-3 w-full bg-gray-300 rounded" />
          <div className="h-3 w-5/6 bg-gray-300 rounded" />
        </div>

        {/* Button placeholders */}
        <div className="flex justify-end gap-3">
          <div className="h-8 w-16 bg-gray-300 rounded-md" />
          <div className="h-8 w-16 bg-gray-300 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default OfferBannerSkeletonCard;
