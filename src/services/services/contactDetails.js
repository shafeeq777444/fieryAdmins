import axiosInstance from "../axiosInstance";


export const getContactDetails = async () => {
    const response = await axiosInstance.get("/contactDetails/get/FG");
    return response.data;
};

export const updateContactDetails = async (updateData) => {
    const response = await axiosInstance.patch("/contactDetails/update/FG",updateData);
    return response.data;
};
