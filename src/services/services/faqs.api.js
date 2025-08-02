import axiosInstance from "../axiosInstance";

// ✅ Create FAQ
export const createFaq = async ({ vendor, faqData }) => {
  const response = await axiosInstance.post(`/faqs/${vendor}`, faqData);
  return response.data;
};

// ✅ Get All FAQs for Vendor
export const getFaqs = async ({ vendor }) => {
  const response = await axiosInstance.get(`/faqs/${vendor}`);
  return response.data; // Array of FAQs
};

// ✅ Update FAQ
export const updateFaq = async ({ id, faqData }) => {
  const response = await axiosInstance.patch(`/faqs/${id}`, faqData);
  return response.data;
};

// ✅ Delete FAQ
export const deleteFaq = async ({ id }) => {
  const response = await axiosInstance.delete(`/faqs/${id}`);
  return response.data;
};
