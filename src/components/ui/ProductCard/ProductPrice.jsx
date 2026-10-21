import React from "react";
import { formatCurrency } from "./utils/product-card.helpers";
import { ProductTaxBadge } from "./ProductTaxBadge";
import { cn } from "@/lib/utils";

export const ProductPrice = ({
	price,
	isTaxIncluded: propIsTaxIncluded,
	language,
	showTaxBadge = true,
	className,
}) => {
	if (!price) return null;

	const currentFormatted = formatCurrency(price.current, "EGP", language);
	const oldFormatted = price.original ? formatCurrency(price.original, "EGP", language) : null;

	// Resolve isTaxIncluded safely from prop or price object
	const isTax = propIsTaxIncluded !== undefined
		? propIsTaxIncluded
		: (price.isTaxIncluded !== undefined
			? price.isTaxIncluded
			: (price.is_tax_included !== undefined ? price.is_tax_included : price.tax_included));

	const hasTaxInfo = showTaxBadge && isTax !== undefined && isTax !== null;
	const isIncluded = isTax === true || isTax === 1 || isTax === "1";

	return (
		<div className={cn("flex flex-col mt-1", className)}>
			<div className="flex items-center gap-2 flex-wrap">
				<span className="text-lg font-extrabold text-text leading-none">
					{currentFormatted}
				</span>
				{oldFormatted && (
					<span className="text-xs font-medium text-text-muted line-through decoration-text-muted/50">
						{oldFormatted}
					</span>
				)}
				{hasTaxInfo && (
					<ProductTaxBadge
						isTaxIncluded={isIncluded}
						language={language}
						size="xs"
					/>
				)}
			</div>
		</div>
	);
};

export default ProductPrice;
