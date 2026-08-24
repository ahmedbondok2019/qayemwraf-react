import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";

/**
 * Logo Component
 * Matches the reference design exactly: large blue text with a green '+' sign.
 * No box or extra icons.
 */
export const Logo = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<LocalizedLink
			to="/"
			className="flex items-center select-none group focus-visible:ring-2 focus-visible:ring-ring/50 rounded-md outline-none shrink-0"
			aria-label={isRtl ? "إيجي ميديكال - الصفحة الرئيسية" : "EGI Medical - Home"}
		>
			<img 
				src="/images/logo.jpeg" 
				alt="EGI Medical Logo" 
				className="h-12 sm:h-16 w-auto object-contain rounded-md"
			/>
		</LocalizedLink>
	);
};

export default Logo;
