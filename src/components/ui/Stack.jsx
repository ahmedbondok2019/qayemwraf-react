import React from "react";

export const Stack = ({
	as: Component = "div",
	direction = "col",
	gap = 4,
	align = "stretch",
	justify = "start",
	className = "",
	children,
	...props
}) => {
	const directionClass = direction === "row" ? "flex flex-row" : "flex flex-col";
	const alignMap = {
		start: "items-start",
		center: "items-center",
		end: "items-end",
		stretch: "items-stretch",
	};

	const justifyMap = {
		start: "justify-start",
		center: "justify-center",
		end: "justify-end",
		between: "justify-between",
	};

	// Map spacing key or fallback to direct tailwind class
	const gapClass = `gap-${gap}`;
	const alignClass = alignMap[align] || "";
	const justifyClass = justifyMap[justify] || "";

	return (
		<Component
			className={`${directionClass} ${gapClass} ${alignClass} ${justifyClass} ${className}`}
			{...props}
		>
			{children}
		</Component>
	);
};

export default Stack;
