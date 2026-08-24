import React from "react";

export const ProductBrand = ({ brand }) => {
	if (!brand) return null;
	return (
		<span className="text-[11px] font-bold text-primary tracking-wider uppercase mb-1 block">
			{brand}
		</span>
	);
};
