import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const QualityGuarantee = ({ className }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className={cn("flex items-start gap-3 p-4 bg-primary/10 rounded-xl border border-primary/20", className)}>
			<div className="w-8 h-8 rounded-full bg-primary/20 flex flex-shrink-0 items-center justify-center text-primary mt-0.5">
				<ShieldCheck className="w-4 h-4" />
			</div>
			<div className="flex flex-col">
				<span className="text-sm font-extrabold text-text mb-1">
					{isRtl ? "ضمان الجودة والسلامة الهندسية" : "Engineering Quality & Safety Guarantee"}
				</span>
				<p className="text-xs font-medium text-text-secondary leading-relaxed">
					{isRtl 
						? "جميع منتجاتنا مصنعة طبقاً للمواصفات القياسية المصرية وتخضع لاختبارات دقيقة لتحمل أقصى درجات الأحمال."  
						: "All products are engineered to high quality standards and tested for maximum safe load capacities."}
				</p>
			</div>
		</div>
	);
};

export default QualityGuarantee;
