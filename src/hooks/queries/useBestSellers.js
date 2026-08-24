import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const useBestSellers = () => {
	return useQuery({
		queryKey: ["bestSellers"],
		queryFn: async () => {
			const res = await api.get(API_ENDPOINTS.BEST_SELLERS);
			return res.data || res;
		},
	});
};

export default useBestSellers;
