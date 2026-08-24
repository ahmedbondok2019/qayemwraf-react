import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const useCountries = () => {
	return useQuery({
		queryKey: ["countries"],
		queryFn: async () => {
			const res = await api.get(API_ENDPOINTS.COUNTRIES);
			return res.data || res;
		},
	});
};

export const useGovernorates = (countryId) => {
	return useQuery({
		queryKey: ["governorates", countryId],
		queryFn: async () => {
			const res = await api.get(`${API_ENDPOINTS.GOVERNORATES}/${countryId}`);
			return res.data || res;
		},
		enabled: !!countryId,
	});
};

export const useCities = (governorateId) => {
	return useQuery({
		queryKey: ["cities", governorateId],
		queryFn: async () => {
			const res = await api.get(`${API_ENDPOINTS.CITIES}/${governorateId}`);
			return res.data || res;
		},
		enabled: !!governorateId,
	});
};
