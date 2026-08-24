import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { LANGUAGES } from "@/constants/languages";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * LanguageSwitcher Component
 * Toggles between English and Arabic.
 * Persists choice in localStorage via I18nProvider.
 * Supports RTL/LTR and Light/Dark.
 */
export const LanguageSwitcher = ({ variant = "default", className }) => {
	const { language, toggleLanguage } = useLanguage();
	const navigate = useNavigate();
	const location = useLocation();
	const isRtl = language === "ar";

	const handleLanguageSwitch = () => {
		const newLang = language === LANGUAGES.AR ? LANGUAGES.EN : LANGUAGES.AR;
		toggleLanguage();
		
		const pathSegments = location.pathname.split('/').filter(Boolean);
		if (pathSegments.length > 0 && Object.values(LANGUAGES).includes(pathSegments[0])) {
			pathSegments[0] = newLang;
		} else {
			pathSegments.unshift(newLang);
		}
		
		const newPath = '/' + pathSegments.join('/') + location.search + location.hash;
		navigate(newPath);
	};

	return (
		<button
			onClick={handleLanguageSwitch}
			className={cn(
				"inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-150 cursor-pointer select-none rounded-md focus-visible:ring-2 focus-visible:ring-ring/50 outline-none",
				variant === "announcement"
					? "text-white/90 hover:text-white px-2 py-1"
					: "text-text-secondary hover:text-primary px-2 py-1.5 hover:bg-surface-2",
				className
			)}
			aria-label={isRtl ? "Switch to English" : "التبديل إلى العربية"}
		>
			<Globe className="w-3.5 h-3.5" />
			<span>{isRtl ? "English" : "العربية"}</span>
		</button>
	);
};

export default LanguageSwitcher;
