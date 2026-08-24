import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { PRODUCT_STATES } from "./product-card.constants";
import { cn } from "@/lib/utils";

export const ProductStatus = ({ state, isRtl }) => {
	const { language } = useLanguage();

	if (state === PRODUCT_STATES.DEFAULT || state === PRODUCT_STATES.HOVER) return null;

	const getStatusConfig = () => {
		switch (state) {
			case PRODUCT_STATES.OUT_OF_STOCK:
				return { bg: "bg-surface-3", text: "text-text-muted", label: { en: "Out of Stock", ar: "نفذت الكمية" } };
			case PRODUCT_STATES.LIMITED_STOCK:
				return { bg: "bg-warning/10", text: "text-warning", label: { en: "Limited Stock", ar: "كمية محدودة" } };
			case PRODUCT_STATES.COMING_SOON:
				return { bg: "bg-primary/10", text: "text-primary", label: { en: "Coming Soon", ar: "قريباً" } };
			case PRODUCT_STATES.PRESCRIPTION_REQUIRED:
				return { bg: "bg-info/10", text: "text-info", label: { en: "Prescription Required", ar: "وصفة طبية مطلوبة" } };
			default:
				return null;
		}
	};

	const config = getStatusConfig();
	if (!config) return null;

	return (
		<div className={cn("inline-flex items-center justify-center px-2 py-1 mt-2 text-[10px] font-bold rounded-md", config.bg, config.text)}>
			{config.label[language]}
		</div>
	);
};
