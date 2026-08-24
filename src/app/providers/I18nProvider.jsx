import { createContext, useContext, useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/constants/storage";
import { LANGUAGES, LANGUAGE_DETAILS } from "@/constants/languages";

const LanguageContext = createContext(null);

export const I18nProvider = ({ children }) => {
	const [language, setLanguage] = useState(
		() => localStorage.getItem(STORAGE_KEYS.LANGUAGE) || LANGUAGES.AR
	);

	useEffect(() => {
		const root = window.document.documentElement;
		const details = LANGUAGE_DETAILS[language] || LANGUAGE_DETAILS[LANGUAGES.AR];
		root.setAttribute("lang", details.code);
		root.setAttribute("dir", details.dir);
		localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
	}, [language]);

	const toggleLanguage = () => {
		setLanguage((prev) => (prev === LANGUAGES.AR ? LANGUAGES.EN : LANGUAGES.AR));
	};

	return (
		<LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within an I18nProvider");
	}
	return context;
};

export default I18nProvider;
