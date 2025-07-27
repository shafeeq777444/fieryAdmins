import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getContactDetails, updateContactDetails } from "../services/contactDetails.js"
import toast from "react-hot-toast"


// getWeeklyMenus
export const useGetContactDetails=()=>{ 
    return useQuery({
       queryKey:["contactDetails"],
       queryFn:()=>getContactDetails(),
       staleTime:1000*60*5,
       cacheTime:1000*60*10,
       refetchOnWindowFocus:false,
       refetchOnMount:false,
       refetchOnReconnect:false,
       refetchIntervalInBackground:false,
    })
   }

export const useUpdateContactDetails=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:(updateData)=>updateContactDetails(updateData),
     onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['contactDetails']})
        toast.success("Details updated successfully")
     }
    })
}