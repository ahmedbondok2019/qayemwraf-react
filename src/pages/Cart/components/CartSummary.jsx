import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ShieldCheck, Tag, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import LocalizedLink from "@/components/ui/LocalizedLink";

export const CartSummary = ({ summary, onApplyCoupon, isValidatingCoupon }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const [couponCode, setCouponCode] = useState("");

	return (
		<div className="flex flex-col gap-6 p-6 bg-surface rounded-2xl border border-border/50 sticky top-24 shadow-sm">
			<h2 className="text-xl font-extrabold text-text">
				{isRtl ? "ملخص الطلب" : "Order Summary"}
			</h2>

			{/* Coupon Code */}
			<div className="flex flex-col gap-2">
				<label className="text-sm font-bold text-text-secondary flex items-center gap-2">
					<Tag className="w-4 h-4" />
					{isRtl ? "كوبون الخصم" : "Discount Coupon"}
				</label>
				<div className="flex items-center gap-2">
					<input 
						type="text" 
						value={couponCode}
						onChange={(e) => setCouponCode(e.target.value)}
						placeholder={isRtl ? "أدخل الكود هنا" : "Enter code here"}
						className="flex-1 h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary uppercase transition-all"
					/>
					<button 
						onClick={() => onApplyCoupon(couponCode)}
						disabled={!couponCode.trim() || isValidatingCoupon}
						className="h-12 px-6 bg-text text-surface font-bold rounded-xl hover:bg-text-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{isRtl ? "تطبيق" : "Apply"}
					</button>
				</div>
			</div>

			<hr className="border-border/50" />

			{/* Totals */}
			<div className="flex flex-col gap-4 text-sm font-medium text-text-secondary">
				<div className="flex justify-between items-center">
					<span>{isRtl ? "المجموع الفرعي" : "Subtotal"}</span>
					<span className="font-bold text-text">{summary.subtotal} {isRtl ? "ج.م" : "EGP"}</span>
				</div>
				
				<div className="flex justify-between items-center">
					<span>{isRtl ? "الشحن المتوقع" : "Estimated Shipping"}</span>
					<span className="font-bold text-text">{summary.shipping} {isRtl ? "ج.م" : "EGP"}</span>
				</div>

				{summary.discount > 0 && (
					<div className="flex justify-between items-center text-success">
						<span>{isRtl ? "الخصم" : "Discount"}</span>
						<span className="font-bold">-{summary.discount} {isRtl ? "ج.م" : "EGP"}</span>
					</div>
				)}
			</div>

			<hr className="border-border/50" />

			{/* Grand Total */}
			<div className="flex justify-between items-end">
				<span className="text-base font-bold text-text">
					{isRtl ? "الإجمالي" : "Grand Total"}
				</span>
				<div className="flex flex-col items-end">
					<span className="text-2xl font-extrabold text-primary">
						{summary.total} {isRtl ? "ج.م" : "EGP"}
					</span>
					<span className="text-xs text-text-muted mt-1">
						{isRtl ? "شامل ضريبة القيمة المضافة" : "Includes VAT"}
					</span>
				</div>
			</div>

			{/* Checkout Button */}
			<LocalizedLink 
				to="/checkout"
				className="w-full h-14 mt-2 flex items-center justify-center gap-3 bg-primary text-white font-extrabold text-lg rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-[0.98] transition-all"
			>
				{isRtl ? "متابعة الشراء" : "Proceed to Checkout"}
				<ArrowRight className={cn("w-5 h-5", isRtl && "scale-x-[-1]")} />
			</LocalizedLink>

			{/* Secure Checkout Badge */}
			<div className="flex items-center justify-center gap-2 text-xs font-bold text-text-muted mt-2">
				<ShieldCheck className="w-4 h-4 text-success" />
				{isRtl ? "عملية دفع آمنة وموثوقة" : "Secure encrypted checkout"}
			</div>
		</div>
	);
};

export default CartSummary;
