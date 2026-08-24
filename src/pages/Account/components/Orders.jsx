import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Package, Eye, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrders } from "@/hooks/queries/useOrders";

export const Orders = ({ onViewOrder }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const { data: responseData, isLoading, error } = useOrders();

	// Extracted orders array from response
	const orders = responseData?.data || [];

	const getStatusConfig = (status, statusText) => {
		let color = "bg-surface-2 text-text-secondary border-border/50";
		switch (status) {
			case "delivered":
			case "completed":
				color = "bg-success/10 text-success border-success/20";
				break;
			case "processing":
			case "pending":
				color = "bg-warning/10 text-warning border-warning/20";
				break;
			case "cancelled":
			case "failed":
				color = "bg-danger/10 text-danger border-danger/20";
				break;
		}

		// statusText is an array from API like ["قيد الانتظار", "btn...", "timeline..."]
		const labelText = (Array.isArray(statusText) && statusText[0]) || statusText || (isRtl ? "قيد الانتظار" : "Pending");
		return { label: labelText, color };
	};

	if (isLoading) {
		return (
			<div className="flex flex-col gap-6 p-6 bg-surface rounded-2xl border border-border/50 items-center justify-center min-h-[200px]">
				<div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
				<span className="text-sm font-semibold text-text-secondary">
					{isRtl ? "جاري تحميل الطلبات..." : "Loading orders..."}
				</span>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col gap-4 p-6 bg-surface rounded-2xl border border-danger/20 items-center justify-center min-h-[200px]">
				<span className="text-sm font-semibold text-danger">
					{isRtl ? "فشل تحميل الطلبات. الرجاء المحاولة مرة أخرى." : "Failed to load orders. Please try again."}
				</span>
			</div>
		);
	}

	if (orders.length === 0) {
		return (
			<div className="flex flex-col gap-6 p-10 bg-surface rounded-2xl border border-border/50 items-center justify-center min-h-[300px]">
				<div className="w-16 h-16 bg-surface-2 rounded-2xl flex items-center justify-center text-text-muted">
					<Package className="w-8 h-8" />
				</div>
				<div className="flex flex-col items-center gap-1">
					<span className="font-extrabold text-lg text-text">
						{isRtl ? "لا توجد طلبات بعد" : "No Orders Yet"}
					</span>
					<span className="text-sm text-text-muted text-center max-w-[300px]">
						{isRtl ? "لم تقم بإجراء أي طلبات حتى الآن. عند طلب منتجات ستظهر هنا." : "You haven't placed any orders yet. When you buy items they will show here."}
					</span>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
			
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-extrabold text-text">
					{isRtl ? "طلباتي" : "My Orders"}
				</h2>
			</div>

			<div className="flex flex-col gap-4">
				{orders.map(order => {
					const statusConfig = getStatusConfig(order.status, order.status_text);
					// Fallback for items length: check if items is an array or a number
					const itemsCount = Array.isArray(order.items) ? order.items.length : (order.items || 1);
					
					return (
						<div key={order.id} className="bg-surface rounded-2xl border border-border/50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-primary/50 transition-colors">
							
							{/* Order Info */}
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center text-text-secondary shrink-0">
									<Package className="w-6 h-6" />
								</div>
								<div className="flex flex-col">
									<span className="font-bold text-text text-lg">
										{order.order_number || `#${order.id}`}
									</span>
									<span className="text-sm text-text-muted">
										{order.created_at || order.date} • {itemsCount} {isRtl ? "منتجات" : "items"}
									</span>
								</div>
							</div>

							{/* Status & Total */}
							<div className="flex items-center justify-between sm:justify-end gap-6 sm:w-1/2">
								<div className={cn("px-3 py-1.5 rounded-lg border font-bold text-sm", statusConfig.color)}>
									{statusConfig.label}
								</div>
								<div className="flex flex-col items-end">
									<span className="text-sm text-text-secondary">{isRtl ? "الإجمالي" : "Total"}</span>
									<span className="font-extrabold text-primary">
										{Number(order.total).toLocaleString("en-US")} {order.currency || (isRtl ? "ج.م" : "EGP")}
									</span>
								</div>
							</div>

							{/* Actions */}
							<div className="flex items-center gap-2 pt-4 sm:pt-0 border-t sm:border-0 border-border/50 w-full sm:w-auto shrink-0 justify-end">
								<button 
									onClick={() => onViewOrder && onViewOrder(order.id)}
									className="flex items-center gap-2 px-4 py-2 bg-surface-2 hover:bg-primary hover:text-white text-text font-bold rounded-xl transition-colors text-sm cursor-pointer"
								>
									<Eye className="w-4 h-4" />
									{isRtl ? "التفاصيل" : "View"}
								</button>
								{order.status === "delivered" && (
									<button className="flex items-center gap-2 px-4 py-2 bg-surface-2 hover:bg-surface-3 text-text font-bold rounded-xl transition-colors text-sm cursor-pointer">
										<Download className="w-4 h-4" />
										{isRtl ? "الفاتورة" : "Invoice"}
									</button>
								)}
							</div>

						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Orders;
