import React from "react";
import { cn } from "@/lib/utils";

export const ProductCardSkeleton = ({ layout = "vertical", className }) => {
	const isHorizontal = layout === "horizontal";

	return (
		<div className={cn(
			"flex w-full bg-surface border border-border rounded-2xl overflow-hidden",
			isHorizontal ? "flex-col sm:flex-row" : "flex-col",
			className
		)}>
			{/* Image Skeleton */}
			<div className={cn(
				"bg-surface-2 animate-pulse shrink-0",
				isHorizontal ? "w-full sm:w-64 sm:h-auto aspect-[4/3] sm:aspect-square" : "w-full aspect-[4/3]"
			)} />
			
			{/* Content Skeleton */}
			<div className="flex flex-col flex-grow p-4 gap-3">
				{/* Brand Skeleton */}
				<div className="w-1/4 h-3 bg-surface-2 rounded-full animate-pulse" />
				
				{/* Category Skeleton */}
				<div className="w-1/3 h-3 bg-surface-2 rounded-full animate-pulse" />
				
				{/* Title Skeleton (2 lines) */}
				<div className="flex flex-col gap-1.5">
					<div className="w-full h-4 bg-surface-2 rounded-full animate-pulse" />
					<div className="w-4/5 h-4 bg-surface-2 rounded-full animate-pulse" />
				</div>
				
				{/* Rating Skeleton */}
				<div className="flex items-center justify-between gap-2 mt-1.5 min-h-[20px]">
					<div className="flex gap-1">
						{Array.from({ length: 5 }).map((_, i) => (
							<div key={i} className="w-3.5 h-3.5 bg-surface-2 rounded-full animate-pulse" />
						))}
					</div>
					<div className="w-12 h-5 bg-surface-2 rounded-full animate-pulse" />
				</div>
				
				{/* Price & Button Skeleton */}
				<div className="mt-auto pt-3 flex flex-col gap-4">
					<div className="w-1/3 h-6 bg-surface-2 rounded-full animate-pulse" />
					<div className="flex items-center gap-2">
						<div className="w-10 h-10 bg-surface-2 rounded-[8px] animate-pulse shrink-0 hidden sm:block" />
						<div className="flex-grow h-10 bg-surface-2 rounded-[8px] animate-pulse" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCardSkeleton;
