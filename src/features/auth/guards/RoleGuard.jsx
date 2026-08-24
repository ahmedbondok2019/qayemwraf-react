import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLanguage } from "@/app/providers/I18nProvider";

export const RoleGuard = ({ children, allowedRoles }) => {
	const { user, isAuthenticated } = useSelector((state) => state.auth);
	const { language } = useLanguage();

	if (!isAuthenticated) {
		return <Navigate to={`/${language}/auth/login`} replace />;
	}

	if (!allowedRoles.includes(user?.role)) {
		// Redirect unauthorized users to access denied or Home
		return <Navigate to={`/${language}/404`} replace />;
	}

	return children;
};

export default RoleGuard;
