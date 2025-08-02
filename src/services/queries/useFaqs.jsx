import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFaq, getFaqs, updateFaq, deleteFaq } from "../services/faqs.api";

export const useCreateFaq = (vendor) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (faqData) => createFaq({ vendor, faqData }),
        onSuccess: () => {
            queryClient.invalidateQueries(["faqs", vendor]);
        },
    });
};

export const useGetFaqs = (vendor) => {
    return useQuery({
        queryKey: ["faqs", vendor],
        queryFn: () => getFaqs({ vendor }),
    });
};

export const useUpdateFaq = (vendor) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, faqData }) => updateFaq({ id, faqData }),
        onSuccess: () => {
            queryClient.invalidateQueries(["faqs", vendor]);
        },
    });
};

export const useDeleteFaq = (vendor) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id }) => deleteFaq({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries(["faqs", vendor]);
        },
    });
};
