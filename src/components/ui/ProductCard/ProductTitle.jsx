import React from "react";

export const ProductTitle = ({ title }) => {
	const displayText = typeof title === 'object'
		? (title?.ar || title?.en || "")
		: (title || "");

	return (
		<h3 className="text-xs sm:text-[13.5px] font-bold text-text leading-snug line-clamp-2 min-h-[36px] group-hover:text-primary transition-colors">
			{displayText}
		</h3>
	);
};

export default ProductTitle;
