import React from "react";
import { Shield, Truck } from "lucide-react";

export const ProductMeta = ({ sku, warranty, delivery, isRtl }) => {
	if (!sku && !warranty && !delivery) return null;

	return (
		<div className="flex flex-col gap-1.5 mt-2 border-t border-border/50 pt-2 text-[10px] text-text-muted">
			{sku && (
				<div className="flex items-center gap-1">
					<span className="font-bold">SKU:</span> {sku}
				</div>
			)}
			{warranty && (
				<div className="flex items-center gap-1.5">
					<Shield className="w-3 h-3 text-success" />
					<span>{warranty}</span>
				</div>
			)}
			{delivery && (
				<div className="flex items-center gap-1.5">
					<Truck className="w-3 h-3 text-primary" />
					<span>{delivery}</span>
				</div>
			)}
		</div>
	);
};
