import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";

export const AuthFooter = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="flex flex-col items-center gap-2 mt-8 text-center text-xs text-text-muted font-bold select-none">
			<div className="flex gap-4">
				<LocalizedLink to="/terms" className="hover:text-primary transition-colors hover:underline">
					{isRtl ? "شروط الاستخدام" : "Terms of Service"}
				</LocalizedLink>
				<span className="text-border/60">•</span>
				<LocalizedLink to="/privacy" className="hover:text-primary transition-colors hover:underline">
					{isRtl ? "سياسة الخصوصية" : "Privacy Policy"}
				</LocalizedLink>
			</div>
			<p className="mt-2 text-[10px] text-text-muted/60 leading-normal max-w-xs">
				{isRtl
					? "من خلال المتابعة، فإنك توافق على الشروط الطبية والترخيصات المطلوبة لشراء وتوزيع الأجهزة والمستلزمات الطبية."
					: "By proceeding, you agree to our medical terms and required licensing guidelines for healthcare supply purchases."}
			</p>
		</div>
	);
};

export default AuthFooter;
