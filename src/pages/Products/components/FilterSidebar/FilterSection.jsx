import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const FilterSection = ({ title, children, defaultOpen = true, activeCount = 0 }) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<div className="border-b border-border/60 py-5 last:border-0">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center justify-between w-full group outline-none"
				aria-expanded={isOpen}
			>
				<div className="flex items-center gap-2">
					<h3 className="text-base font-bold text-text group-hover:text-primary transition-colors">
						{title}
					</h3>
					{activeCount > 0 && (
						<span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">
							{activeCount}
						</span>
					)}
				</div>
				<ChevronDown
					className={cn(
						"w-5 h-5 text-text-secondary transition-transform duration-300",
						isOpen ? "rotate-180" : ""
					)}
				/>
			</button>

			{isOpen && (
				<div className="pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
					{children}
				</div>
			)}
		</div>
	);
};

export default FilterSection;
