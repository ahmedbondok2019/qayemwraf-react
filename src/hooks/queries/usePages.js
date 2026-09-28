import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";
import { useLanguage } from "@/app/providers/I18nProvider";

export const usePages = () => {
	const { language } = useLanguage();

	return useQuery({
		queryKey: ["pages", language],
		queryFn: async () => {
			const response = await api.get(API_ENDPOINTS.PAGES);
			return response.data?.data || response.data || [];
		},
	});
};

export const usePageDetails = (slug) => {
	const { language } = useLanguage();

	return useQuery({
		queryKey: ["page", slug, language],
		queryFn: async () => {
			const response = await api.get(`${API_ENDPOINTS.PAGES}/${slug}`);
			return response.data || response;
		},
		enabled: !!slug,
	});
};

export default usePages;
