import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useSecureData = (queryKeyName, url) => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: queryKeyName,
    queryFn: async () => {
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  return { data, isLoading, isError, error, refetch };
};

export default useSecureData;