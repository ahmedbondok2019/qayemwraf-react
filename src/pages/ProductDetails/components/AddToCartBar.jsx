import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ShoppingCart, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export const AddToCartBar = ({ 
	onAddToCart, 
	onBuyNow,
	isWishlisted, 
	onToggleWishlist,
	disabled = false,
	className
}) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className={cn("flex flex-col gap-3 w-full", className)}>
			{/* Buy Buttons */}
			<div className="flex flex-col sm:flex-row gap-3 w-full">
				{/* Add to Cart */}
				<button
					onClick={onAddToCart}
					disabled={disabled}
					className="flex-1 flex items-center justify-center gap-3 h-14 bg-primary text-white font-extrabold text-base sm:text-lg rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
				>
					<ShoppingCart className={cn("w-5 h-5 sm:w-6 sm:h-6", isRtl && "scale-x-[-1]")} strokeWidth={2.5} />
					<span className="truncate">{isRtl ? "أضف إلى السلة" : "Add to Cart"}</span>
				</button>

				{/* Buy Now */}
				<button
					onClick={onBuyNow}
					disabled={disabled}
					className="flex-1 flex items-center justify-center gap-3 h-14 bg-orange-500 text-white font-extrabold text-base sm:text-lg rounded-xl shadow-lg shadow-orange-500/20 hover:bg-orange-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
				>
					<span className="truncate">{isRtl ? "اشترِ الآن" : "Buy Now"}</span>
				</button>
			</div>

			{/* Wishlist */}
			<button
				onClick={onToggleWishlist}
				className={cn(
					"flex items-center justify-center gap-2 w-full h-12 rounded-xl border transition-all active:scale-95 font-bold text-sm",
					isWishlisted 
						? "border-danger bg-danger/10 text-danger" 
						: "border-border/60 bg-surface hover:bg-surface-2 text-text-secondary hover:text-danger"
				)}
			>
				<Heart className={cn("w-4 h-4 transition-transform", isWishlisted && "fill-danger scale-110")} />
				{isRtl ? "إضافة للمفضلة" : "Add to Wishlist"}
			</button>
		</div>
	);
};

export default AddToCartBar;
