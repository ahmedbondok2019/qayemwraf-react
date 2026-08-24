import { useState } from "react";
import authService from "../services/authService";

export const useRefreshToken = () => {
	const [isRefreshing, setIsRefreshing] = useState(false);

	const refresh = async () => {
		setIsRefreshing(true);
		try {
			const newToken = await authService.refreshAccessToken();
			return newToken;
		} catch (error) {
			throw error;
		} finally {
			setIsRefreshing(false);
		}
	};

	return { refresh, isRefreshing };
};

export default useRefreshToken;
