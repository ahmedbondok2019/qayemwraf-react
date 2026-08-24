import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Heart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const EmptyWishlistState = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-surface border border-border/50 rounded-2xl w-full">
			<div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 relative">
				<Heart className="w-10 h-10 text-primary opacity-80" strokeWidth={2} />
				<div className="absolute -bottom-2 -right-2 w-10 h-10 bg-surface rounded-full flex items-center justify-center shadow-sm">
					<div className="w-8 h-8 bg-surface-2 rounded-full flex items-center justify-center font-bold text-text-secondary text-sm">
						0
					</div>
				</div>
			</div>
			
			<h3 className="text-2xl font-extrabold text-text mb-3">
				{isRtl ? "قائمة المفضلة فارغة" : "Your Wishlist is Empty"}
			</h3>
			
			<p className="text-text-secondary max-w-sm mb-8 leading-relaxed">
				{isRtl 
					? "لم تقم بحفظ أي منتجات في قائمتك المفضلة حتى الآن. تصفح المتجر واضغط على علامة القلب لحفظ المنتجات التي تعجبك." 
					: "You haven't saved any items to your wishlist yet. Browse our store and tap the heart icon to save items you love."}
			</p>

			<Link 
				to="/products"
				className="flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-[0.98] transition-all"
			>
				{isRtl ? "تصفح المنتجات" : "Browse Products"}
				<ArrowRight className={cn("w-5 h-5", isRtl && "scale-x-[-1]")} />
			</Link>
		</div>
	);
};

export default EmptyWishlistState;
