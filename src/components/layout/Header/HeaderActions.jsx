import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { useAppSelector } from "@/app/store/hooks";
import { selectCartCount } from "@/features/cart/cartSlice";
import { selectWishlistCount } from "@/features/wishlist/wishlistSlice";

/**
 * HeaderActions Component
 * Icon + Text buttons for Wishlist and Cart (matching reference design).
 */

const ActionButton = ({ to, icon, label, count, className }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	
	const content = (
		<>
			<div className="relative">
				<Icon name={icon} size="lg" className="text-text group-hover:text-primary transition-colors" />
				{count > 0 && (
					<span className="absolute -top-2 -end-2 flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-primary text-white text-[11px] font-bold leading-none shadow-sm">
						{count > 99 ? "99+" : count}
					</span>
				)}
			</div>
			<span className="font-semibold text-text group-hover:text-primary transition-colors hidden xl:block">
				{label}
			</span>
		</>
	);

	const baseClass = cn(
		"flex items-center gap-2 p-2 rounded-[14px] text-text-secondary hover:text-primary transition-colors duration-200 group select-none",
		className
	);

	return (
		<LocalizedLink to={to} className={baseClass} aria-label={label}>
			{content}
		</LocalizedLink>
	);
};

export const HeaderActions = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	
	const cartCount = useAppSelector(selectCartCount);
	const wishlistCount = useAppSelector(selectWishlistCount);

	return (
		<div className="flex items-center gap-2 lg:gap-6 shrink-0">
			{/* Wishlist */}
			<ActionButton
				to="/wishlist"
				icon="Heart"
				label={isRtl ? "المفضلة" : "Wishlist"}
				count={wishlistCount}
			/>

			{/* Cart */}
			<ActionButton
				to="/cart"
				icon="ShoppingCart"
				label={isRtl ? "طلبات التسعير" : "Quote"}
				count={cartCount}
			/>
		</div>
	);
};

export default HeaderActions;
