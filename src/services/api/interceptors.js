import axios from "axios";
import storage from "@/services/storage/storage";
import { STORAGE_KEYS } from "@/services/storage/storageKeys";
import { toast } from "sonner";

// Throttled toast to prevent flooding notifications on parallel query aborts/drops
let lastErrorToastTime = 0;
const showThrottledToast = (message, minInterval = 3000) => {
	const now = Date.now();
	if (now - lastErrorToastTime > minInterval) {
		lastErrorToastTime = now;
		toast.error(message);
	}
};

export const setupInterceptors = (axiosInstance) => {
	// Request interceptor to attach authentication token and active language headers
	axiosInstance.interceptors.request.use(
		(config) => {
			const token = storage.get(STORAGE_KEYS.AUTH_TOKEN, null);
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}

			// Automatically send current active language
			const currentLang =
				localStorage.getItem("app_lang") ||
				localStorage.getItem("qayem_lang") ||
				(window.location.pathname.startsWith("/en") ? "en" : "ar");

			config.headers["Accept-Language"] = currentLang;
			config.headers["X-Locale"] = currentLang;
			config.headers["X-Language"] = currentLang;

			// Add lang to query params if not already set
			if (!config.params) {
				config.params = {};
			}
			if (typeof config.params === "object" && !(config.params instanceof URLSearchParams)) {
				if (!config.params.lang && !config.params.locale) {
					config.params.lang = currentLang;
				}
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
			// 1. Silently ignore canceled / aborted requests (e.g. during language switch or route change)
			if (axios.isCancel(error) || error?.name === "CanceledError" || error?.code === "ERR_CANCELED") {
				return Promise.reject(error);
			}

			const currentLang =
				localStorage.getItem("app_lang") ||
				localStorage.getItem("qayem_lang") ||
				(window.location.pathname.startsWith("/en") ? "en" : "ar");
			const isAr = currentLang === "ar";

			// 2. Handle 401 Unauthorized
			if (error.response && error.response.status === 401) {
				storage.remove(STORAGE_KEYS.AUTH_TOKEN);
				storage.remove(STORAGE_KEYS.USER);

				const isLoginRequest = error.config?.url?.includes("/login");
				const isLoginPage = window.location.pathname.includes("/auth/login");

				if (!isLoginRequest && !isLoginPage) {
					showThrottledToast(
						isAr ? "انتهت الجلسة. يرجى تسجيل الدخول مجدداً." : "Session expired. Please log in again."
					);
					window.location.href = `/${currentLang}/auth/login`;
				}
			} 
			// 3. Handle Network Errors (excluding silenced / background queries)
			else if (!error.response && (error.code === "ERR_NETWORK" || error.message?.includes("Network Error"))) {
				if (!error.config?.silent) {
					showThrottledToast(
						isAr
							? "خطأ في الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت."
							: "Network error. Please check your internet connection."
					);
				}
			} 
			// 4. Handle 5xx Server Errors
			else if (error.response && error.response.status >= 500) {
				if (!error.config?.silent) {
					showThrottledToast(
						isAr ? "خطأ في الخادم. يرجى المحاولة لاحقاً." : "Server error. Please try again later."
					);
				}
			}

			// Normalize API Error for React Query and components
			return Promise.reject(error.response?.data || { message: error.message, errors: {} });
		}
	);
};

export default setupInterceptors;
