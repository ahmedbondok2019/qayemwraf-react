import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { useSettings } from "@/hooks/queries/useSettings";

/**
 * Logo Component
 * Displays the website logo and branding title.
 */
export const Logo = ({ className = "" }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const { data: settings } = useSettings();

	const logoSrc = settings?.logo || "/images/logo.jpg";

	return (
		<LocalizedLink
			to="/"
			className={`flex items-center select-none group focus-visible:ring-2 focus-visible:ring-ring/50 rounded-md outline-none shrink-0 ${className}`}
			aria-label={isRtl ? "قايم ورف للمشغولات المعدنية وحلول التخزين - الصفحة الرئيسية" : "Qayem & Raf - Home"}
		>
			<img
				src={logoSrc}
				alt={isRtl ? "قايم ورف" : "Qayem & Raf"}
				className="h-10 sm:h-12 w-auto object-contain rounded-xl shadow-xs"
			/>
		</LocalizedLink>
	);
};

export default Logo;

