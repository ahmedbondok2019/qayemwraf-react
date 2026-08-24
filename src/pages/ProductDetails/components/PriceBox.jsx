import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { formatCurrency } from "@/components/ui/ProductCard/utils/product-card.helpers";
import { cn } from "@/lib/utils";

export const PriceBox = ({ price, className }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	if (!price) return null;

	const hasDiscount = price.discount && price.discount > 0;
	const finalPrice = hasDiscount ? price.current : price.original || price.current;

	const finalFormatted = formatCurrency(finalPrice, "EGP", language);
	const originalFormatted = price.original ? formatCurrency(price.original, "EGP", language) : null;

	return (
		<div className={cn("p-4 bg-surface rounded-2xl border border-border shadow-sm", className)}>
			<div className="flex flex-col gap-1">
				{/* Discount Badge & Original Price Row */}
				{hasDiscount && (
					<div className="flex items-center gap-3 mb-1">
						<span className="px-2 py-0.5 bg-danger/10 text-danger text-xs font-bold rounded-md">
							{isRtl ? `خصم ${price.discount}%` : `Save ${price.discount}%`}
						</span>
						<span className="text-text-muted line-through text-sm font-medium">
							{originalFormatted}
						</span>
					</div>
				)}
				
				{/* Main Price */}
				<div className="flex items-baseline gap-1.5">
					<span className="text-2xl sm:text-3xl font-extrabold text-primary">
						{finalFormatted}
					</span>
				</div>
				
				{/* VAT Info */}
				<span className="text-xs text-text-secondary mt-2">
					{isRtl ? "السعر يشمل ضريبة القيمة المضافة (VAT)" : "Price includes VAT"}
				</span>
			</div>
		</div>
	);
};

export default PriceBox;
