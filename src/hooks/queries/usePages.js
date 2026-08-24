import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const usePages = () => {
	return useQuery({
		queryKey: ["pages"],
		queryFn: async () => {
			const response = await api.get(API_ENDPOINTS.PAGES);
			return response.data?.data || response.data || [];
		},
	});
};

export const usePageDetails = (slug) => {
	return useQuery({
		queryKey: ["page", slug],
		queryFn: async () => {
			const response = await api.get(`${API_ENDPOINTS.PAGES}/${slug}`);
			return response.data || response;
		},
		enabled: !!slug,
	});
};
