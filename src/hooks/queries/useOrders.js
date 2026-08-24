import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import orderApi from "@/features/orders/api/orderApi";

export const useOrders = () => {
	return useQuery({
		queryKey: ["orders"],
		queryFn: async () => {
			const response = await orderApi.getOrders();
			return response.data || response;
		},
	});
};

export const useOrderDetails = (id) => {
	return useQuery({
		queryKey: ["order", id],
		queryFn: async () => {
			const response = await orderApi.getOrderById(id);
			return response.data || response;
		},
		enabled: !!id,
	});
};

export const useCreateOrder = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data) => {
			const response = await orderApi.createOrder(data);
			return response.data || response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
};

export const useCancelOrder = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (orderId) => {
			const response = await orderApi.cancelOrder(orderId);
			return response.data || response;
		},
		onSuccess: (data, orderId) => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
			queryClient.invalidateQueries({ queryKey: ["order", orderId] });
		},
	});
};
