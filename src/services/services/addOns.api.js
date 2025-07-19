// services/addOns.api.js
import axiosInstance from "../axiosInstance";

// 🟢 Create
export const createAddOn = async ({ vendor, addOnData }) => {
  const response = await axiosInstance.post(`/plans/${vendor}/addOns`, addOnData);
  return response.data;
};

// 🟡 Read all
export const getAllAddOns = async (vendor) => {
  const response = await axiosInstance.get(`/plans/${vendor}/addOns`);
  return response.data;
};

// 🔵 Update
export const updateAddOn = async ({ vendor, id, addOnData }) => {
  const response = await axiosInstance.patch(`/plans/${vendor}/addOns/${id}`, addOnData);
  console.log(response)
  return response.data;
};

// 🔴 Delete
export const deleteAddOn = async ({ vendor, id }) => {
  const response = await axiosInstance.delete(`/plans/${vendor}/addOns/${id}`);
  return response.data;
};
