import api from "@/services/api/axios";
import { API_ENDPOINTS } from "@/services/api/api.constants";

export const authService = {
	register: async (userData) => {
		// As per spec: { phone, country_id: 1, ... }
		const payload = {
			...userData,
			country_id: userData.country_id || 1
		};
		return await api.post(API_ENDPOINTS.AUTH.REGISTER, payload);
	},

	login: async (credentials) => {
		// credentials: { login (email or phone), password }
		return await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
	},

	socialLogin: async (providerData) => {
		// providerData: { provider, provider_id, email, name, image, temp_user_id, country_id }
		return await api.post(API_ENDPOINTS.AUTH.SOCIAL_LOGIN, providerData);
	},

	forgetPassword: async (email) => {
		return await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
	},

	resetPassword: async (resetData) => {
		// resetData: { email, otp, password, password_confirmation }
		return await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, resetData);
	},

	logout: async () => {
		return await api.post(API_ENDPOINTS.AUTH.LOGOUT);
	},

	deleteAccount: async () => {
		return await api.post(API_ENDPOINTS.USER.DELETE_ACCOUNT);
	}
};

export default authService;
