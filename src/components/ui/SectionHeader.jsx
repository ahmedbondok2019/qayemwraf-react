import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SectionHeader Component
 * A consistent header for all Homepage Commerce sections.
 */
export const SectionHeader = ({ title, subtitle, viewAllLink, viewAllText, className }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className={cn("flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8", className)}>
			<div className="flex flex-col gap-2">
				<h2 className="text-h2 font-bold text-text leading-tight">
					{title[language]}
				</h2>
				{subtitle && (
					<p className="text-body text-text-secondary">
						{subtitle[language]}
					</p>
				)}
			</div>

			{viewAllLink && (
				<LocalizedLink
					to={viewAllLink}
					className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
				>
					{viewAllText ? viewAllText[language] : (isRtl ? "عرض الكل" : "View All")}
					{isRtl ? (
						<ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
					) : (
						<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
					)}
				</LocalizedLink>
			)}
		</div>
	);
};

export default SectionHeader;
