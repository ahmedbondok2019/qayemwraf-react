import React from "react";
import { cn } from "@/lib/utils";

export const Container = ({
	as: Component = "div",
	clean = false,
	className,
	children,
	...props
}) => {
	// Uses max-w-screen-2xl which is dynamically mapped to 1440px in globals.css
	// This acts as a Single Source of Truth for the max width of the layout.
	const baseClass = "w-full max-w-screen-2xl mx-auto";
	const paddingClass = clean ? "" : "px-3 md:px-6 lg:px-8";

	return (
		<Component
			className={cn(baseClass, paddingClass, className)}
			{...props}
		>
			{children}
		</Component>
	);
};

export default Container;
