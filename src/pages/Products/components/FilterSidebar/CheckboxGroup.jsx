import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const CheckboxGroup = ({ label, value, checked, onChange, count }) => {
	return (
		<label className="flex items-center justify-between py-1.5 group cursor-pointer select-none">
			<div className="flex items-center gap-3">
				<div className={cn(
					"w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all duration-200",
					checked 
						? "bg-primary border-primary text-white" 
						: "border-border/80 bg-surface group-hover:border-primary/50"
				)}>
					{checked && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
				</div>
				<span className={cn(
					"text-sm transition-colors duration-200 line-clamp-1",
					checked ? "text-primary font-bold" : "text-text-secondary group-hover:text-text"
				)}>
					{label}
				</span>
			</div>
			
			{count != null && (
				<span className="text-xs text-text-muted font-medium bg-surface-2 px-2 py-0.5 rounded-full">
					{count}
				</span>
			)}
			
			{/* Hidden actual checkbox for accessibility & logic */}
			<input 
				type="checkbox" 
				className="sr-only" 
				checked={checked}
				onChange={(e) => onChange(value, e.target.checked)}
				value={value}
			/>
		</label>
	);
};

export default CheckboxGroup;
