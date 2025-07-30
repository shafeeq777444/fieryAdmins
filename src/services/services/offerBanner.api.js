import axiosInstance from "../axiosInstance";
// ✅ create
export const createOfferBanner = async ({ vendor, newData }) => {
    console.log({ vendor, newData });
    const response = await axiosInstance.post(`/offerBanner/create/${vendor}`, newData);
    console.log(response.data);
    return response.data;
};
// ✅ get
export const getAllOfferBanner = async ({ vendor }) => {
    const response = await axiosInstance.get(`/offerBanner/get/${vendor}`);
    return response.data; 
};

// ✅ Update
export const updateOfferBanner = async ({ id, updateData }) => {
    const response = await axiosInstance.patch(`/offerBanner/update/${id}`, updateData);
    return response.data;
};

// ✅ Delete
export const deleteOfferBanner = async ({ id }) => {
    const response = await axiosInstance.delete(`/offerBanner/delete/${id}`);
    return response.data;
};
  