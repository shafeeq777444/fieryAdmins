import React from 'react';
import OfferBannerCard from './OfferBannerCard';


const OfferBannerList = ({ banners, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {banners.map((banner) => (
        <OfferBannerCard
          key={banner._id}
          banner={banner}
          onEdit={() => onEdit(banner)}
          onDelete={() => onDelete(banner._id)}
        />
      ))}
    </div>
  );
};

export default OfferBannerList;
