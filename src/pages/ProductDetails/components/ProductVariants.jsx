import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { cn } from "@/lib/utils";

export const ProductVariants = ({ variants, selectedVariants, onVariantChange }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	if (!variants || variants.length === 0) return null;

	return (
		<div className="flex flex-col gap-6 py-6 border-y border-border/60 my-2">
			{variants.map((variantGroup) => (
				<div key={variantGroup.id} className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<span className="text-sm font-bold text-text">
							{variantGroup.name[language]}
						</span>
						{/* Show currently selected value */}
						<span className="text-sm font-medium text-text-muted">
							{variantGroup.options.find(o => o.id === selectedVariants[variantGroup.id])?.label[language] || ""}
						</span>
					</div>

					<div className="flex flex-wrap gap-3">
						{variantGroup.options.map((option) => {
							const isSelected = selectedVariants[variantGroup.id] === option.id;
							
							// If the variant is a color variant (has a 'value' that is a hex color)
							const isColor = option.value && option.value.startsWith("#");

							if (isColor) {
								return (
									<button
										key={option.id}
										onClick={() => onVariantChange(variantGroup.id, option.id)}
										title={option.label[language]}
										className={cn(
											"w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
											isSelected ? "border-primary ring-2 ring-primary/20 ring-offset-2" : "border-transparent hover:scale-110"
										)}
									>
										<span 
											className="w-full h-full rounded-full border border-black/10" 
											style={{ backgroundColor: option.value }}
										/>
									</button>
								);
							}

							// Standard text chip variant
							return (
								<button
									key={option.id}
									onClick={() => onVariantChange(variantGroup.id, option.id)}
									className={cn(
										"px-4 py-2 text-sm font-semibold rounded-lg border transition-all",
										isSelected 
											? "bg-primary border-primary text-white shadow-md shadow-primary/20" 
											: "bg-surface border-border/80 text-text-secondary hover:border-primary hover:text-primary"
									)}
								>
									{option.label[language]}
									{option.priceModifier && (
										<span className="opacity-70 ml-1 rtl:mr-1 text-xs">
											({option.priceModifier > 0 ? "+" : ""}{option.priceModifier})
										</span>
									)}
								</button>
							);
						})}
					</div>
				</div>
			))}
		</div>
	);
};

export default ProductVariants;
