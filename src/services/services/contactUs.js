import axiosInstance from "../axiosInstance";

export const getContactUs = async (vendor, page) => {
  const response = await axiosInstance.get(
    `/contactUs/${vendor}?page=${page}`
  );
  return response.data; // should include { data, totalPages, totalCount }
};
