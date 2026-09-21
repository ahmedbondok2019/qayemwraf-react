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
			className={`flex items-center gap-2.5 select-none group focus-visible:ring-2 focus-visible:ring-ring/50 rounded-md outline-none shrink-0 ${className}`}
			aria-label={isRtl ? "قايم ورف للمشغولات المعدنية وحلول التخزين - الصفحة الرئيسية" : "Qayem & Raf - Home"}
		>
			<img
				src={logoSrc}
				alt={isRtl ? "قايم ورف" : "Qayem & Raf"}
				className="h-10 sm:h-11 w-auto object-contain rounded-xl shadow-xs"
			/>
			<div className="flex flex-col leading-none">
				<span className="text-xl sm:text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
					{isRtl ? "قايم ورف" : "Qayem & Raf"}
				</span>
				<span className="text-[9px] sm:text-[10px] font-bold text-primary tracking-wider uppercase mt-0.5">
					{isRtl ? "للمشغولات المعدنية وحلول التخزين" : "Metal Works & Storage Solutions"}
				</span>
			</div>
		</LocalizedLink>
	);
};

export default Logo;

