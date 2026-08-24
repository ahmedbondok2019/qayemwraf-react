import React from "react";
import { Star } from "lucide-react";

export const ProductRating = ({ rating, count, isRtl }) => {
	if (typeof rating !== "number") return null;

	// Fill array for 5 stars
	const stars = Array.from({ length: 5 }).map((_, i) => i < Math.floor(rating));

	return (
		<div className="flex items-center gap-1.5">
			<div className="flex items-center">
				{stars.map((isFilled, idx) => (
					<Star 
						key={idx} 
						className={`w-3.5 h-3.5 ${isFilled ? "fill-warning text-warning" : "fill-border text-border"}`} 
					/>
				))}
			</div>
			<span className="text-xs font-bold text-text mt-0.5">{rating.toFixed(1)}</span>
			{count > 0 && (
				<span className="text-[10px] font-medium text-text-muted mt-0.5">({count})</span>
			)}
		</div>
	);
};
