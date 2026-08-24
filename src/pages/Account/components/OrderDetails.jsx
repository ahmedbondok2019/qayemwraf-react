import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ArrowLeft, Check, Package, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrderDetails, useCancelOrder } from "@/hooks/queries/useOrders";

export const OrderDetails = ({ orderId, onBack }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const { data: rawOrder, isLoading, error } = useOrderDetails(orderId);
	const order = rawOrder?.data?.[0] || rawOrder;

	const cancelOrderMutation = useCancelOrder();

	const handleCancelOrder = async () => {
		if (window.confirm(isRtl ? "هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟" : "Are you sure you want to cancel this order?")) {
			try {
				await cancelOrderMutation.mutateAsync(orderId);
				alert(isRtl ? "تم إلغاء الطلب بنجاح." : "Order cancelled successfully.");
			} catch (err) {
				alert(isRtl ? "فشل إلغاء الطلب. يرجى المحاولة مرة أخرى." : "Failed to cancel order. Please try again.");
			}
		}
	};

	if (isLoading) {
		return (
			<div className="flex flex-col gap-6 p-6 bg-surface rounded-2xl border border-border/50 items-center justify-center min-h-[300px]">
				<div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
				<span className="text-sm font-semibold text-text-secondary">
					{isRtl ? "جاري تحميل تفاصيل الطلب..." : "Loading order details..."}
				</span>
			</div>
		);
	}

	if (error || !order) {
		return (
			<div className="flex flex-col gap-4 p-6 bg-surface rounded-2xl border border-danger/20 items-center justify-center min-h-[300px]">
				<span className="text-sm font-semibold text-danger">
					{isRtl ? "فشل تحميل تفاصيل الطلب. الرجاء المحاولة مرة أخرى." : "Failed to load order details. Please try again."}
				</span>
				<button 
					onClick={onBack}
					className="h-10 px-4 bg-surface-2 hover:bg-surface-3 text-text font-bold rounded-xl transition-all text-xs cursor-pointer"
				>
					{isRtl ? "العودة للطلبات" : "Back to Orders"}
				</button>
			</div>
		);
	}

	// Address formatting
	const addr = order.shipping_address || {};
	const formattedAddress = addr.address 
		? `${addr.first_name || ""} ${addr.last_name || ""}, ${addr.address}, ${addr.city || ""}, ${addr.governorate || ""}`.trim()
		: (isRtl ? "العنوان غير متوفر" : "Address not provided");

	// Status description helper
	const getStatusDescription = () => {
		switch (order.status) {
			case "delivered":
			case "completed":
				return isRtl ? "تم توصيل هذا الطلب بنجاح" : "This order has been delivered successfully";
			case "processing":
			case "pending":
				return isRtl ? "الطلب قيد التجهيز الآن" : "This order is currently being processed";
			case "cancelled":
				return isRtl ? "تم إلغاء هذا الطلب" : "This order has been cancelled";
			default:
				return order.status_text?.[0] || (isRtl ? "حالة الطلب غير معروفة" : "Order status unknown");
		}
	};

	// Generate dynamic timeline based on current status
	const timeline = [
		{ label: { en: "Order Placed", ar: "تم تقديم الطلب" }, date: order.created_at, active: true },
		{ label: { en: "Processing", ar: "قيد التحضير" }, date: null, active: ["processing", "pending", "shipped", "delivered", "completed"].includes(order.status) },
		{ label: { en: "Shipped", ar: "تم الشحن" }, date: null, active: ["shipped", "delivered", "completed"].includes(order.status) },
		{ label: { en: "Delivered", ar: "تم التوصيل" }, date: null, active: ["delivered", "completed"].includes(order.status) }
	];

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
			{/* Back Header */}
			<div className="flex items-center justify-between pb-4 border-b border-border/50">
				<button 
					onClick={onBack}
					className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-bold text-sm cursor-pointer"
				>
					<ArrowLeft className={cn("w-4 h-4", isRtl && "rotate-180")} />
					{isRtl ? "العودة للطلبات" : "Back to Orders"}
				</button>
				<div className="flex items-center gap-2">
					<span className="text-text-muted text-xs">{isRtl ? "طلب رقم:" : "Order ID:"}</span>
					<span className="font-extrabold text-text text-base">{order.order_number || `#${order.id}`}</span>
				</div>
			</div>

			{/* Status Banner with Cancel Action */}
			<div className={cn(
				"p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm",
				["delivered", "completed"].includes(order.status) && "bg-success/5 border-success/20 text-success",
				["processing", "pending"].includes(order.status) && "bg-warning/5 border-warning/20 text-warning",
				order.status === "cancelled" && "bg-danger/5 border-danger/20 text-danger"
			)}>
				<div className="flex items-center gap-3.5">
					<div className="p-2.5 bg-surface rounded-xl border border-current/15 flex items-center justify-center shrink-0">
						<Package className="w-5 h-5" />
					</div>
					<div className="flex flex-col">
						<span className="font-black text-sm sm:text-base leading-tight">
							{getStatusDescription()}
						</span>
						<span className="text-xs text-text-muted mt-1 font-semibold">{order.created_at || order.date}</span>
					</div>
				</div>

				{["pending", "processing"].includes(order.status) && (
					<button 
						onClick={handleCancelOrder}
						disabled={cancelOrderMutation.isPending}
						className="h-11 px-5 bg-danger text-white font-extrabold rounded-xl transition-all text-xs cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 hover:bg-danger/90 self-start sm:self-auto shrink-0 shadow-sm shadow-danger/10"
					>
						{cancelOrderMutation.isPending ? (
							<RefreshCw className="w-3.5 h-3.5 animate-spin" />
						) : (
							<AlertCircle className="w-3.5 h-3.5" />
						)}
						{isRtl ? "إلغاء الطلب" : "Cancel Order"}
					</button>
				)}
			</div>

			{/* Refund Banner Details (for Cancelled orders) */}
			{order.status === "cancelled" && (
				<div className="p-4 bg-info/5 border border-info/20 text-info rounded-2xl flex gap-3 text-sm animate-in fade-in duration-300">
					<AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
					<div className="flex flex-col gap-1">
						<span className="font-extrabold">{isRtl ? "تفاصيل استرداد الأموال (Refund)" : "Refund Confirmation"}</span>
						<p className="text-xs text-text-secondary leading-relaxed">
							{isRtl 
								? `تم استرداد مبلغ ${Number(order.total).toLocaleString("en-US")} ج.م بالكامل بنجاح.` 
								: `The refund of ${Number(order.total).toLocaleString("en-US")} EGP has been successfully processed.`}
						</p>
					</div>
				</div>
			)}

			{/* Tracking Stepper */}
			<div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-xs">
				<h3 className="font-extrabold text-text text-base mb-6 pb-2 border-b border-border/30">
					{isRtl ? "تتبع الشحنة" : "Order Tracking"}
				</h3>
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative">
					
					{/* Progress line */}
					<div className="hidden sm:block absolute left-12 right-12 top-6 h-1 bg-border/60 -z-1">
						<div 
							className="h-full bg-primary transition-all duration-500" 
							style={{ 
								width: ["delivered", "completed"].includes(order.status) ? "100%" : ["shipped"].includes(order.status) ? "66%" : ["processing"].includes(order.status) ? "33%" : "0%" 
							}} 
						/>
					</div>

					{timeline.map((step, idx) => (
						<div key={idx} className="flex sm:flex-col items-center gap-4 sm:gap-2 text-center flex-1 w-full sm:w-auto relative">
							<div className={cn(
								"w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all font-bold",
								step.active 
									? "bg-primary border-primary text-white shadow-md shadow-primary/20" 
									: "bg-surface border-border text-text-muted"
							)}>
								{step.active ? <Check className="w-5 h-5" /> : idx + 1}
							</div>
							<div className="flex flex-col items-start sm:items-center">
								<span className={cn("text-sm font-extrabold", step.active ? "text-text" : "text-text-muted")}>
									{step.label[language]}
								</span>
								{step.date && (
									<span className="text-[10px] text-text-muted font-bold mt-0.5">{step.date}</span>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Delivery & Payment Info */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				
				{/* Shipping Address */}
				<div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-xs">
					<h3 className="font-extrabold text-text text-base mb-3.5 pb-2 border-b border-border/30">
						{isRtl ? "عنوان الشحن" : "Shipping Address"}
					</h3>
					<p className="text-sm text-text-secondary leading-relaxed font-semibold">
						{formattedAddress}
					</p>
				</div>

				{/* Payment Details */}
				<div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-xs">
					<h3 className="font-extrabold text-text text-base mb-3.5 pb-2 border-b border-border/30">
						{isRtl ? "طريقة الدفع" : "Payment Method"}
					</h3>
					<p className="text-sm text-text-secondary font-bold">
						{order.payment_method || (isRtl ? "غير محدد" : "Not specified")}
					</p>
				</div>

			</div>

			{/* Ordered Items */}
			<div className="bg-surface border border-border/50 rounded-2xl p-6 shadow-xs">
				<h3 className="font-extrabold text-text text-base mb-4 pb-2 border-b border-border/30">
					{isRtl ? "المنتجات المطلوبة" : "Ordered Items"}
				</h3>
				<div className="flex flex-col gap-4">
					{order.details && order.details.map((item) => {
						const prod = item.product || {};
						return (
							<div key={item.id} className="flex items-center gap-4 py-3 border-b border-border/20 last:border-0 last:pb-0">
								{/* Product Image */}
								<div className="w-16 h-16 rounded-xl border border-border bg-white flex items-center justify-center shrink-0 overflow-hidden">
									<img 
										src={prod.primary_image || prod.image || "https://placehold.co/100x100?text=No+Image"} 
										alt={prod.title || prod.name} 
										className="w-full h-full object-contain p-1"
									/>
								</div>

								{/* Product Info */}
								<div className="flex-1 min-w-0">
									<h4 className="font-bold text-sm text-text truncate">
										{prod.title || prod.name}
									</h4>
									<div className="flex items-center gap-3 mt-1 text-xs text-text-secondary">
										<span>
											{isRtl ? "السعر: " : "Price: "}
											<span className="font-semibold text-text">
												{Number(item.price).toLocaleString("en-US")} {order.currency || (isRtl ? "ج.م" : "EGP")}
											</span>
										</span>
										<span className="w-px h-3 bg-border/80" />
										<span>
											{isRtl ? "الكمية: " : "Qty: "}
											<span className="font-semibold text-text">{item.quantity}</span>
										</span>
									</div>
								</div>

								{/* Subtotal */}
								<div className="text-end">
									<span className="font-extrabold text-sm text-primary">
										{Number(item.subtotal || (item.price * item.quantity)).toLocaleString("en-US")} {order.currency || (isRtl ? "ج.م" : "EGP")}
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Financial Summary */}
			<div className="bg-surface border border-border/50 rounded-2xl p-6 md:p-8 shadow-xs">
				<h3 className="font-extrabold text-text text-base mb-4 pb-2 border-b border-border/30">
					{isRtl ? "ملخص الحساب" : "Payment Summary"}
				</h3>
				<div className="flex flex-col gap-3.5">
					<div className="flex justify-between text-sm text-text-secondary">
						<span>{isRtl ? "المجموع الفرعي" : "Subtotal"}</span>
						<span className="font-bold text-text">
							{Number(order.subtotal || 0).toLocaleString("en-US")} {order.currency || (isRtl ? "ج.م" : "EGP")}
						</span>
					</div>
					
					<div className="flex justify-between text-sm text-text-secondary">
						<span>{isRtl ? "الشحن" : "Shipping"}</span>
						<span className="font-bold text-text">
							{Number(order.shipping_cost || 0).toLocaleString("en-US")} {order.currency || (isRtl ? "ج.م" : "EGP")}
						</span>
					</div>

					{order.tax !== undefined && order.tax > 0 && (
						<div className="flex justify-between text-sm text-text-secondary">
							<span>{isRtl ? "الضريبة" : "Tax"}</span>
							<span className="font-bold text-text">
								{Number(order.tax).toLocaleString("en-US")} {order.currency || (isRtl ? "ج.م" : "EGP")}
							</span>
						</div>
					)}

					{Number(order.discount || 0) > 0 && (
						<div className="flex justify-between text-sm text-success font-semibold">
							<span>{isRtl ? "الخصم" : "Discount"}</span>
							<span className="font-bold">
								-{Number(order.discount).toLocaleString("en-US")} {order.currency || (isRtl ? "ج.م" : "EGP")}
							</span>
						</div>
					)}
					
					<hr className="border-border/50 my-1.5" />
					
					<div className="flex justify-between text-lg text-text font-black">
						<span>{isRtl ? "الإجمالي" : "Total"}</span>
						<span className="text-primary text-xl">
							{Number(order.total || 0).toLocaleString("en-US")} {order.currency || (isRtl ? "ج.م" : "EGP")}
						</span>
					</div>
				</div>
			</div>

		</div>
	);
};

export default OrderDetails;
