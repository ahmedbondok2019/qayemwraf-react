import React from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/**
 * HeroFeatures Component
 * Displays the trust indicators (e.g., 100% Original, Secure Payment) beneath the CTAs.
 */
export const HeroFeatures = ({ features, language = "ar" }) => {
	if (!features || features.length === 0) return null;

	return (
		<div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8">
			{features.map((feature, idx) => (
				<div key={idx} className="flex items-center gap-4 sm:gap-6 md:gap-8">
					<div className="flex items-center gap-3.5">
						<div className="flex items-center justify-center text-white">
							<Icon name={feature.icon} size={36} strokeWidth={1.25} className="opacity-95" />
						</div>
						<div className="flex flex-col leading-snug">
							{feature.title && (
								<span className="text-[14px] sm:text-[15px] font-bold text-white tracking-wide">
									{feature.title[language] || feature.title.ar || feature.title.en}
								</span>
							)}
							{feature.subtitle && (
								<span className="text-[11.5px] sm:text-[12.5px] font-medium text-white/85">
									{feature.subtitle[language] || feature.subtitle.ar || feature.subtitle.en}
								</span>
							)}
						</div>
					</div>
					{idx < features.length - 1 && (
						<div className="hidden sm:block w-[1px] h-8 bg-white/25" />
					)}
				</div>
			))}
		</div>
	);
};

export default HeroFeatures;
