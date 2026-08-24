import storage from "@/services/storage/storage";
import { STORAGE_KEYS } from "@/services/storage/storageKeys";
import { toast } from "sonner";

export const setupInterceptors = (axiosInstance) => {
	// Request interceptor to attach authentication token
	axiosInstance.interceptors.request.use(
		(config) => {
			const token = storage.get(STORAGE_KEYS.AUTH_TOKEN, null);
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	// Response interceptor to handle global errors (e.g. 401 Unauthorized)
	axiosInstance.interceptors.response.use(
		(response) => response.data, // Strip the axios config/headers wrapper automatically
		(error) => {
			if (error.response && error.response.status === 401) {
				storage.remove(STORAGE_KEYS.AUTH_TOKEN);
				storage.remove(STORAGE_KEYS.USER);
				
				const isLoginRequest = error.config?.url?.includes("/login");
				const isLoginPage = window.location.pathname.includes("/auth/login");
				
				if (!isLoginRequest && !isLoginPage) {
					const pathParts = window.location.pathname.split("/");
					const lang = pathParts[1] || "ar";
					toast.error(lang === "ar" ? "انتهت الجلسة. يرجى تسجيل الدخول مجدداً." : "Session expired. Please log in again.");
					window.location.href = `/${lang}/auth/login`;
				}
			} else if (!error.response && error.code === "ERR_NETWORK") {
				toast.error(
					window.location.pathname.includes("/ar") 
						? "خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت." 
						: "Network Error. Please check your internet connection."
				);
			} else if (error.response && error.response.status >= 500) {
				toast.error(
					window.location.pathname.includes("/ar") 
						? "خطأ في الخادم. يرجى المحاولة لاحقاً." 
						: "Server Error. Please try again later."
				);
			}
			
			// Normalize API Error for Phase 13
			return Promise.reject(error.response?.data || { message: error.message, errors: {} });
		}
	);
};
