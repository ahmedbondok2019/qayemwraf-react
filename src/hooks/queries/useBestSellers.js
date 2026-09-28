import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";
import { useLanguage } from "@/app/providers/I18nProvider";

export const useBestSellers = () => {
	const { language } = useLanguage();

	return useQuery({
		queryKey: ["bestSellers", language],
		queryFn: async () => {
			const res = await api.get(API_ENDPOINTS.BEST_SELLERS);
			return res.data || res;
		},
	});
};

export default useBestSellers;
