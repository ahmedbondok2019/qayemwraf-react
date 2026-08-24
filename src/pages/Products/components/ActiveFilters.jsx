import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const ActiveFilters = ({ activeFilters, onRemoveFilter, onClearAll }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	if (!activeFilters || activeFilters.length === 0) return null;

	return (
		<div className="flex flex-wrap items-center gap-2 mb-6">
			<span className="text-sm text-text-secondary font-medium ltr:mr-2 rtl:ml-2">
				{isRtl ? "الفلاتر النشطة:" : "Active Filters:"}
			</span>
			
			{activeFilters.map((filter) => (
				<div 
					key={filter.id}
					className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold group transition-colors hover:bg-primary hover:text-white"
				>
					<span>{filter.label[language]}</span>
					<button
						onClick={() => onRemoveFilter(filter.id, filter.type)}
						className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/20 text-primary group-hover:bg-white/20 group-hover:text-white transition-colors"
						aria-label={`Remove ${filter.label[language]} filter`}
					>
						<X className="w-3 h-3" />
					</button>
				</div>
			))}

			<button
				onClick={onClearAll}
				className="text-sm font-bold text-danger hover:text-danger-hover hover:underline ltr:ml-2 rtl:mr-2 transition-colors"
			>
				{isRtl ? "مسح الكل" : "Clear All"}
			</button>
		</div>
	);
};

export default ActiveFilters;
