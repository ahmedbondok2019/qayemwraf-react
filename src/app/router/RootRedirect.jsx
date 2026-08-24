import { Navigate } from "react-router-dom";
import { STORAGE_KEYS } from "@/constants/storage";
import { LANGUAGES } from "@/constants/languages";

export const RootRedirect = () => {
	const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || LANGUAGES.AR;
	return <Navigate to={`/${savedLang}`} replace />;
};

export default RootRedirect;
