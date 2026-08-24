import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const reviewApi = {
	getProductReviews: (productId) => api.get(`/products/${productId}/reviews`),
	addReview: (data) => api.post(API_ENDPOINTS.RATE_PRODUCT, data),
};

export default reviewApi;
