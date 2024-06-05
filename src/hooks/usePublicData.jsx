import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const usePublicData = (queryKeyName, url) => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: queryKeyName,
    queryFn: async () => {
      const res = await axiosPublic.get(url);
      return res.data;
    },
  });

  return { data, isLoading, isError, error, refetch };
};

export default usePublicData;