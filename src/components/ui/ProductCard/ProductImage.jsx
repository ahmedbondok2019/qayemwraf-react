import React from "react";
import { cn } from "@/lib/utils";

export const ProductImage = ({ image, hoverImage, title, isHovered, isOutOfStock }) => {
	return (
		<div className={cn(
			"relative w-full aspect-square bg-surface-2 p-4 flex items-center justify-center overflow-hidden mix-blend-multiply dark:mix-blend-normal dark:bg-white",
			isOutOfStock && "grayscale opacity-80"
		)}>
			<img
				src={image || "https://placehold.co/400x400?text=EG+Medical"}
				alt={title || "Product Image"}
				className={cn(
					"object-contain w-full h-full transition-transform duration-500",
					isHovered ? "scale-105" : "scale-100"
				)}
			/>
			{hoverImage && (
				<img
					src={hoverImage}
					alt={title}
					className={cn(
						"absolute inset-0 object-contain w-full h-full p-4 transition-opacity duration-500 bg-surface-2 dark:bg-white",
						isHovered ? "opacity-100" : "opacity-0"
					)}
				/>
			)}
		</div>
	);
};
