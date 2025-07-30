import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createOfferBanner, deleteOfferBanner, getAllOfferBanner, updateOfferBanner } from '../services/offerBanner.api';

// create
export const useCreateOfferBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ vendor, newData }) => createOfferBanner({ vendor, newData }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['offerBanners'] });
    },
  });
};

// get ✅
export const useGetAllOfferBanner = (vendor) => {
  return useQuery({
    queryKey: ['offerBanners', vendor],
    queryFn: () => getAllOfferBanner({ vendor }),
    enabled: !!vendor, // only run if vendor is truthy
    
  });
};

// update
export const useUpdateOfferBanner = () => {
const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, updateData }) => updateOfferBanner({ id, updateData }),
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['offerBanners'] });
      },
    });
  };

// delete
export const useDeleteOfferBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) => deleteOfferBanner({ id }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['offerBanners'] });
    },
  });
};