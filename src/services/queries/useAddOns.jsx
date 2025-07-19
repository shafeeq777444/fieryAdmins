// hooks/useAddOns.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAddOn,
  getAllAddOns,
  updateAddOn,
  deleteAddOn,
} from "../services/addOns.api";
import toast from "react-hot-toast";

// 🟡 Get all add-ons for a vendor
export const useGetAddOns = (vendor) => {
  return useQuery({
    queryKey: ["addOns", vendor],
    queryFn: () => getAllAddOns(vendor),
    enabled: !!vendor,
  });
};

// 🟢 Create add-on
export const useCreateAddOn = (vendor) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (addOnData) => createAddOn({ vendor, addOnData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addOns", vendor] });
      toast.success("created successfully");
    },
    onError: (error) => {
      console.error("Error creating add-on:", error);
    },
  });
};

// 🔵 Update add-on
export const useUpdateAddOn = (vendor) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, addOnData }) => updateAddOn({ vendor, id, addOnData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addOns", vendor] });
      toast.success("updated successfully");
    },
    onError: (error) => {
      console.error("Error updating add-on:", error);

      // ✅ Extract the real message from Cloudinary/backend
      const message =
        error?.response?.data?.message || // Cloudinary or custom backend
        error?.response?.data?.error ||   // some APIs use 'error' key
        error?.message ||                 // fallback to Axios message
        "Something went wrong";
        const messageParts = message.split(".");
        const notification = messageParts.slice(0, 2).join(".") + ".";
        toast.error(notification.trim());
    },
  });
};

// 🔴 Delete add-on
export const useDeleteAddOn = (vendor) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) => deleteAddOn({ vendor, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addOns", vendor] });
      toast.success("Deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting add-on:", error);
      toast.error(error?.message);
    },
  });
};
