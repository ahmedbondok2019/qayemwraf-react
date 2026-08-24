import React, { useState, useEffect } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { CreditCard, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePaymentMethods } from "@/hooks/queries/usePaymentMethods";

const getPaymentIcon = (name = "") => {
	const lower = name.toLowerCase();
	if (lower.includes("cod") || lower.includes("cash") || lower.includes("استلام") || lower.includes("نقد")) {
		return Banknote;
	}
	return CreditCard;
};

export const PaymentMethod = ({ onNext, onBack, isPending }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	
	const { data: apiMethods = [], isLoading } = usePaymentMethods();
	const [selected, setSelected] = useState(null);

	useEffect(() => {
		if (apiMethods.length > 0 && selected === null) {
			const activeMethod = apiMethods.find(m => m.is_active !== false) || apiMethods[0];
			setSelected(activeMethod.id);
		}
	}, [apiMethods, selected]);

	const currentMethod = apiMethods.find(m => m.id === selected);
	const isCardSelected = currentMethod && !(
		currentMethod.name?.toLowerCase().includes("cash") ||
		currentMethod.name?.toLowerCase().includes("cod") ||
		currentMethod.name?.includes("استلام") ||
		currentMethod.name?.includes("نقد")
	);

	if (isLoading) {
		return (
			<div className="flex flex-col gap-6 p-6 bg-surface rounded-2xl border border-border/50 items-center justify-center min-h-[200px]">
				<div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
				<span className="text-sm font-semibold text-text-secondary">
					{isRtl ? "جاري تحميل طرق الدفع..." : "Loading payment methods..."}
				</span>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 p-6 bg-surface rounded-2xl border border-border/50">
			<h2 className="text-xl font-extrabold text-text">
				{isRtl ? "طريقة الدفع" : "Payment Method"}
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{apiMethods.map(method => {
					const Icon = getPaymentIcon(method.name);
					const isSelected = selected === method.id;
					return (
						<label 
							key={method.id}
							className={cn(
								"flex flex-col items-center text-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all",
								isSelected ? "border-primary bg-primary/5" : "border-border/60 bg-surface-2 hover:border-border hover:bg-surface-2/80"
							)}
						>
							<div className="w-16 h-16 rounded-full bg-surface shadow-sm border border-border/50 flex items-center justify-center mb-2 relative">
								<Icon className={cn("w-8 h-8", isSelected ? "text-primary" : "text-text-secondary")} />
								{isSelected && (
									<div className="absolute -top-1 -right-1 w-5 h-5 bg-primary border-2 border-surface rounded-full flex items-center justify-center">
										<div className="w-2 h-2 bg-white rounded-full" />
									</div>
								)}
							</div>
							
							<span className="font-bold text-text text-lg leading-tight">{method.name}</span>
							<span className="text-xs font-medium text-text-secondary px-2">{method.description}</span>

							<input 
								type="radio" 
								name="payment_method" 
								value={method.id} 
								checked={isSelected}
								onChange={() => setSelected(method.id)}
								className="sr-only" 
							/>
						</label>
					);
				})}
			</div>

			{/* Dummy Card Form (shows only if Card is selected) */}
			{isCardSelected && (
				<div className="flex flex-col gap-4 p-4 mt-2 bg-surface-2/50 rounded-xl border border-border/60 animate-in fade-in slide-in-from-top-4">
					<div className="flex flex-col gap-2">
						<label className="text-xs font-bold text-text-secondary">{isRtl ? "رقم البطاقة" : "Card Number"}</label>
						<input type="text" placeholder="0000 0000 0000 0000" className="h-12 px-4 bg-surface border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-left font-mono" dir="ltr" />
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col gap-2">
							<label className="text-xs font-bold text-text-secondary">{isRtl ? "تاريخ الانتهاء" : "Expiry Date"}</label>
							<input type="text" placeholder="MM/YY" className="h-12 px-4 bg-surface border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-left font-mono" dir="ltr" />
						</div>
						<div className="flex flex-col gap-2">
							<label className="text-xs font-bold text-text-secondary">CVV</label>
							<input type="password" placeholder="123" className="h-12 px-4 bg-surface border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-left font-mono" dir="ltr" maxLength={4} />
						</div>
					</div>
				</div>
			)}

			<div className="flex gap-4 mt-4">
				<button onClick={onBack} disabled={isPending} className="h-14 px-8 border-2 border-border/60 text-text font-bold rounded-xl hover:bg-surface-2 disabled:opacity-50 transition-colors">
					{isRtl ? "رجوع" : "Back"}
				</button>
				<button onClick={() => onNext(selected)} disabled={isPending} className="flex-1 h-14 bg-primary text-white font-extrabold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2">
					{isPending ? (
						<>
							<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
							<span>{isRtl ? "جاري الإرسال..." : "Processing..."}</span>
						</>
					) : (
						<span>{isRtl ? "تأكيد الطلب" : "Place Order"}</span>
					)}
				</button>
			</div>
		</div>
	);
};

export default PaymentMethod;
