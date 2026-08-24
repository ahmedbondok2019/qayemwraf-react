import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { FileQuestion, XCircle } from "lucide-react";

export const EmptyState = ({ onClearFilters }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-surface border border-border/40 rounded-3xl w-full my-8">
			<div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 relative shadow-inner">
				<span className="text-5xl drop-shadow-md">🩺</span>
				<div className="absolute -bottom-1 -right-1 w-8 h-8 bg-background rounded-full flex items-center justify-center shadow-sm">
					<div className="w-6 h-6 bg-surface-2 rounded-full flex items-center justify-center">
						<span className="text-xs">⚠️</span>
					</div>
				</div>
			</div>
			
			<h3 className="text-2xl sm:text-3xl font-extrabold text-text mb-3 tracking-tight">
				{isRtl ? "لم يتم العثور على منتجات طبية" : "No Medical Products Found"}
			</h3>
			
			<p className="text-text-secondary max-w-sm mb-8 text-base">
				{isRtl 
					? "عذراً، لا توجد أجهزة طبية أو منتجات تطابق الفلاتر الحالية. جرب تغييرها." 
					: "Sorry, no medical devices or products match your current filters. Try changing them."}
			</p>

			{onClearFilters && (
				<button 
					onClick={onClearFilters}
					className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover shadow-sm transition-colors"
				>
					<XCircle className="w-5 h-5" />
					{isRtl ? "مسح الفلاتر" : "Clear Filters"}
				</button>
			)}
		</div>
	);
};

export default EmptyState;
