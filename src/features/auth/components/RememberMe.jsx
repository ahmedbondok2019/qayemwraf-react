import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";

export const RememberMe = ({ checked, onChange }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-text-secondary">
			<input 
				type="checkbox"
				checked={checked}
				onChange={onChange}
				className="w-4 h-4 rounded border-border/80 text-primary focus:ring-primary/20 accent-primary cursor-pointer"
			/>
			<span>
				{isRtl ? "تذكرني على هذا الجهاز" : "Remember me"}
			</span>
		</label>
	);
};

export default RememberMe;
