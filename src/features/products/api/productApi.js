import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const productApi = {
	getProducts: (params) => api.get(API_ENDPOINTS.PRODUCTS, { params }),
	getProductBySlug: (slug) => api.get(`${API_ENDPOINTS.PRODUCTS}/${slug}`),
	searchProducts: (query) => api.get(`${API_ENDPOINTS.PRODUCTS}/search`, { params: { q: query } }),
	getOffers: () => api.get(`${API_ENDPOINTS.PRODUCTS}/offers`),
};

export default productApi;
