import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";

export const ProductTitle = ({ title }) => {
	const { language } = useLanguage();

	let displayText = "";
	if (typeof title === "object" && title !== null) {
		displayText = title[language] || title.en || title.ar || "";
	} else {
		displayText = title || "";
	}

	return (
		<h3 className="text-xs sm:text-[13.5px] font-bold text-text leading-snug line-clamp-2 min-h-[36px] group-hover:text-primary transition-colors">
			{displayText}
		</h3>
	);
};

export default ProductTitle;
