import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { PRODUCT_CARD_VARIANTS } from "./product-card.constants";
import { useProductCard } from "./hooks/useProductCard";
import { cn } from "@/lib/utils";

import { } from "react-router-dom";
import { ProductImage } from "./ProductImage";
import { ProductBadges } from "./ProductBadges";
import { ProductQuickActions } from "./ProductQuickActions";
import { ProductTitle } from "./ProductTitle";
import { ProductMeta } from "./ProductMeta";
import { ProductRating } from "./ProductRating";
import { ProductPrice } from "./ProductPrice";
import { ProductStatus } from "./ProductStatus";
import { ProductActions } from "./ProductActions";
import { calculateDiscount } from "./utils/product-card.helpers";

export const ProductCard = ({ product, variant = PRODUCT_CARD_VARIANTS.DEFAULT, className }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	
	const {
		isHovered,
		isWishlisted,
		isAddingToCart,
		isOutOfStock,
		stockState,
		handleMouseEnter,
		handleMouseLeave,
		toggleWishlist,
		handleAddToCart
	} = useProductCard(product);

	if (!product) return null;

	const discount = calculateDiscount(product.price?.current, product.price?.original);
	const targetSlug = product.slug || product._apiOriginal?.slug || product.id?.toString().replace('prod-', '');

	return (
		<LocalizedLink 
			to={`/products/${targetSlug}`}
			className={cn(
				"group relative flex flex-col w-full bg-surface border border-orange-500/20 rounded-2xl overflow-hidden transition-all duration-300 hover:border-orange-500/45 hover:shadow-floating outline-none",
				variant === PRODUCT_CARD_VARIANTS.COMPACT && "p-2",
				variant === PRODUCT_CARD_VARIANTS.HORIZONTAL && "flex-row",
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{/* Top Image Section */}
			<div className="relative">
				<div className={cn("absolute top-3 z-10 max-w-[60%]", isRtl ? "right-3" : "left-3")}>
					<ProductBadges badges={product.badges} isOutOfStock={isOutOfStock} isRtl={isRtl} language={language} />
				</div>
				{false && (
					<ProductQuickActions 
						isWishlisted={isWishlisted} 
						onToggleWishlist={toggleWishlist} 
						isRtl={isRtl} 
					/>
				)}
				<ProductImage 
					image={product.image} 
					hoverImage={product.hoverImage} 
					title={product.title?.[language] || product.title || product.name} 
					isHovered={isHovered} 
					isOutOfStock={isOutOfStock}
				/>
			</div>

			{/* Content Section */}
			<div className="flex flex-col flex-grow p-4 pt-3">
				<ProductTitle title={product.title?.[language] || product.title || product.name} />
				
				{/* Rating & Badges */}
				<div className="flex items-center justify-between gap-2 mt-1.5 min-h-[20px]">
					{product.reviews ? (
						<ProductRating rating={product.reviews.rating} count={product.reviews.count} isRtl={isRtl} />
					) : <div />}
					{discount > 0 ? (
						<span className="bg-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-[6px]">
							{isRtl ? `خصم ${discount}%` : `${discount}% OFF`}
						</span>
					) : <div />}
				</div>

				{variant === PRODUCT_CARD_VARIANTS.MEDICAL && (
					<ProductMeta sku={product.meta?.sku} warranty={product.meta?.warranty?.[language]} delivery={product.meta?.delivery?.[language]} isRtl={isRtl} />
				)}
				
				<div className="mt-auto pt-3">
					<ProductPrice price={product.price} language={language} />
					{/* Status removed from here to maintain consistent card height */}
					<ProductActions 
						isOutOfStock={isOutOfStock} 
						isAddingToCart={isAddingToCart} 
						onAddToCart={handleAddToCart} 
						isRtl={isRtl}
					/>
				</div>
			</div>
		</LocalizedLink>
	);
};

export default ProductCard;
