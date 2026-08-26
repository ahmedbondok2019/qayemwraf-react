import React, { useState, useEffect } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductPrice } from "@/components/ui/ProductCard/ProductPrice";

export const StickyAddToCart = ({ product, onAddToCart, showThreshold = 500 }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > showThreshold) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [showThreshold]);

	if (!product) return null;

	return (
		<div 
			className={cn(
				"fixed left-0 right-0 z-50 bg-surface border-border/60 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out",
				// On mobile: sticks to bottom. On desktop: sticks to top.
				"bottom-0 border-t md:bottom-auto md:top-0 md:border-b",
				isVisible 
					? "translate-y-0" 
					: "translate-y-full md:-translate-y-full"
			)}
		>
			<div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
				
				{/* Product Mini Info (Hidden on very small screens) */}
				<div className="hidden sm:flex items-center gap-4 flex-1 min-w-0">
					<img 
						src={product.images?.[0]} 
						alt={product.title?.[language]} 
						className="w-12 h-12 rounded-lg object-cover border border-border"
					/>
					<div className="flex flex-col min-w-0">
						<span className="text-sm font-bold text-text truncate">
							{product.title?.[language]}
						</span>
						<ProductPrice price={product.price} language={language} className="text-sm" />
					</div>
				</div>

				{/* Price for mobile only */}
				<div className="sm:hidden flex-1">
					<ProductPrice price={product.price} language={language} className="text-base" />
				</div>

				{/* Add to Cart Action */}
				<button 
					onClick={onAddToCart}
					className="h-10 px-6 sm:px-8 bg-primary text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-primary-hover active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
				>
					<ShoppingCart className="w-4 h-4" />
					<span>{isRtl ? "طلب الآن" : "Order Now"}</span>
				</button>

			</div>
		</div>
	);
};

export default StickyAddToCart;
