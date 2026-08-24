import React from "react";

export const Grid = ({
	as: Component = "div",
	cols = 1,
	gap = 4,
	sm,
	md,
	lg,
	className = "",
	children,
	...props
}) => {
	const baseGrid = "grid";
	const gapClass = `gap-${gap}`;
	
	const colsClass = `grid-cols-${cols}`;
	const smClass = sm ? `sm:grid-cols-${sm}` : "";
	const mdClass = md ? `md:grid-cols-${md}` : "";
	const lgClass = lg ? `lg:grid-cols-${lg}` : "";

	return (
		<Component
			className={`${baseGrid} ${colsClass} ${smClass} ${mdClass} ${lgClass} ${gapClass} ${className}`}
			{...props}
		>
			{children}
		</Component>
	);
};

export default Grid;
