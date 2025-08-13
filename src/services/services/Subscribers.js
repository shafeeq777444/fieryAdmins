import axiosInstance from "../axiosInstance"

export const getSubscribers = async (vendor, page, ) => {
  const response = await axiosInstance.get(
    `/subscribers/${vendor}?page=${page}`
  );
  return response.data; // { data, totalPages, totalCount }
};
