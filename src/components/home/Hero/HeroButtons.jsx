import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/providers/I18nProvider";

/**
 * HeroButtons Component
 * Handles the Primary and Secondary CTAs.
 */
export const HeroButtons = ({ primary, secondary }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const Arrow = isRtl ? ArrowLeft : ArrowRight;

	if (!primary && !secondary) return null;

	return (
		<div className="flex flex-row items-center justify-center sm:justify-start w-full gap-3 pt-2 sm:pt-4">
			{primary && (
				<Button
					asChild
					className="group w-[47%] sm:w-auto sm:min-w-[160px] h-10 sm:h-12 !rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-none hover:shadow-md transition-shadow font-semibold text-xs sm:text-[15px] order-1 rtl:order-2"
				>
					<LocalizedLink to={primary.link} className="flex items-center justify-center gap-1.5 sm:gap-2">
						{isRtl && <Arrow className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />}
						<span>{primary.label}</span>
						{!isRtl && <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />}
					</LocalizedLink>
				</Button>
			)}

			{secondary && (
				<Button
					asChild
					variant="outline"
					className="w-[47%] sm:w-auto sm:min-w-[160px] h-10 sm:h-12 !rounded-full border-2 border-white/80 bg-transparent text-white hover:bg-white hover:text-[#0a2342] hover:border-white shadow-none font-semibold text-xs sm:text-[15px] transition-all order-2 rtl:order-1"
				>
					<LocalizedLink to={secondary.link}>{secondary.label}</LocalizedLink>
				</Button>
			)}
		</div>
	);
};

export default HeroButtons;
