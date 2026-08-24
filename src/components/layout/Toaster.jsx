import React from "react";
import { Toaster as SonnerToaster } from "sonner";
import { useLanguage } from "@/app/providers/I18nProvider";

export const Toaster = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	
	return (
		<SonnerToaster 
			position={isRtl ? "bottom-left" : "bottom-right"} 
			richColors 
			dir={isRtl ? "rtl" : "ltr"}
			toastOptions={{
				style: {
					fontFamily: "var(--font-geist-sans)",
				}
			}}
		/>
	);
};

export default Toaster;
