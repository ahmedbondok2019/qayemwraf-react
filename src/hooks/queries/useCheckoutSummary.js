import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";
import { getOrCreateTempUserId } from "@/features/cart/cartSlice";
import { store } from "@/app/store";

export const useCheckoutSummary = (params = {}) => {
	return useQuery({
		queryKey: ["checkoutSummary", params],
		queryFn: async () => {
			const state = store.getState();
			const isAuthenticated = state.auth?.isAuthenticated;
			const tempUserId = !isAuthenticated ? getOrCreateTempUserId() : null;

			const config = {
				params: {
					...params,
					...(tempUserId ? { temp_user_id: tempUserId } : {}),
				},
			};

			const response = await api.get(API_ENDPOINTS.CHECKOUT_SUMMARY, config);
			// Response interceptor extracts response.data, so if it contains a nested data property, return it.
			return response.data || response;
		},
	});
};

export const usePlaceOrder = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (orderData) => {
			const state = store.getState();
			const isAuthenticated = state.auth?.isAuthenticated;
			const tempUserId = !isAuthenticated ? getOrCreateTempUserId() : null;

			const payload = {
				...orderData,
				...(tempUserId ? { temp_user_id: tempUserId } : {}),
			};

			const response = await api.post(API_ENDPOINTS.CHECKOUT_STORE, payload);
			return response.data || response;
		},
		onSuccess: () => {
			// Invalidate related caches
			queryClient.invalidateQueries({ queryKey: ["orders"] });
			queryClient.invalidateQueries({ queryKey: ["checkoutSummary"] });
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});
};

export const useApplyCouponCheckout = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (couponCode) => {
			const state = store.getState();
			const isAuthenticated = state.auth?.isAuthenticated;
			const tempUserId = !isAuthenticated ? getOrCreateTempUserId() : null;

			const payload = {
				coupon_code: couponCode,
				...(tempUserId ? { temp_user_id: tempUserId } : {}),
			};

			const response = await api.post(API_ENDPOINTS.CHECKOUT_APPLY_COUPON, payload);
			return response.data || response;
		},
		onSuccess: () => {
			// Refresh summary and cart to reflect discount
			queryClient.invalidateQueries({ queryKey: ["checkoutSummary"] });
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});
};

export default useCheckoutSummary;
