import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getIndividualPLan, updateIndividualPlans,getPlans } from "../services/plans.api";



export const useGetPlans = (vendor) => {
    return useQuery({
        queryKey: ["plans", vendor],
        queryFn: ({ queryKey }) => {
            const [_key, vendor] = queryKey;
            return getPlans(vendor);
        },
        enabled: !!vendor,
    });
};

export const useGetIndividualPlan=(_id)=>{
    return useQuery({
        queryKey:['plan',_id],
        queryFn:({queryKey})=>{
            const [_key,_id]=queryKey
            return getIndividualPLan(_id)
        }

    })
}

export const useUpdateIndividualPlan=(vendor)=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:updateIndividualPlans,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['plans',vendor]})
        }
    })
}