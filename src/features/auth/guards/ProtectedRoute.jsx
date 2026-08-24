import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLanguage } from "@/app/providers/I18nProvider";

export const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const { language } = useLanguage();
	const location = useLocation();

	if (!isAuthenticated) {
		// Redirect to login page and store the original path they wanted to visit
		return (
			<Navigate 
				to={`/${language}/auth/login`} 
				state={{ from: location }} 
				replace 
			/>
		);
	}

	return children;
};

export default ProtectedRoute;
