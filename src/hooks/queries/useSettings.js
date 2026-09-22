import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";
import { useLanguage } from "@/app/providers/I18nProvider";

export const useSettings = () => {
	const { language } = useLanguage();

	return useQuery({
		queryKey: ["settings", language],
		queryFn: async () => {
			const response = await api.get(API_ENDPOINTS.SETTINGS);
			return response.data || response;
		},
		staleTime: 5 * 60 * 1000, // settings cache
	});
};

export default useSettings;
