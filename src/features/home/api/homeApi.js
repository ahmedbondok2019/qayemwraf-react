import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const homeApi = {
	getHomeData: () => api.get(API_ENDPOINTS.HOME),
};

export default homeApi;
