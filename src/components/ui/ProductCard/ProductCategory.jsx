import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";

export const ProductCategory = ({ category, link }) => {
	if (!category) return null;
	return (
		<LocalizedLink to={link || "#"} className="text-[11px] font-medium text-text-muted hover:text-primary transition-colors mb-1 block">
			{category}
		</LocalizedLink>
	);
};
