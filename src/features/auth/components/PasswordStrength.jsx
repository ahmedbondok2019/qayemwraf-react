import React from "react";
import { getPasswordStrength } from "../validation/authSchemas";
import { useLanguage } from "@/app/providers/I18nProvider";
import { cn } from "@/lib/utils";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export const PasswordStrength = ({ password }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const strength = password ? getPasswordStrength(password) : 0;

	const getStrengthText = () => {
		switch (strength) {
			case 1: return { en: "Weak", ar: "ضعيفة" };
			case 2: return { en: "Fair", ar: "متوسطة" };
			case 3: return { en: "Good", ar: "جيدة" };
			case 4: return { en: "Strong", ar: "قوية جداً" };
			default: return { en: "Empty", ar: "فارغة" };
		}
	};

	const getStrengthColor = () => {
		switch (strength) {
			case 1: return "bg-red-500";
			case 2: return "bg-amber-500";
			case 3: return "bg-emerald-500";
			case 4: return "bg-blue-500";
			default: return "bg-slate-800";
		}
	};

	return (
		<div className="flex items-center justify-between gap-4 w-full mt-1.5 select-none">
			{/* Segments (Left aligned in RTL, or LTR) */}
			<div className="flex gap-1.5 flex-1 max-w-[200px] h-1.5">
				{Array.from({ length: 4 }).map((_, idx) => (
					<div 
						key={idx}
						className={cn(
							"flex-1 h-full rounded-full transition-all duration-550",
							idx < strength ? getStrengthColor() : "bg-slate-800"
						)}
					/>
				))}
			</div>

			{/* Shield & Text (Right aligned in RTL) */}
			<div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
				{strength >= 3 ? (
					<ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
				) : (
					<ShieldAlert className="w-3.5 h-3.5 text-slate-500" />
				)}
				<span>
					{isRtl ? "قوة كلمة المرور" : "Password Strength"}
					{strength > 0 && (
						<span className={cn(
							"ms-1.5",
							strength === 1 && "text-red-500",
							strength === 2 && "text-amber-500",
							strength === 3 && "text-emerald-500",
							strength === 4 && "text-blue-500"
						)}>
							({getStrengthText()[language]})
						</span>
					)}
				</span>
			</div>
		</div>
	);
};

export default PasswordStrength;
