import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const useSettings = () => {
	return useQuery({
		queryKey: ["settings"],
		queryFn: async () => {
			const response = await api.get(API_ENDPOINTS.SETTINGS);
			return response.data || response;
		},
		staleTime: 5 * 60 * 1000, // settings rarely change, cache for 5 minutes
	});
};

export default useSettings;
