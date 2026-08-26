import React from "react";
import { ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ProductActions = ({ isOutOfStock, isAddingToCart, onAddToCart, isRtl }) => {
	return (
		<div className="mt-4 w-full">
			<Button
				variant={isOutOfStock ? "outline" : "primary"}
				size="sm"
				className={cn(
					"w-full h-10 font-bold rounded-[8px] transition-all",
					isOutOfStock && "opacity-50 cursor-not-allowed border-border text-text-muted bg-surface-2",
					!isOutOfStock && "shadow-sm hover:shadow-md"
				)}
				disabled={isOutOfStock || isAddingToCart}
				onClick={onAddToCart}
			>
				{isAddingToCart ? (
					<Loader2 className="w-4 h-4 animate-spin" />
				) : (
					<>
						<ShoppingCart className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
						{isOutOfStock ? (isRtl ? "نفذت الكمية" : "Out of Stock") : (isRtl ? "طلب الآن" : "Order Now")}
					</>
				)}
			</Button>
		</div>
	);
};
