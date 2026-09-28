import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";
import { useLanguage } from "@/app/providers/I18nProvider";

export const useAbout = () => {
	const { language } = useLanguage();

	return useQuery({
		queryKey: ["about", language],
		queryFn: async () => {
			const response = await api.get(API_ENDPOINTS.ABOUT);
			return response.data?.data || response.data || response;
		},
		staleTime: 5 * 60 * 1000,
	});
};

export default useAbout;
