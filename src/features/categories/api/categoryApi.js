import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const categoryApi = {
	getCategories: () => api.get(API_ENDPOINTS.CATEGORIES),
	getCategoryBySlug: (slug) => api.get(`${API_ENDPOINTS.CATEGORIES}/${slug}`),
};

export default categoryApi;
