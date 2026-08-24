import React from "react";
import { Star, Check } from "lucide-react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { cn } from "@/lib/utils";

export const RatingSelector = ({ stars, selectedRating, onChange, count }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const isSelected = selectedRating === stars;

	return (
		<button 
			onClick={() => onChange(isSelected ? null : stars)}
			className="w-full flex items-center justify-between py-1.5 group outline-none"
		>
			<div className="flex items-center gap-3">
				<div className={cn(
					"w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 shrink-0",
					isSelected 
						? "bg-primary border-primary text-white" 
						: "border-border/80 bg-surface group-hover:border-primary/50"
				)}>
					{isSelected && <Check className="w-3 h-3" strokeWidth={3} />}
				</div>
				
				<div className="flex items-center gap-1.5">
					<div className="flex items-center">
						{[...Array(5)].map((_, i) => (
							<Star 
								key={i} 
								className={cn(
									"w-4 h-4",
									i < stars ? "fill-warning text-warning" : "fill-border text-border"
								)} 
							/>
						))}
					</div>
					<span className={cn(
						"text-sm font-medium transition-colors",
						isSelected ? "text-primary font-bold" : "text-text-secondary group-hover:text-text"
					)}>
						{isRtl ? "فأكثر" : "& Up"}
					</span>
				</div>
			</div>

			{count !== undefined && (
				<span className="text-xs text-text-muted font-medium bg-surface-2 px-2 py-0.5 rounded-full">
					{count}
				</span>
			)}
		</button>
	);
};

export default RatingSelector;
