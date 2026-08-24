import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLanguage } from "@/app/providers/I18nProvider";

export const GuestRoute = ({ children }) => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const { language } = useLanguage();
	const location = useLocation();

	if (isAuthenticated) {
		// If already logged in, redirect them back to where they came from or profile
		const redirectPath = location.state?.from?.pathname || `/${language}/account`;
		return <Navigate to={redirectPath} replace />;
	}

	return children;
};

export default GuestRoute;
