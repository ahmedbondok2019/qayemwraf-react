import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Breadcrumb Component
 * Clean, scrollable breadcrumb navigation.
 * 
 * @param {Array} items - Array of { label: {en, ar} | string, link: string }
 * If link is not provided or it's the last item, it renders as text.
 */
export const Breadcrumb = ({ items = [], className }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	if (!items || items.length === 0) return null;

	return (
		<nav aria-label="Breadcrumb" className={cn("w-full py-4 overflow-x-auto no-scrollbar", className)}>
			<ol className="flex items-center gap-2 min-w-max text-sm">
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					const label = item.label?.[language] || item.label;
					
					return (
						<li key={index} className="flex items-center gap-2">
							{isLast || !item.link ? (
								<span className="text-text font-medium" aria-current="page">
									{label}
								</span>
							) : (
								<>
									<LocalizedLink 
										to={item.link}
										className="text-text-secondary hover:text-primary transition-colors"
									>
										{label}
									</LocalizedLink>
									<ChevronRight className={cn("w-4 h-4 text-slate-300", isRtl && "scale-x-[-1]")} />
								</>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

export default Breadcrumb;
