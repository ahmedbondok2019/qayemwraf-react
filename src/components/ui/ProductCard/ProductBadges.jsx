import React from "react";
import { cn } from "@/lib/utils";

export const ProductBadges = ({ badges = [], isOutOfStock, isRtl, language }) => {
	const displayBadges = [...badges];
	
	if (isOutOfStock) {
		displayBadges.unshift({ type: "out_of_stock", label: { en: "Out of Stock", ar: "نفذت الكمية" } });
	}

	if (!displayBadges.length) return null;

	return (
		<div className="flex items-start flex-wrap gap-1.5">
			{displayBadges.map((badge, idx) => (
				<span 
					key={idx} 
					className={cn(
						"text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow-sm backdrop-blur-md",
						badge.type === "new" && "bg-success text-white",
						badge.type === "bestseller" && "bg-warning text-white",
						badge.type === "sale" && "bg-orange-500 text-white shadow-sm shadow-orange-500/20",
						badge.type === "out_of_stock" && "bg-slate-800 text-white"
					)}
				>
					{badge.label?.[language] || badge.label?.en}
				</span>
			))}
		</div>
	);
};
