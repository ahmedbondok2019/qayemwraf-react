import React, { useState, useEffect } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";

export const PriceSlider = ({ min = 0, max = 10000, value, onChange, currency = "EGP" }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	
	// Local state for smooth typing, syncs up to parent on blur or enter
	const [localMin, setLocalMin] = useState(value[0]);
	const [localMax, setLocalMax] = useState(value[1]);

	// Update local state if parent value changes
	useEffect(() => {
		setLocalMin(value[0]);
		setLocalMax(value[1]);
	}, [value]);

	const handleBlur = () => {
		let newMin = parseInt(localMin, 10);
		let newMax = parseInt(localMax, 10);

		if (isNaN(newMin)) newMin = min;
		if (isNaN(newMax)) newMax = max;

		if (newMin < min) newMin = min;
		if (newMax > max) newMax = max;

		if (newMin > newMax) {
			const temp = newMin;
			newMin = newMax;
			newMax = temp;
		}

		setLocalMin(newMin);
		setLocalMax(newMax);
		onChange([newMin, newMax]);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.target.blur(); // Triggers handleBlur
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-3">
				<div className="flex-1 relative">
					<span className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted font-bold">
						{isRtl ? "من" : "Min"}
					</span>
					<input
						type="number"
						min={min}
						max={max}
						value={localMin}
						onChange={(e) => setLocalMin(e.target.value)}
						onBlur={handleBlur}
						onKeyDown={handleKeyDown}
						className="w-full h-10 bg-surface border border-border/80 rounded-lg text-sm text-text font-semibold focus:outline-none focus:border-primary ltr:pl-10 ltr:pr-3 rtl:pr-10 rtl:pl-3 transition-colors"
					/>
				</div>
				<span className="text-text-muted font-bold">-</span>
				<div className="flex-1 relative">
					<span className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted font-bold">
						{isRtl ? "إلى" : "Max"}
					</span>
					<input
						type="number"
						min={min}
						max={max}
						value={localMax}
						onChange={(e) => setLocalMax(e.target.value)}
						onBlur={handleBlur}
						onKeyDown={handleKeyDown}
						className="w-full h-10 bg-surface border border-border/80 rounded-lg text-sm text-text font-semibold focus:outline-none focus:border-primary ltr:pl-10 ltr:pr-3 rtl:pr-10 rtl:pl-3 transition-colors"
					/>
				</div>
			</div>
			<div className="flex justify-end mt-2">
				<button 
					onClick={handleBlur}
					className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-md hover:bg-primary/90 transition-colors"
				>
					{isRtl ? "تطبيق" : "Apply"}
				</button>
			</div>
		</div>
	);
};

export default PriceSlider;
