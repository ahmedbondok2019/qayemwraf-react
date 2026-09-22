import { useSelector } from "react-redux";

export const useCurrentUser = () => {
	const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

	return {
		user,
		isAuthenticated,
		isLoading: loading,
		isAdmin: user?.role === "admin",
		isClient: user?.role === "client",
		isDistributor: user?.role === "distributor"
	};
};

export default useCurrentUser;
