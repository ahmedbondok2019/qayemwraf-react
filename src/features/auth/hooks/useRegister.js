import { useState } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { setCredentials } from "../authSlice";
import authService from "../services/authService";

export const useRegister = () => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const register = async (userData) => {
		setLoading(true);
		setError(null);
		try {
			const data = await authService.register(userData);
			dispatch(setCredentials({ user: data.user, accessToken: data.access_token || data.token }));
			setLoading(false);
			return data;
		} catch (err) {
			const errorMsg = { en: err.message || "Failed to register", ar: err.message || "فشل إنشاء الحساب" };
			setError(errorMsg);
			setLoading(false);
			throw err;
		}
	};

	return {
		register,
		loading,
		error
	};
};

export default useRegister;
