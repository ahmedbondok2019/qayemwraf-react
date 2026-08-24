import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const QuantitySelector = ({ quantity, setQuantity, maxQuantity = 10, className }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const handleDecrease = () => {
		if (quantity > 1) setQuantity(quantity - 1);
	};

	const handleIncrease = () => {
		if (quantity < maxQuantity) setQuantity(quantity + 1);
	};

	return (
		<div className={cn("flex flex-col gap-2", className)}>
			<span className="text-sm font-bold text-text">
				{isRtl ? "الكمية" : "Quantity"}
			</span>
			<div className="flex items-center h-12 bg-surface-2 rounded-xl border border-border/60 w-36 overflow-hidden">
				<button 
					onClick={handleDecrease}
					disabled={quantity <= 1}
					className="w-12 h-full flex items-center justify-center text-text-secondary hover:text-text hover:bg-black/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					<Minus className="w-4 h-4" />
				</button>
				<div className="flex-1 h-full flex items-center justify-center font-bold text-text text-lg bg-surface border-x border-border/40 select-none">
					{quantity}
				</div>
				<button 
					onClick={handleIncrease}
					disabled={quantity >= maxQuantity}
					className="w-12 h-full flex items-center justify-center text-text-secondary hover:text-text hover:bg-black/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					<Plus className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
};

export default QuantitySelector;
