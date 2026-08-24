import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const useUserAddresses = () => {
	return useQuery({
		queryKey: ["user-addresses"],
		queryFn: async () => {
			const response = await api.get(API_ENDPOINTS.ADDRESSES);
			return response.data || response;
		},
	});
};

export const useCreateAddress = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data) => {
			const response = await api.post(API_ENDPOINTS.ADDRESSES, data);
			return response.data || response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
		},
	});
};

export const useUpdateAddress = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, ...data }) => {
			const response = await api.put(`${API_ENDPOINTS.ADDRESSES}/${id}`, data);
			return response.data || response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
		},
	});
};

export const useDeleteAddress = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id) => {
			const response = await api.delete(`${API_ENDPOINTS.ADDRESSES}/${id}`);
			return response.data || response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
		},
	});
};

export default useUserAddresses;
