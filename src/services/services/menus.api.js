// services/dishesService.js

import axiosInstance from "../axiosInstance";

// ✅ Create
export const createDish = async ({ vendor,  dishData }) => {
    console.log({ vendor, dishData })
    const response = await axiosInstance.post(`/menus/${vendor}/${dishData.category}/dishes`, dishData);
    return response.data;
};

export const getAllDishes = async ({ vendor, category }) => {
  const response = await axiosInstance.get(`/menus/${vendor}/${category}/dishes`);
  return response.data; // { dishes: [], total: number }
};

// ✅ Update
export const updateDish = async ({ id, dishData }) => {
    console.log(dishData,"--dish")
    const response = await axiosInstance.patch(`/menus/dishes/${id}`, dishData);
    return response.data;
};

// ✅ Delete
export const deleteDish = async ({ id }) => {
    const response = await axiosInstance.delete(`/menus/dishes/${id}`);
    return response.data;
};
