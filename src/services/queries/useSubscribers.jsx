import { useQuery } from "@tanstack/react-query";
import { getSubscribers } from "../services/Subscribers";

export const useGetSubscribers = (vendor, page) => {
  return useQuery({
    queryKey: ["subscribers", vendor, page], // cache per page
    queryFn: () => getSubscribers(vendor, page),
    keepPreviousData: true, // keeps old data while fetching new
  });
};
