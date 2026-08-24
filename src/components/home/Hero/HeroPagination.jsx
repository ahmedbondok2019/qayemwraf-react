import React from "react";
import { cn } from "@/lib/utils";

export const HeroPagination = ({ slidesCount, selectedIndex, scrollTo }) => {
	return (
		<div className="flex items-center gap-2">
			{Array.from({ length: slidesCount }).map((_, index) => (
				<button
					key={index}
					onClick={() => scrollTo(index)}
					className={cn(
						"transition-all duration-300 rounded-full",
						selectedIndex === index
							? "w-3 h-3 bg-blue-600 shadow-md"
							: "w-3 h-3 bg-white shadow-md hover:bg-white/80"
					)}
					aria-label={`Go to slide ${index + 1}`}
				/>
			))}
		</div>
	);
};

export default HeroPagination;
