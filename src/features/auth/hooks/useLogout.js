import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../authSlice";
import authService from "../services/authService";

export const useLogout = () => {
	const dispatch = useDispatch();

	const logout = async () => {
		try {
			await authService.logout();
		} catch (error) {
			console.error("Logout API request failed:", error);
		} finally {
			dispatch(logoutAction());
		}
	};

	return { logout };
};

export default useLogout;
