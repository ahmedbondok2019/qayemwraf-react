import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const usePaymentMethods = () => {
	return useQuery({
		queryKey: ["payment-methods"],
		queryFn: async () => {
			const response = await api.get(API_ENDPOINTS.PAYMENT_METHODS);
			return response.data || response;
		},
	});
};

export default usePaymentMethods;
