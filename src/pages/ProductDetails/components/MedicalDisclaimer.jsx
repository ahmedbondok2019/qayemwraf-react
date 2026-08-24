import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export const MedicalDisclaimer = ({ className }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className={cn("flex items-start gap-3 p-4 bg-warning/10 rounded-xl border border-warning/20", className)}>
			<div className="w-8 h-8 rounded-full bg-warning/20 flex flex-shrink-0 items-center justify-center text-warning mt-0.5">
				<AlertTriangle className="w-4 h-4" />
			</div>
			<div className="flex flex-col">
				<span className="text-sm font-extrabold text-warning-dark mb-1">
					{isRtl ? "إخلاء مسؤولية طبية" : "Medical Disclaimer"}
				</span>
				<p className="text-xs font-medium text-warning-dark/80 leading-relaxed">
					{isRtl 
						? "المعلومات والمنتجات الطبية المعروضة ليست بديلاً عن المشورة الطبية المتخصصة."  
						: "This product is not a substitute for professional medical advice. Please read the user manual carefully before use."}
				</p>
			</div>
		</div>
	);
};

export default MedicalDisclaimer;
