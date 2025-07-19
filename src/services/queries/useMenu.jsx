import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDish, deleteDish, getAllDishes, updateDish } from "../services/menus.api";
export const useGetAllDishes = ({ vendor, category = "all" }) => {
    console.log(category);
    return useQuery({
        queryKey: ["dishes", vendor, category],
        queryFn: () => getAllDishes({ vendor, category }),
    });
};

// ✅ Create dish with optimistic UI update
export const useCreateDish = ({ vendor }) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dishData) => createDish({ vendor, dishData }),

        onSuccess: (newDish) => {
            console.log(newDish, "newDish");

            // ✅ Invalidate "all" and "specific category" cache
            queryClient.invalidateQueries({ queryKey: ["dishes", vendor, "all"] });
            queryClient.invalidateQueries({ queryKey: ["dishes", vendor, newDish.category] });
        },
    });
};

// ✅ Update dish
export const useUpdateDish = ({ vendor, category }) => {
    console.log(vendor, category);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, dishData }) => updateDish({ id, dishData }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dishes", vendor, category] });
            queryClient.invalidateQueries({ queryKey: ["dishes", vendor, "all"] });
        },
    });
};

// ✅ Delete dish
export const useDeleteDish = ({ vendor, category }) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id }) => deleteDish({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dishes", vendor, category] });
        },
    });
};
