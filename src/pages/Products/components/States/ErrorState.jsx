import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export const ErrorState = ({ onRetry, message }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-red-50/50 border border-red-100 rounded-3xl w-full my-8">
			<div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6 relative">
				<AlertTriangle className="w-10 h-10 text-red-500" strokeWidth={2} />
			</div>
			
			<h3 className="text-2xl font-extrabold text-red-900 mb-3 tracking-tight">
				{isRtl ? "عذراً، حدث خطأ ما" : "Oops, something went wrong"}
			</h3>
			
			<p className="text-red-700/80 max-w-sm mb-8 text-base font-medium">
				{message || (isRtl 
					? "لم نتمكن من تحميل المنتجات الطبية المطلوبة. يرجى التحقق من اتصالك والمحاولة مرة أخرى." 
					: "We couldn't load the requested medical products. Please check your connection and try again.")}
			</p>

			{onRetry && (
				<button 
					onClick={onRetry}
					className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-sm shadow-red-600/20 active:scale-[0.98] transition-all"
				>
					<RefreshCcw className={cn("w-5 h-5", isRtl && "scale-x-[-1]")} />
					{isRtl ? "إعادة المحاولة" : "Try Again"}
				</button>
			)}
		</div>
	);
};

export default ErrorState;
