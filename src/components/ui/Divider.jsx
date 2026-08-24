import React from "react";

export const Divider = ({
	orientation = "horizontal",
	thickness = "thin",
	className = "",
	...props
}) => {
	const isHorizontal = orientation === "horizontal";
	
	const baseClass = isHorizontal 
		? "w-full border-t" 
		: "h-full border-l self-stretch";

	const borderStyle = thickness === "medium" 
		? "border-border/40 border-2" 
		: "border-border/20 border-1";

	return (
		<hr
			className={`${baseClass} ${borderStyle} ${className}`}
			{...props}
		/>
	);
};

export default Divider;
