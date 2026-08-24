import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Truck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const DeliveryMethod = ({ onNext, onBack }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	
	const [selected, setSelected] = useState("standard");

	const methods = [
		{
			id: "standard",
			icon: Truck,
			title: { en: "Standard Delivery", ar: "توصيل عادي" },
			desc: { en: "2-4 Business Days", ar: "خلال ٢-٤ أيام عمل" },
			price: { en: "25.00 EGP", ar: "٢٥ ج.م" }
		},
		{
			id: "express",
			icon: Zap,
			title: { en: "Express Delivery", ar: "توصيل سريع" },
			desc: { en: "Same Day or Next Day", ar: "نفس اليوم أو اليوم التالي" },
			price: { en: "60.00 EGP", ar: "٦٠ ج.م" }
		}
	];

	return (
		<div className="flex flex-col gap-6 p-6 bg-surface rounded-2xl border border-border/50">
			<h2 className="text-xl font-extrabold text-text">
				{isRtl ? "طريقة التوصيل" : "Delivery Method"}
			</h2>

			<div className="flex flex-col gap-4">
				{methods.map(method => {
					const Icon = method.icon;
					const isSelected = selected === method.id;
					return (
						<label 
							key={method.id}
							className={cn(
								"flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
								isSelected ? "border-primary bg-primary/5" : "border-border/60 bg-surface-2 hover:border-border hover:bg-surface-2/80"
							)}
						>
							<div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-primary bg-surface shrink-0">
								{isSelected && <div className="w-3 h-3 bg-primary rounded-full" />}
							</div>
							
							<div className="w-12 h-12 rounded-full bg-surface shadow-sm border border-border/50 flex items-center justify-center shrink-0">
								<Icon className={cn("w-6 h-6", isSelected ? "text-primary" : "text-text-secondary")} />
							</div>

							<div className="flex flex-col flex-1">
								<span className="font-bold text-text text-lg">{method.title[language]}</span>
								<span className="text-sm font-medium text-text-secondary">{method.desc[language]}</span>
							</div>

							<span className="font-extrabold text-text text-lg">{method.price[language]}</span>

							<input 
								type="radio" 
								name="delivery_method" 
								value={method.id} 
								checked={isSelected}
								onChange={() => setSelected(method.id)}
								className="sr-only" 
							/>
						</label>
					);
				})}
			</div>

			<div className="flex gap-4 mt-4">
				<button onClick={onBack} className="h-14 px-8 border-2 border-border/60 text-text font-bold rounded-xl hover:bg-surface-2 transition-colors">
					{isRtl ? "رجوع" : "Back"}
				</button>
				<button onClick={() => onNext(selected)} className="flex-1 h-14 bg-primary text-white font-extrabold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-[0.98] transition-all">
					{isRtl ? "المتابعة للدفع" : "Continue to Payment"}
				</button>
			</div>
		</div>
	);
};

export default DeliveryMethod;
