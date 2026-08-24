import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Star, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

import PriceBox from "./PriceBox";
import StockBadge from "./StockBadge";
import TrustBadges from "./TrustBadges";
import MedicalDisclaimer from "./MedicalDisclaimer";

export const ProductInfo = ({ product }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	if (!product) return null;

	return (
		<div className="flex flex-col gap-5 w-full">

			{/* Top Bar: Brand & Badges & Stock */}
			<div className="flex flex-wrap items-center justify-between gap-3">

				{product.badges && product.badges.length > 0 && (
					<div className="flex gap-2">
						{product.badges.map((badge, idx) => (
							<span
								key={idx}
								className={cn(
									"px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest",
									badge.type === "sale" ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20" :
										badge.type === "bestseller" ? "bg-warning text-white shadow-sm shadow-warning/20" :
											badge.type === "new" ? "bg-success text-white shadow-sm shadow-success/20" :
												"bg-surface-2 text-text"
								)}
							>
								{badge.label[language]}
							</span>
						))}
					</div>
				)}
			</div>

			{/* Title */}
			<h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-text leading-tight tracking-tight mt-1">
				{product.title[language]}
			</h1>

			{/* Ratings Summary Mini */}
			{product.reviews && (
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-1">
						{Array.from({ length: 5 }).map((_, i) => (
							<Star
								key={i}
								className={cn(
									"w-5 h-5",
									i < Math.floor(product.reviews.rating)
										? "fill-warning text-warning drop-shadow-sm"
										: "fill-border text-border"
								)}
							/>
						))}
					</div>
					<div className="flex items-center gap-2 text-sm">
						<span className="font-extrabold text-text text-lg">{product.reviews.rating}</span>
						<span className="text-text-secondary font-medium">
							({product.reviews.count} {isRtl ? "تقييم" : "reviews"})
						</span>
					</div>
				</div>
			)}

			{/* Short Description */}
			{product.shortDescription?.[language] && (
				<div 
					className="text-text-secondary text-xs sm:text-sm leading-relaxed my-1 line-clamp-3 prose prose-sm dark:prose-invert"
					dangerouslySetInnerHTML={{ __html: product.shortDescription[language] }}
				/>
			)}
		</div>
	);
};

export default ProductInfo;
