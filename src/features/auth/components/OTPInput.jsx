import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export const OTPInput = ({ length = 4, value, onChange }) => {
	const inputRefs = useRef([]);

	// Fill array of inputs
	useEffect(() => {
		if (inputRefs.current.length !== length) {
			inputRefs.current = Array(length).fill(null).map((_, i) => inputRefs.current[i] || null);
		}
	}, [length]);

	const handleChange = (e, index) => {
		const val = e.target.value;
		if (isNaN(val)) return;

		const newValue = value.split("");
		newValue[index] = val.substring(val.length - 1); // Get last typed character
		const finalValue = newValue.join("");
		onChange(finalValue);

		// Auto focus next input
		if (val && index < length - 1) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace") {
			const newValue = value.split("");
			
			// If current field is empty, delete previous and focus previous
			if (!newValue[index] && index > 0) {
				newValue[index - 1] = "";
				onChange(newValue.join(""));
				inputRefs.current[index - 1].focus();
			} else {
				newValue[index] = "";
				onChange(newValue.join(""));
			}
		}
	};

	const handlePaste = (e) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text").trim();
		if (isNaN(pastedData)) return;

		const pasteVal = pastedData.substring(0, length);
		onChange(pasteVal);
		
		// Focus last filled field or last index
		const focusIdx = Math.min(pasteVal.length, length - 1);
		inputRefs.current[focusIdx]?.focus();
	};

	return (
		<div className="flex gap-3 justify-center" dir="ltr">
			{Array.from({ length }).map((_, index) => {
				const char = value[index] || "";
				return (
					<input
						key={index}
						ref={el => inputRefs.current[index] = el}
						type="text"
						inputMode="numeric"
						maxLength={1}
						value={char}
						onChange={e => handleChange(e, index)}
						onKeyDown={e => handleKeyDown(e, index)}
						onPaste={handlePaste}
						className={cn(
							"w-14 h-14 rounded-xl border-2 border-border/80 text-center font-extrabold text-2xl text-text outline-none",
							"bg-surface focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
						)}
					/>
				);
			})}
		</div>
	);
};

export default OTPInput;
