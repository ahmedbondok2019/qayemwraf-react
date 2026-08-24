import React from "react";
import { useSelector } from "react-redux";

export const PermissionGuard = ({ children, requiredPermission, fallback = null }) => {
	const { user } = useSelector((state) => state.auth);

	const hasPermission = user?.permissions?.includes(requiredPermission) || false;

	if (!hasPermission) {
		return fallback;
	}

	return children;
};

export default PermissionGuard;
