import React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/app/providers/I18nProvider";

/**
 * RadioGroup Component
 * A stylized radio button list for single-select filters.
 */
export const RadioGroup = ({ name, options = [], selectedValue, onChange }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="flex flex-col gap-1.5">
			{options.map((opt) => (
				<label 
					key={opt.id} 
					className="flex items-center gap-3 py-1.5 cursor-pointer group"
				>
					<div className="relative flex items-center justify-center w-5 h-5 shrink-0">
						<input 
							type="radio" 
							name={name}
							value={opt.id}
							checked={selectedValue === opt.id}
							onChange={() => onChange(opt.id)}
							className="absolute opacity-0 w-full h-full cursor-pointer peer"
						/>
						<div className={cn(
							"w-full h-full rounded-full border transition-all duration-200",
							selectedValue === opt.id 
								? "border-primary border-4" 
								: "border-border/60 bg-surface group-hover:border-primary/50"
						)} />
					</div>
					<span className={cn(
						"text-sm font-medium transition-colors select-none",
						selectedValue === opt.id ? "text-primary" : "text-text-secondary group-hover:text-text"
					)}>
						{opt.label?.[language] || opt.label?.en}
					</span>
				</label>
			))}
		</div>
	);
};

export default RadioGroup;
