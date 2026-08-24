import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const userApi = {
	getProfile: () => api.get(API_ENDPOINTS.PROFILE),
};

export default userApi;
