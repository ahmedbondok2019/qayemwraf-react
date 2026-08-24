// API calls for Auth endpoints
import { api } from "@/services/api/client";

export const authApi = {
	login: async (credentials) => {
		const response = await api.post("/login", credentials);
		return response.data || response;
	},

	register: async (userData) => {
		const response = await api.post("/registerUser", userData);
		return response.data || response;
	},

	forgotPassword: async (email) => {
		const response = await api.post("/forget-password", { email });
		return response.data || response;
	},

	verifyOtp: async (email, otp) => {
		const response = await api.post("/verify-otp", { email, otp });
		return response.data || response;
	},

	resetPassword: async (token, newPassword) => {
		const response = await api.post("/reset-password", { token, newPassword });
		return response.data || response;
	},

	refreshToken: async (token) => {
		const response = await api.post("/refresh-token", { refreshToken: token });
		return response.data || response;
	},

	logout: async () => {
		const response = await api.post("/logout");
		return response.data || response;
	}
};

export default authApi;
