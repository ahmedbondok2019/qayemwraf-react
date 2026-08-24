import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef(({
	type = "text",
	label,
	error,
	leftIcon,
	rightIcon,
	disabled = false,
	className = "",
	id,
	...props
}, ref) => {
	const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

	return (
		<div className="w-full space-y-1.5 text-start">
			{label && (
				<label
					htmlFor={inputId}
					className={cn(
						"block text-xs font-bold text-text-secondary select-none transition-colors",
						disabled && "opacity-50"
					)}
				>
					{label}
				</label>
			)}

			<div className="relative flex items-center">
				{leftIcon && (
					<div className="absolute left-3 flex items-center justify-center text-text-muted pointer-events-none">
						{leftIcon}
					</div>
				)}

				<input
					ref={ref}
					type={type}
					id={inputId}
					disabled={disabled}
					className={cn(
						"w-full px-4 py-2.5 text-sm rounded-lg bg-surface border border-border outline-none transition-all placeholder:text-text-muted/60",
						"focus:border-primary focus:ring-2 focus:ring-primary/10",
						leftIcon && "pl-10",
						rightIcon && "pr-10",
						error && "border-danger focus:border-danger focus:ring-danger/10",
						disabled && "opacity-50 cursor-not-allowed bg-surface-2",
						className
					)}
					{...props}
				/>

				{rightIcon && (
					<div className="absolute right-3 flex items-center justify-center text-text-muted pointer-events-none">
						{rightIcon}
					</div>
				)}
			</div>

			{error && (
				<p className="text-xs font-semibold text-danger animate-fadeIn">
					{error}
				</p>
			)}
		</div>
	);
});

Input.displayName = "Input";

export default Input;
