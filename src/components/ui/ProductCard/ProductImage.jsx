import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { resolveImageUrl, FALLBACK_IMAGES } from "@/lib/imageUtils";

export const ProductImage = ({ image, hoverImage, title, isHovered, isOutOfStock }) => {
	const [imgSrc, setImgSrc] = useState(() => resolveImageUrl(image, FALLBACK_IMAGES.PRODUCT));
	const [hoverSrc, setHoverSrc] = useState(() => (hoverImage ? resolveImageUrl(hoverImage, FALLBACK_IMAGES.PRODUCT) : null));

	React.useEffect(() => {
		setImgSrc(resolveImageUrl(image, FALLBACK_IMAGES.PRODUCT));
	}, [image]);

	React.useEffect(() => {
		setHoverSrc(hoverImage ? resolveImageUrl(hoverImage, FALLBACK_IMAGES.PRODUCT) : null);
	}, [hoverImage]);

	return (
		<div className={cn(
			"relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-900/60 flex items-center justify-center overflow-hidden",
			isOutOfStock && "grayscale opacity-80"
		)}>
			<img
				src={imgSrc}
				alt={title || "Product Image"}
				onError={() => setImgSrc(FALLBACK_IMAGES.PRODUCT)}
				className={cn(
					"w-full h-full object-cover transition-transform duration-700 ease-out",
					isHovered ? "scale-108" : "scale-100"
				)}
				loading="lazy"
			/>
			{hoverSrc && (
				<img
					src={hoverSrc}
					alt={title || "Product Image Hover"}
					onError={() => setHoverSrc(null)}
					className={cn(
						"absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
						isHovered ? "opacity-100" : "opacity-0"
					)}
					loading="lazy"
				/>
			)}
			{/* Subtle bottom shadow overlay for smooth blend into card */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none opacity-60" />
		</div>
	);
};

export default ProductImage;
