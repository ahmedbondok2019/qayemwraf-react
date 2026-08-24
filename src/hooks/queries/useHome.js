import { useQuery } from "@tanstack/react-query";
import homeApi from "@/features/home/api/homeApi";

export const useHome = () => {
	return useQuery({
		queryKey: ["home"],
		queryFn: homeApi.getHomeData,
	});
};
