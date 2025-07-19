
import axiosInstance from "../axiosInstance"

export const getPlans=async(vendor)=>{
   const response= await axiosInstance.get(`/plans/${vendor}`)
   return response.data
}

export const getIndividualPLan=async(_id)=>{
    const response= await axiosInstance.get(`/plans/individual/${_id}`)
   return response.data
}

export const updateIndividualPlans=async({id,data})=>{
   const response=await axiosInstance.patch(`/plans/individual/${id}`,data)
   return response.data
}