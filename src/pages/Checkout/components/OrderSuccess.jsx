import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";

export const OrderSuccess = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	
	const orderNumber = "ORD-2026-8891";

	return (
		<div className="flex flex-col items-center justify-center min-h-[70vh] py-12">
			<Container className="max-w-2xl flex flex-col items-center text-center">
				
				<div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mb-8 relative">
					<CheckCircle className="w-12 h-12 text-success" strokeWidth={2.5} />
					<div className="absolute inset-0 rounded-full border-4 border-success/20 animate-ping" />
				</div>

				<h1 className="text-3xl md:text-4xl font-extrabold text-text mb-4">
					{isRtl ? "تم تأكيد طلبك بنجاح!" : "Order Confirmed Successfully!"}
				</h1>
				
				<p className="text-text-secondary text-lg mb-8 leading-relaxed max-w-lg">
					{isRtl 
						? "شكراً لتسوقك معنا. قمنا بإرسال بريد إلكتروني يحتوي على تفاصيل الطلب وفاتورة الشراء." 
						: "Thank you for shopping with us. We've sent an email with your order details and invoice."}
				</p>

				<div className="w-full bg-surface-2 rounded-2xl border border-border/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
					<div className="flex items-center gap-4 text-start">
						<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
							<Package className="w-6 h-6" />
						</div>
						<div className="flex flex-col">
							<span className="text-sm font-bold text-text-secondary">{isRtl ? "رقم الطلب" : "Order Number"}</span>
							<span className="text-xl font-extrabold text-text font-mono">{orderNumber}</span>
						</div>
					</div>
					<Link to="/profile/orders" className="w-full sm:w-auto px-6 py-3 bg-surface border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors text-center">
						{isRtl ? "تتبع الطلب" : "Track Order"}
					</Link>
				</div>

				<Link 
					to="/"
					className="flex items-center gap-2 px-8 py-4 bg-primary text-white font-extrabold text-lg rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-[0.98] transition-all"
				>
					{isRtl ? "العودة للرئيسية" : "Return to Home"}
					<ArrowRight className={cn("w-5 h-5", isRtl && "scale-x-[-1]")} />
				</Link>

			</Container>
		</div>
	);
};

export default OrderSuccess;
