import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ShoppingCart } from "lucide-react";

import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import EmptyCartState from "./components/EmptyCartState";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectCartItems, selectCartSubtotal, selectCartShipping, selectCartDiscount, selectCartTotal, removeFromCart, updateQuantity, applyCoupon } from "@/features/cart/cartSlice";
import { toggleWishlist } from "@/features/wishlist/wishlistSlice";
import { toast } from "sonner";

const Cart = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const dispatch = useAppDispatch();
	const items = useAppSelector(selectCartItems);
	
	const summary = {
		subtotal: useAppSelector(selectCartSubtotal),
		shipping: useAppSelector(selectCartShipping),
		discount: useAppSelector(selectCartDiscount),
		total: useAppSelector(selectCartTotal),
	};
	
	const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Shopping Cart", ar: "سلة المشتريات" } }
	];

	const handleUpdateQuantity = (productId, newQuantity, selectedVariant = null) => {
		dispatch(updateQuantity({ productId, quantity: newQuantity, selectedVariant }));
	};

	const handleRemoveItem = (productId, selectedVariant = null) => {
		dispatch(removeFromCart({ productId, selectedVariant }));
		toast.info(isRtl ? "تم إزالة المنتج من السلة" : "Item removed from cart");
	};

	const handleSaveForLater = (product, selectedVariant = null) => {
		dispatch(toggleWishlist(product));
		handleRemoveItem(product.id || product.productId, selectedVariant);
	};

	const handleApplyCoupon = async (code) => {
		setIsValidatingCoupon(true);
		try {
			const result = await dispatch(applyCoupon(code)).unwrap();
			toast.success(isRtl ? "تم تطبيق الكوبون بنجاح!" : "Coupon applied successfully!");
		} catch (err) {
			console.error("Coupon error:", err);
			toast.error(
				isRtl 
					? (err.message || "الكوبون غير صالح أو منتهي الصلاحية.") 
					: (err.message || "Invalid or expired coupon.")
			);
		} finally {
			setIsValidatingCoupon(false);
		}
	};

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			{/* Header / Title Area */}
			<div className="bg-surface border-b border-border/60 py-8 mb-8 relative z-10">
				<Container>
					<Breadcrumb items={breadcrumbItems} className="mb-4" />
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
							<ShoppingCart className="w-6 h-6" strokeWidth={2.5} />
						</div>
						<h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight">
							{isRtl ? "سلة المشتريات" : "Shopping Cart"}
						</h1>
						{items.length > 0 && (
							<span className="px-3 py-1 bg-surface-2 rounded-full text-sm font-bold text-text-secondary mt-1">
								{items.length} {isRtl ? "عناصر" : "items"}
							</span>
						)}
					</div>
				</Container>
			</div>

			<Container>
				{items.length === 0 ? (
					<EmptyCartState />
				) : (
					<div className="flex flex-col lg:flex-row gap-8 items-start relative">
						
						{/* Left Column: Cart Items */}
						<div className="w-full lg:w-[60%] xl:w-[65%] flex flex-col gap-4 shrink-0">
							{/* Header Row (Desktop only) */}
							<div className="hidden sm:flex items-center justify-between px-4 pb-2 border-b border-border/60">
								<span className="text-sm font-bold text-text-secondary w-full">
									{isRtl ? "المنتج" : "Product"}
								</span>
								<span className="text-sm font-bold text-text-secondary w-[120px] text-end">
									{isRtl ? "الإجمالي" : "Total"}
								</span>
							</div>

							<div className="flex flex-col gap-4">
								{items.map(item => (
									<CartItem 
										key={`${item.productId}-${JSON.stringify(item.selectedVariant)}`}
										item={item}
										onUpdateQuantity={handleUpdateQuantity}
										onRemove={handleRemoveItem}
										onSaveForLater={handleSaveForLater}
									/>
								))}
							</div>
						</div>

						{/* Right Column: Order Summary */}
						<div className="w-full lg:w-[40%] xl:w-[35%] lg:sticky lg:top-24 z-10">
							<CartSummary 
								summary={summary}
								onApplyCoupon={handleApplyCoupon}
								isValidatingCoupon={isValidatingCoupon}
							/>
						</div>

					</div>
				)}
			</Container>
		</div>
	);
};

export default Cart;
