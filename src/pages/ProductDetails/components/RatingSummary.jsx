import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const RatingSummary = ({ reviews, selectedRating, onRatingSelect }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	if (!reviews || !reviews.length) return null;

	const averageRating = (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1);
	const totalReviews = reviews.length;

	// Calculate breakdown
	const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
	reviews.forEach(r => {
		const rFloor = Math.floor(r.rating);
		if (breakdown[rFloor] !== undefined) {
			breakdown[rFloor]++;
		}
	});

	return (
		<div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-surface-2/30 rounded-2xl border border-border/50 mb-8">
			{/* Average Score */}
			<div className="flex flex-col items-center justify-center shrink-0 w-32 h-32 bg-surface rounded-full shadow-sm border border-border/50">
				<span className="text-4xl font-extrabold text-text">{averageRating}</span>
				<div className="flex items-center mt-1">
					{Array.from({ length: 5 }).map((_, i) => (
						<Star 
							key={i} 
							className={cn(
								"w-3 h-3", 
								i < Math.floor(Number(averageRating))
									? "fill-warning text-warning" 
									: "fill-border text-border"
							)} 
						/>
					))}
				</div>
				<span className="text-xs font-medium text-text-secondary mt-1">
					{totalReviews} {isRtl ? "تقييم" : "Reviews"}
				</span>
			</div>

			{/* Breakdown Bars */}
			<div className="flex-1 w-full flex flex-col gap-2">
				{[5, 4, 3, 2, 1].map(star => {
					const count = breakdown[star];
					const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
					const isSelected = selectedRating === star;
					return (
						<button 
							key={star} 
							onClick={() => onRatingSelect && onRatingSelect(isSelected ? null : star)}
							className={cn(
								"flex items-center gap-3 text-sm w-full p-1.5 rounded-lg hover:bg-surface-2 transition-colors cursor-pointer text-start",
								isSelected && "bg-primary/5 ring-1 ring-primary/20"
							)}
						>
							<span className="flex items-center gap-1 w-12 font-bold text-text-secondary shrink-0">
								{star} <Star className="w-3.5 h-3.5 fill-warning text-warning" />
							</span>
							<div className="flex-1 h-2.5 bg-surface-2 rounded-full overflow-hidden">
								<div 
									className="h-full bg-warning rounded-full transition-all duration-500" 
									style={{ width: `${percentage}%` }}
								/>
							</div>
							<span className="w-8 text-end text-xs font-bold text-text-muted shrink-0">
								{count}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default RatingSummary;
