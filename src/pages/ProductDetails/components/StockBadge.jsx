import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Package, PackageX, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const StockBadge = ({ stock, className }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	if (!stock) return null;

	const { inStock, quantity } = stock;
	
	// Determine status and colors
	let status = "out_of_stock";
	if (inStock && quantity > 5) status = "in_stock";
	else if (inStock && quantity > 0 && quantity <= 5) status = "low_stock";

	const getStatusConfig = () => {
		switch (status) {
			case "in_stock":
				return {
					icon: Package,
					colorClass: "text-success bg-success/10 border-success/20",
					text: isRtl ? "متوفر في المخزون" : "In Stock"
				};
			case "low_stock":
				return {
					icon: AlertCircle,
					colorClass: "text-warning bg-warning/10 border-warning/20",
					text: isRtl ? `باقي ${quantity} قطع فقط!` : `Only ${quantity} left in stock!`
				};
			case "out_of_stock":
			default:
				return {
					icon: PackageX,
					colorClass: "text-danger bg-danger/10 border-danger/20",
					text: isRtl ? "نفذت الكمية" : "Out of Stock"
				};
		}
	};

	const config = getStatusConfig();
	const Icon = config.icon;

	return (
		<div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full border", config.colorClass, className)}>
			<Icon className="w-4 h-4" />
			<span className="text-sm font-bold tracking-wide">
				{config.text}
			</span>
		</div>
	);
};

export default StockBadge;
