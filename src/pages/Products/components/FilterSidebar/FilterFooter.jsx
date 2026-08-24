import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";

export const FilterFooter = ({ onClear, onApply, activeCount = 0 }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="sticky bottom-0 left-0 right-0 p-4 bg-background border-t border-border/60 flex items-center justify-between gap-4 z-10 lg:static lg:p-0 lg:pt-6 lg:border-t-0 lg:bg-transparent">
			<button 
				onClick={onClear}
				className="flex-1 lg:flex-none px-4 py-2.5 text-sm font-bold text-text-secondary hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
			>
				{isRtl ? "مسح الكل" : "Clear All"}
			</button>
			
			<button 
				onClick={onApply}
				className="flex-[2] lg:flex-1 px-4 py-2.5 text-sm font-bold bg-primary text-white hover:bg-primary-hover rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
			>
				{isRtl ? "تطبيق الفلاتر" : "Apply Filters"}
				{activeCount > 0 && (
					<span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-white/20 text-xs">
						{activeCount}
					</span>
				)}
			</button>
		</div>
	);
};

export default FilterFooter;
