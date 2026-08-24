import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";

export const ProductTitle = ({ title }) => {
	return (
		<h3 className="text-sm font-bold text-text leading-tight truncate group-hover:text-primary transition-colors">
			{title}
		</h3>
	);
};
