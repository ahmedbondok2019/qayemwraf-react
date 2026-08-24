import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { cn } from "@/lib/utils";

export const PasswordField = ({ value, onChange, placeholder, label, error, required = true, autoComplete }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [showPassword, setShowPassword] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className="flex flex-col gap-1.5 w-full relative">
			<div className={cn(
				"relative w-full h-[52px] bg-[#0b1329]/40 border rounded-xl flex items-center transition-all duration-300",
				isFocused 
					? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg shadow-blue-500/10" 
					: "border-slate-800 hover:border-slate-700",
				error && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20"
			)}>
				
				{/* Label sitting on the border */}
				{label && (
					<label className={cn(
						"absolute -top-2.5 px-2 text-[10px] font-extrabold text-slate-400 bg-[#0b1329] select-none pointer-events-none transition-colors duration-300",
						isRtl ? "right-3" : "left-3",
						isFocused && "text-blue-400",
						error && "text-red-500"
					)}>
						{label}
					</label>
				)}

				{/* Lock icon (Right in RTL, Left in LTR) */}
				<div className={cn(
					"absolute text-slate-400 flex items-center justify-center pointer-events-none",
					isRtl ? "right-4" : "left-4"
				)}>
					<Lock className={cn("w-4.5 h-4.5 transition-colors duration-300", isFocused && "text-blue-500")} />
				</div>

				{/* Input */}
				<input
					type={showPassword ? "text" : "password"}
					value={value}
					onChange={onChange}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					placeholder={placeholder}
					required={required}
					className={cn(
						"w-full h-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-slate-500/60",
						isRtl 
							? "text-right pr-12 pl-12" 
							: "text-left pl-12 pr-12"
					)}
					dir={isRtl ? "rtl" : "ltr"}
					autoComplete={autoComplete}
				/>

				{/* Eye icon (Left in RTL, Right in LTR) */}
				<button
					type="button"
					onClick={() => setShowPassword(!showPassword)}
					className={cn(
						"absolute text-slate-400 hover:text-blue-400 transition-colors p-1.5 rounded-lg hover:bg-blue-500/10 cursor-pointer",
						isRtl ? "left-3" : "right-3"
					)}
					aria-label={showPassword ? "Hide password" : "Show password"}
				>
					{showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
				</button>

			</div>

			{error && (
				<span className="text-xs text-red-500 font-semibold animate-in fade-in slide-in-from-top-1 px-1">
					{error[language] || error}
				</span>
			)}
		</div>
	);
};

export default PasswordField;
