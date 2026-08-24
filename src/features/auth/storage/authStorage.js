import { AUTH_STORAGE_KEYS } from "../constants/authConstants";

export const authStorage = {
	getRememberMe: () => {
		return localStorage.getItem(AUTH_STORAGE_KEYS.REMEMBER_ME) === "true";
	},

	setRememberMe: (value) => {
		localStorage.setItem(AUTH_STORAGE_KEYS.REMEMBER_ME, value ? "true" : "false");
	},

	getAccessToken: () => {
		return localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN) || 
		       sessionStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
	},

	setAccessToken: (token, rememberMe = true) => {
		if (rememberMe) {
			localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, token);
		} else {
			sessionStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, token);
		}
	},

	getRefreshToken: () => {
		return localStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN) || 
		       sessionStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
	},

	setRefreshToken: (token, rememberMe = true) => {
		if (rememberMe) {
			localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, token);
		} else {
			sessionStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, token);
		}
	},

	getUser: () => {
		const user = localStorage.getItem(AUTH_STORAGE_KEYS.USER) || 
		             sessionStorage.getItem(AUTH_STORAGE_KEYS.USER);
		return user ? JSON.parse(user) : null;
	},

	setUser: (user, rememberMe = true) => {
		const userStr = JSON.stringify(user);
		if (rememberMe) {
			localStorage.setItem(AUTH_STORAGE_KEYS.USER, userStr);
		} else {
			sessionStorage.setItem(AUTH_STORAGE_KEYS.USER, userStr);
		}
	},

	clearAll: () => {
		localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
		localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
		localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
		
		sessionStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
		sessionStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
		sessionStorage.removeItem(AUTH_STORAGE_KEYS.USER);
	}
};

export default authStorage;
