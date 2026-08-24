import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center justify-center font-semibold rounded-full transition-colors select-none whitespace-nowrap",
	{
		variants: {
			variant: {
				default: "bg-primary text-background",
				secondary: "bg-secondary text-background",
				outline: "border border-border bg-transparent text-text-secondary",
				success: "bg-success text-white",
				warning: "bg-warning text-white",
				destructive: "bg-danger text-white",
			},
			size: {
				sm: "px-2 py-0.5 text-xxs",
				md: "px-2.5 py-1 text-xs",
				lg: "px-3 py-1.5 text-sm",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	}
);

export const Badge = ({
	variant = "default",
	size = "md",
	className = "",
	children,
	...props
}) => {
	return (
		<span
			className={cn(badgeVariants({ variant, size, className }))}
			{...props}
		>
			{children}
		</span>
	);
};

export default Badge;
