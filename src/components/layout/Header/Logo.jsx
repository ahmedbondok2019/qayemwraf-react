import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { useSettings } from "@/hooks/queries/useSettings";

/**
 * Logo Component
 * Displays the dynamic website logo from settings or fallback text logo.
 */
export const Logo = ({ className = "" }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const { data: settings } = useSettings();

	return (
		<LocalizedLink
			to="/"
			className={`flex items-center gap-2 select-none group focus-visible:ring-2 focus-visible:ring-ring/50 rounded-md outline-none shrink-0 ${className}`}
			aria-label={isRtl ? "قائم ورف - الصفحة الرئيسية" : "Qayem & Raf - Home"}
		>
			{settings?.logo ? (
				<img
					src={settings.logo}
					alt="Qayem & Raf"
					className="h-10 sm:h-12 w-auto object-contain rounded-lg"
				/>
			) : (
				<div className="flex flex-col leading-none">
					<span className="text-2xl font-black tracking-tight text-foreground">
						{isRtl ? "قائم ورف" : "Qayem & Raf"}
					</span>
					<span className="text-[10px] font-bold text-primary tracking-wider uppercase mt-1">
						{isRtl ? "لحلول التخزين المعدني" : "Storage Solutions"}
					</span>
				</div>
			)}
		</LocalizedLink>
	);
};

export default Logo;
