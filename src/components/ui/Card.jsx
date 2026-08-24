import React from "react";
import { cn } from "@/lib/utils";

export const Card = ({ className, children, ...props }) => {
	// Implements the Medical Design Card Base:
	// White background, 20px radius, border-light, floating shadow, interactive hover state
	return (
		<div
			className={cn(
				"bg-surface text-text rounded-[20px] border border-border-light shadow-floating transition-all duration-200 hover:-translate-y-1 hover:shadow-overlay",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export const CardHeader = ({ className, children, ...props }) => {
	return (
		<div
			className={cn("flex flex-col space-y-1.5 p-6", className)}
			{...props}
		>
			{children}
		</div>
	);
};

export const CardTitle = ({ className, children, ...props }) => {
	return (
		<h3
			className={cn("font-semibold text-xl leading-none tracking-tight", className)}
			{...props}
		>
			{children}
		</h3>
	);
};

export const CardDescription = ({ className, children, ...props }) => {
	return (
		<p
			className={cn("text-sm text-text-muted", className)}
			{...props}
		>
			{children}
		</p>
	);
};

export const CardContent = ({ className, children, ...props }) => {
	return (
		<div className={cn("p-6 pt-0", className)} {...props}>
			{children}
		</div>
	);
};

export const CardFooter = ({ className, children, ...props }) => {
	return (
		<div
			className={cn("flex items-center p-6 pt-0 border-t border-border-light mt-6", className)}
			{...props}
		>
			{children}
		</div>
	);
};

export default Card;
