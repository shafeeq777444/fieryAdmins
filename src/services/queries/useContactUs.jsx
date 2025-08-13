import { useQuery } from "@tanstack/react-query";
import { getContactUs } from "../services/contactUs";


export const useGetContactUs = (vendor, page) => {
  return useQuery({
    queryKey: ["contactUs", vendor, page],
    queryFn: () => getContactUs(vendor, page ),
    keepPreviousData: true,
  });
};
