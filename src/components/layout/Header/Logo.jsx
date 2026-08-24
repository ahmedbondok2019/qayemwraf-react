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
			className="flex items-center gap-2 select-none group focus-visible:ring-2 focus-visible:ring-ring/50 rounded-md outline-none shrink-0"
			aria-label={isRtl ? "قائم ورف - الصفحة الرئيسية" : "Qayem & Raf - Home"}
		>
			<div className="flex flex-col leading-none">
				<span className="text-2xl font-black tracking-tight text-foreground">
					{isRtl ? "قائم ورف" : "Qayem & Raf"}
				</span>
				<span className="text-[10px] font-bold text-primary tracking-wider uppercase mt-1">
					{isRtl ? "لحلول التخزين المعدني" : "Storage Solutions"}
				</span>
			</div>
		</LocalizedLink>
	);
};

export default Logo;
