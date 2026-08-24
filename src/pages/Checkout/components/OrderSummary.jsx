import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ShieldCheck, Tag } from "lucide-react";
import { useAppSelector } from "@/app/store/hooks";
import { 
	selectCartItems, 
	selectCartSubtotal, 
	selectCartShipping, 
	selectCartDiscount, 
	selectCartTotal 
} from "@/features/cart/cartSlice";
import { useCheckoutSummary, useApplyCouponCheckout } from "@/hooks/queries/useCheckoutSummary";
import { cn } from "@/lib/utils";

export const OrderSummary = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	
	const items = useAppSelector(selectCartItems);
	const [couponCode, setCouponCode] = useState("");
	const applyCouponMutation = useApplyCouponCheckout();
	
	// Client calculated values as fallback
	const clientSubtotal = useAppSelector(selectCartSubtotal);
	const clientShipping = useAppSelector(selectCartShipping);
	const clientDiscount = useAppSelector(selectCartDiscount);
	const clientTotal = useAppSelector(selectCartTotal);

	// Fetch dynamic summary from backend API
	const { data: apiSummary } = useCheckoutSummary();

	const summary = {
		subtotal: apiSummary?.subtotal !== undefined ? apiSummary.subtotal : clientSubtotal,
		shipping: apiSummary?.shipping_cost !== undefined ? apiSummary.shipping_cost : clientShipping,
		discount: apiSummary?.coupon_discount !== undefined ? apiSummary.coupon_discount : clientDiscount,
		total: apiSummary?.total !== undefined ? apiSummary.total : clientTotal,
	};

	const handleApplyCoupon = async () => {
		if (!couponCode.trim()) return;
		try {
			await applyCouponMutation.mutateAsync(couponCode);
			alert(isRtl ? "تم تطبيق الكوبون بنجاح!" : "Coupon applied successfully!");
		} catch (err) {
			console.error("Coupon error:", err);
			alert(
				isRtl 
					? (err.response?.data?.message || "الكوبون غير صالح أو منتهي الصلاحية.") 
					: (err.response?.data?.message || "Invalid or expired coupon.")
			);
		}
	};

	return (
		<div className="flex flex-col gap-6 p-6 bg-surface rounded-[24px] border border-border/80 sticky top-8 shadow-card hover:shadow-floating transition-all duration-300">
			<div className="flex items-center justify-between pb-1 border-b border-border/40">
				<h2 className="text-lg font-black text-text tracking-tight">
					{isRtl ? "ملخص الطلب" : "Order Summary"}
				</h2>
				<span className="text-[12px] font-bold text-text-muted px-2.5 py-1 bg-surface-2 rounded-full shadow-xs">
					{items.length} {isRtl ? "عناصر" : "items"}
				</span>
			</div>

			{/* Mini Item List */}
			<div className="flex flex-col gap-2.5 max-h-[290px] overflow-y-auto pr-1 pl-1 custom-scrollbar">
				{items.map(item => {
					const prod = item.product || {};
					return (
						<div 
							key={item.id || item.productId} 
							className="flex gap-4 p-2 hover:bg-surface-2/40 rounded-xl transition-all duration-200 group/item border border-transparent hover:border-border/40"
						>
							<div className="w-16 h-16 rounded-xl border border-border/40 overflow-hidden shrink-0 bg-white relative flex items-center justify-center shadow-xs">
								<img 
									src={prod.image} 
									alt={prod.title?.[language]} 
									className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover/item:scale-105" 
								/>
								<span className={cn(
									"absolute -top-1.5 w-5 h-5 bg-text text-surface rounded-full flex items-center justify-center text-[10px] font-extrabold shadow-sm border border-surface z-10",
									isRtl ? "-left-1.5" : "-right-1.5"
								)}>
									{item.quantity}
								</span>
							</div>
							<div className="flex flex-col flex-1 min-w-0 justify-center">
								<h4 className="font-bold text-[13px] text-text-secondary leading-snug line-clamp-2 group-hover/item:text-primary transition-colors">
									{prod.title?.[language]}
								</h4>
								<span className="font-extrabold text-primary text-sm mt-1">
									{item.unitPrice} {isRtl ? "ج.م" : "EGP"}
								</span>
							</div>
						</div>
					);
				})}
			</div>

			<hr className="border-border/40" />

			{/* Totals */}
			<div className="flex flex-col gap-3.5 text-[13px] font-semibold text-text-secondary px-1">
				<div className="flex justify-between items-center">
					<span className="text-text-muted">{isRtl ? "المجموع الفرعي" : "Subtotal"}</span>
					<span className="font-extrabold text-text">{summary.subtotal} {isRtl ? "ج.م" : "EGP"}</span>
				</div>
				
				<div className="flex justify-between items-center">
					<span className="text-text-muted">{isRtl ? "رسوم الشحن" : "Shipping"}</span>
					<span className="font-extrabold text-text">
						{summary.shipping === 0 ? (
							<span className="text-success font-extrabold">{isRtl ? "مجاني" : "Free"}</span>
						) : (
							`${summary.shipping} ${isRtl ? "ج.م" : "EGP"}`
						)}
					</span>
				</div>

				{summary.discount > 0 && (
					<div className="flex justify-between items-center text-success">
						<span>{isRtl ? "الخصم" : "Discount"}</span>
						<span className="font-extrabold">-{summary.discount} {isRtl ? "ج.م" : "EGP"}</span>
					</div>
				)}
			</div>

			{/* Coupon Code Input */}
			<div className="flex flex-col gap-2 p-1 border-t border-border/40 pt-4">
				<label className="text-xs font-bold text-text-secondary flex items-center gap-1.5">
					<Tag className="w-3.5 h-3.5 text-text-muted" />
					{isRtl ? "كوبون الخصم" : "Discount Coupon"}
				</label>
				<div className="flex items-center gap-2">
					<input 
						type="text" 
						value={couponCode}
						onChange={(e) => setCouponCode(e.target.value)}
						placeholder={isRtl ? "كود الخصم" : "Coupon code"}
						className="flex-1 h-10 px-3 bg-surface-2 border border-border/60 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary uppercase text-xs transition-all font-semibold"
					/>
					<button 
						onClick={handleApplyCoupon}
						disabled={!couponCode.trim() || applyCouponMutation.isPending}
						className="h-10 px-4 bg-text text-surface text-xs font-extrabold rounded-xl hover:bg-text-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[70px]"
					>
						{applyCouponMutation.isPending ? (
							<div className="w-3.5 h-3.5 border-2 border-surface border-t-transparent rounded-full animate-spin" />
						) : (
							isRtl ? "تطبيق" : "Apply"
						)}
					</button>
				</div>
			</div>

			{/* Grand Total Container */}
			<div className="p-4 bg-primary/5 dark:bg-primary/10 border border-primary/10 rounded-2xl flex justify-between items-center transition-all">
				<div className="flex flex-col">
					<span className="text-xs font-bold text-text-muted mb-0.5">
						{isRtl ? "الإجمالي المستحق" : "Total Amount"}
					</span>
					<span className="text-[10px] font-bold text-text-muted/70">
						{isRtl ? "شامل ضريبة القيمة المضافة" : "Includes VAT"}
					</span>
				</div>
				<span className="text-2xl font-black text-primary tracking-tight">
					{summary.total} {isRtl ? "ج.م" : "EGP"}
				</span>
			</div>

			{/* Secure Checkout Badge */}
			<div className="flex items-center justify-center gap-2 text-[11px] font-bold text-text-muted/80 p-2.5 bg-success/5 border border-success/10 rounded-xl transition-colors">
				<ShieldCheck className="w-4.5 h-4.5 text-success" />
				{isRtl ? "معلوماتك مشفرة ومحمية بالكامل" : "Fully encrypted and secure"}
			</div>
		</div>
	);
};

export default OrderSummary;
