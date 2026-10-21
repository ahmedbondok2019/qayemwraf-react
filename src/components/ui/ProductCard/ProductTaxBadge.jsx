import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/app/providers/I18nProvider";

const taxBadgeVariants = cva(
	"inline-flex items-center gap-1 font-bold leading-none select-none transition-colors border whitespace-nowrap",
	{
		variants: {
			status: {
				included: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
				excluded: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
			},
			variant: {
				subtle: "",
				outline: "bg-transparent",
				solid: "text-white border-transparent",
			},
			size: {
				xs: "text-[10px] px-1.5 py-0.5 rounded",
				sm: "text-[11px] px-2 py-0.5 rounded-md",
				md: "text-xs px-2.5 py-1 rounded-md",
			},
		},
		compoundVariants: [
			{
				status: "included",
				variant: "solid",
				className: "bg-emerald-600 dark:bg-emerald-500",
			},
			{
				status: "excluded",
				variant: "solid",
				className: "bg-amber-600 dark:bg-amber-500",
			},
		],
		defaultVariants: {
			status: "included",
			variant: "subtle",
			size: "xs",
		},
	}
);

/**
 * ProductTaxBadge Component
 * Displays tax inclusion status ("شامل الضريبة" / "غير شامل الضريبة")
 * Full Light & Dark mode support, RTL/LTR localization, and accessible ARIA attributes.
 *
 * @param {Object} props
 * @param {boolean} [props.isTaxIncluded] - Whether the price includes VAT/tax
 * @param {'included'|'excluded'} [props.status] - Explicit status override
 * @param {'subtle'|'outline'|'solid'} [props.variant='subtle'] - Style variant
 * @param {'xs'|'sm'|'md'} [props.size='xs'] - Badge size
 * @param {string} [props.language] - Optional language code ('ar' | 'en')
 * @param {string} [props.className] - Custom CSS class
 */
export const ProductTaxBadge = ({
	isTaxIncluded,
	status,
	variant = "subtle",
	size = "xs",
	language: propLanguage,
	className,
	...props
}) => {
	const { language: contextLanguage } = useLanguage();
	const language = propLanguage || contextLanguage || "ar";
	const isRtl = language === "ar";

	// Determine resolved status
	const resolvedStatus = status || (isTaxIncluded ? "included" : "excluded");
	const isIncluded = resolvedStatus === "included";

	const label = isIncluded
		? (isRtl ? "شامل الضريبة" : "Incl. VAT")
		: (isRtl ? "غير شامل الضريبة" : "Excl. VAT");

	const tooltip = isIncluded
		? (isRtl ? "السعر شامل ضريبة القيمة المضافة" : "Price includes Value Added Tax (VAT)")
		: (isRtl ? "السعر غير شامل ضريبة القيمة المضافة" : "Price excludes Value Added Tax (VAT)");

	return (
		<span
			role="status"
			aria-label={tooltip}
			title={tooltip}
			className={cn(taxBadgeVariants({ status: resolvedStatus, variant, size }), className)}
			{...props}
		>
			<span
				className={cn(
					"w-1.5 h-1.5 rounded-full shrink-0",
					variant === "solid"
						? "bg-white"
						: isIncluded
							? "bg-emerald-500 dark:bg-emerald-400"
							: "bg-amber-500 dark:bg-amber-400"
				)}
				aria-hidden="true"
			/>
			<span>{label}</span>
		</span>
	);
};

export default ProductTaxBadge;
