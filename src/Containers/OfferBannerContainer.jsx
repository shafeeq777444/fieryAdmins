import React, { useState } from 'react';
import {
  useGetAllOfferBanner,
  useCreateOfferBanner,
  useUpdateOfferBanner,
  useDeleteOfferBanner,
} from '../services/queries/useOfferBanner';
import OfferBannerFormModal from '../components/offerBanner/OfferBannerFormModal';
import OfferBannerList from '../components/offerBanner/OfferBannerList';
import OfferBannerSkeletonCard from '../components/skeltons/OfferBannerSKelton';
import Loading from '../components/common/Loading';




const OfferBannerContainer = ({ vendorId = "FG" }) => {
  const { data, isLoading, isError } = useGetAllOfferBanner(vendorId);
  const createMutation = useCreateOfferBanner();
  const updateMutation = useUpdateOfferBanner();
  const deleteMutation = useDeleteOfferBanner();

  const [editingBanner, setEditingBanner] = useState(null); // for update
  const [isModalOpen, setIsModalOpen] = useState(false);    // for form modal
  const [isUpdationLoading, setIsUpdationLoading] = useState(false);

  const handleCreateOrUpdate = (formData) => {
    if (editingBanner) {
      setIsUpdationLoading(true);
      updateMutation.mutate({
        id: editingBanner._id,
        updateData: formData,
      },{
        onSuccess: () => {
          setIsUpdationLoading(false);
        }
      });
    } else {
      createMutation.mutate({
        vendor: vendorId,
        newData: formData,
      },{
        onSuccess: () => {
          setIsUpdationLoading(false);
        },
        onError: () => {
          setIsUpdationLoading(false);
        }
      });
    }
    setIsModalOpen(false);
    setEditingBanner(null);
  };

  const handleDelete = (id) => {
    setIsUpdationLoading(true);
      deleteMutation.mutate({ id },{
        onSuccess: () => {
          setIsUpdationLoading(false);
        },
        onError: () => {
          setIsUpdationLoading(false);
        }
      }); 
  };
if(isLoading){
  return (<>{Array.from({ length: 6 }).map((_, i) => <OfferBannerSkeletonCard key={i} />)}</>);
}
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Offer Banners</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          + Add Banner
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load banners.</p>
      ) : (
        <OfferBannerList
          banners={data}
          onEdit={(banner) => {
            setEditingBanner(banner);
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {isModalOpen && (
        <OfferBannerFormModal
          initialData={editingBanner}
          onClose={() => {
            setIsModalOpen(false);
            setEditingBanner(null);
          }}
          onSubmit={handleCreateOrUpdate}
        />
      )}
      {isUpdationLoading && <Loading/>}
    </div>
  );
};

export default OfferBannerContainer;
