import { useState } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { setCredentials } from "../authSlice";
import authService from "../services/authService";
import { AUTH_ERRORS } from "../constants/authConstants";

export const useLogin = () => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const login = async (email, password, rememberMe = true) => {
		setLoading(true);
		setError(null);
		try {
			// Spec: login requires { login, password }
			const res = await authService.login({ login: email, password });
			const user = res.data?.user || res.user;
			const accessToken = res.data?.access_token || res.data?.token || res.access_token || res.token;
			
			if (!user || !accessToken) {
				console.error("Login response:", res);
				throw new Error("Invalid response from server: Missing user or token");
			}
			
			dispatch(setCredentials({ user, accessToken }));
			setLoading(false);
			return res;
		} catch (err) {
			const errorMsg = AUTH_ERRORS[err.message] || { en: err.message || "Failed to log in", ar: err.message || "فشل تسجيل الدخول" };
			setError(errorMsg);
			setLoading(false);
			throw err;
		}
	};

	return {
		login,
		loading,
		error
	};
};

export default useLogin;
