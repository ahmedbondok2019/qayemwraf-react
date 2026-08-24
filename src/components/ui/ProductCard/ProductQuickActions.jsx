import React from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export const ProductQuickActions = ({ 
	isWishlisted, 
	onToggleWishlist, 
	isRtl 
}) => {
	return (
		<div className={cn(
			"absolute top-3 z-10 flex flex-col gap-2",
			isRtl ? "left-3" : "right-3"
		)}>
			<button 
				onClick={onToggleWishlist}
				className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-2/80 backdrop-blur-md text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
			>
				<Heart 
					className={cn("w-4 h-4 transition-transform", isWishlisted && "fill-danger text-danger scale-110")} 
				/>
			</button>
		</div>
	);
};
