import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export const TrustBadges = ({ className }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const badges = [
		{
			icon: ShieldCheck,
			title: isRtl ? "موزع معتمد" : "Official Distributor",
			desc: isRtl ? "منتجات أصلية 100%" : "100% Genuine Products",
			color: "text-primary bg-primary/10"
		},
		{
			icon: Truck,
			title: isRtl ? "شحن سريع" : "Fast Shipping",
			desc: isRtl ? "توصيل خلال 24-48 ساعة" : "Delivery in 24-48 hrs",
			color: "text-success bg-success/10"
		},
		{
			icon: RotateCcw,
			title: isRtl ? "سياسة الإرجاع" : "Return Policy",
			desc: isRtl ? "إرجاع مجاني خلال 14 يوم" : "14-day free returns",
			color: "text-secondary bg-secondary/10"
		}
	];

	return (
		<div className={cn("grid grid-cols-1 gap-3 py-4 border-t border-border/50", className)}>
			{badges.map((badge, idx) => {
				const Icon = badge.icon;
				return (
					<div key={idx} className="flex items-center gap-4 p-3 bg-surface-2/50 rounded-xl">
						<div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", badge.color)}>
							<Icon className="w-5 h-5" />
						</div>
						<div className="flex flex-col">
							<span className="text-sm font-bold text-text">{badge.title}</span>
							<span className="text-xs font-medium text-text-secondary">{badge.desc}</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default TrustBadges;
