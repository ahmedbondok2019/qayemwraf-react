import { useEffect } from "react";
import { useParams, Navigate, Outlet } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { LANGUAGES } from "@/constants/languages";

export const LanguageGuard = () => {
	const { lang } = useParams();
	const { language, setLanguage } = useLanguage();

	const isValidLang = Object.values(LANGUAGES).includes(lang);

	useEffect(() => {
		if (isValidLang && lang !== language) {
			setLanguage(lang);
		}
	}, [lang, language, isValidLang, setLanguage]);

	if (!isValidLang) {
		const fallbackLang = language || LANGUAGES.AR;
		return <Navigate to={`/${fallbackLang}`} replace />;
	}

	return <Outlet />;
};

export default LanguageGuard;
