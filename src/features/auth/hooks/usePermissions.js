import { useSelector } from "react-redux";

export const usePermissions = () => {
	const { user } = useSelector((state) => state.auth);

	const hasPermission = (permission) => {
		if (!user) return false;
		// Admin has all permissions
		if (user.role === "admin") return true;
		return user.permissions?.includes(permission) || false;
	};

	const hasAnyPermission = (permissions) => {
		if (!user) return false;
		if (user.role === "admin") return true;
		return permissions.some((perm) => user.permissions?.includes(perm));
	};

	return { hasPermission, hasAnyPermission, permissions: user?.permissions || [] };
};

export default usePermissions;
