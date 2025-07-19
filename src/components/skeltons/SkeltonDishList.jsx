import React from "react";

const DishListSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-3">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-pulse flex flex-col md:grid md:grid-cols-12 p-4 gap-4 border-b">
          <div className="h-4 bg-gray-300 rounded col-span-2 w-3/4" />
          <div className="h-4 bg-gray-300 rounded col-span-2 w-3/4" />
          <div className="h-4 bg-gray-300 rounded col-span-4 w-full" />
          <div className="h-4 bg-gray-300 rounded col-span-2 w-1/2" />
          <div className="h-4 bg-gray-300 rounded col-span-2 w-1/2" />
        </div>
      ))}
    </div>
  );
};

export default DishListSkeleton;
