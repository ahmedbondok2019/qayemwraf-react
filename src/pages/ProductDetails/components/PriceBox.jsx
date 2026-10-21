import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { formatCurrency } from "@/components/ui/ProductCard/utils/product-card.helpers";
import { ProductTaxBadge } from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";

export const PriceBox = ({ price, className }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	if (!price) return null;

	const hasDiscount = price.discount && price.discount > 0;
	const finalPrice = hasDiscount ? price.current : price.original || price.current;

	const finalFormatted = formatCurrency(finalPrice, "EGP", language);
	const originalFormatted = price.original ? formatCurrency(price.original, "EGP", language) : null;

	// Resolve isTaxIncluded safely
	const isTax = price.isTaxIncluded !== undefined 
		? price.isTaxIncluded 
		: (price.is_tax_included !== undefined ? price.is_tax_included : price.tax_included);
	const hasTaxInfo = isTax !== undefined && isTax !== null;
	const isIncluded = isTax === true || isTax === 1 || isTax === "1";

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
				
				{/* Main Price & Tax Badge */}
				<div className="flex items-center gap-2.5 flex-wrap">
					<span className="text-2xl sm:text-3xl font-extrabold text-primary">
						{finalFormatted}
					</span>
					{hasTaxInfo && (
						<ProductTaxBadge 
							isTaxIncluded={isIncluded} 
							language={language}
							size="sm"
						/>
					)}
				</div>
				
				{/* VAT Info subtitle */}
				{hasTaxInfo ? (
					<span className="text-xs text-text-secondary mt-1">
						{isIncluded
							? (isRtl ? "السعر يشمل ضريبة القيمة المضافة (VAT)" : "Price includes Value Added Tax (VAT)")
							: (isRtl ? "السعر لا يشمل ضريبة القيمة المضافة (تضاف عند الفاتورة)" : "Price excludes Value Added Tax (VAT)")}
					</span>
				) : (
					<span className="text-xs text-text-secondary mt-1">
						{isRtl ? "السعر يشمل ضريبة القيمة المضافة (VAT)" : "Price includes VAT"}
					</span>
				)}
			</div>
		</div>
	);
};

export default PriceBox;
