import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { WifiOff, RefreshCcw } from "lucide-react";

export const NoInternetState = ({ onRetry }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="flex flex-col items-center justify-center py-20 px-4 text-center">
			<div className="w-24 h-24 bg-surface-2 text-text-secondary rounded-full flex items-center justify-center mb-6">
				<WifiOff className="w-12 h-12" strokeWidth={1.5} />
			</div>
			
			<h3 className="text-2xl font-extrabold text-text mb-3">
				{isRtl ? "لا يوجد اتصال بالإنترنت" : "No Internet Connection"}
			</h3>
			
			<p className="text-text-secondary max-w-sm mb-8">
				{isRtl 
					? "يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى لضمان عرض أحدث المنتجات." 
					: "Please check your network connection and try again to view our latest products."}
			</p>

			{onRetry && (
				<button 
					onClick={onRetry}
					className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover shadow-sm transition-colors"
				>
					<RefreshCcw className="w-5 h-5" />
					{isRtl ? "إعادة المحاولة" : "Reconnect & Retry"}
				</button>
			)}
		</div>
	);
};

export default NoInternetState;
