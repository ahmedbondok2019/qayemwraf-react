import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const brandApi = {
	getBrands: () => api.get(API_ENDPOINTS.BRANDS),
	getBrandBySlug: (slug) => api.get(`${API_ENDPOINTS.BRANDS}/${slug}`),
};

export default brandApi;
