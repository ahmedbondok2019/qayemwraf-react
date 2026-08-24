import React, { useState, useEffect } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { formatCurrency } from "@/components/ui/ProductCard/utils/product-card.helpers";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export const MobileBottomBar = ({ price, onAddToCart, disabled = false, showThreshold = 800 }) => {
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

	if (!isVisible) return null;

	const hasDiscount = price?.discount && price.discount > 0;
	const finalPrice = hasDiscount ? price.current : price?.original || price?.current;
	const finalFormatted = formatCurrency(finalPrice, "EGP", language);

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden transform transition-transform duration-300 translate-y-0">
			<div className="bg-surface/90 backdrop-blur-md border-t border-border/60 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-4 py-3 pb-safe">
				<div className="flex items-center justify-between gap-4 max-w-md mx-auto">
					
					{/* Price Info */}
					<div className="flex flex-col">
						<span className="text-xs font-bold text-text-secondary">
							{isRtl ? "السعر الإجمالي" : "Total Price"}
						</span>
						<div className="flex items-baseline gap-1">
							<span className="text-xl font-extrabold text-primary">{finalFormatted}</span>
						</div>
					</div>

					{/* Buy Button */}
					<button
						onClick={onAddToCart}
						disabled={disabled}
						className="flex-1 max-w-[200px] flex items-center justify-center gap-2 h-12 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-hover active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
					>
						<ShoppingCart className={cn("w-5 h-5", isRtl && "scale-x-[-1]")} />
						{isRtl ? "أضف للسلة" : "Add to Cart"}
					</button>

				</div>
			</div>
		</div>
	);
};

export default MobileBottomBar;
