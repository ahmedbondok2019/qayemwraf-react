import React from "react";
import { formatCurrency } from "./utils/product-card.helpers";
import { cn } from "@/lib/utils";

export const ProductPrice = ({ price, language }) => {
	if (!price) return null;

	const currentFormatted = formatCurrency(price.current, "EGP", language);
	const oldFormatted = price.original ? formatCurrency(price.original, "EGP", language) : null;

	return (
		<div className="flex flex-col mt-1">
			<div className="flex items-end gap-2 flex-wrap">
				<span className="text-lg font-extrabold text-text leading-none truncate max-w-full">
					{currentFormatted}
				</span>
				{oldFormatted && (
					<span className="text-xs font-medium text-text-muted line-through decoration-text-muted/50">
						{oldFormatted}
					</span>
				)}
			</div>
		</div>
	);
};
