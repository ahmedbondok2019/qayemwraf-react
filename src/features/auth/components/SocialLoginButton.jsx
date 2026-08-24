import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";

const GoogleIcon = () => (
	<svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
		<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4 20.53 7.7 23 12 23z" fill="#34A853"/>
		<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
		<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 4 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
	</svg>
);

const FacebookIcon = () => (
	<svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" fill="#1877F2"/>
		<path d="M16.143 14.708l.467-3.622h-3.587V8.773c0-1.048.291-1.763 1.795-1.763l1.918-.001v-3.24c-.332-.044-1.47-.143-2.795-.143-2.766 0-4.659 1.688-4.659 4.788v2.671H6.154v3.622h3.128V24h3.587v-9.292h3.274z" fill="#FFF"/>
	</svg>
);

const AppleIcon = () => (
	<svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M16.634 10.373c-.029-2.585 2.112-3.829 2.208-3.889-1.2-1.758-3.072-1.996-3.753-2.023-1.597-.16-3.118.941-3.931.941-.81 0-2.054-.917-3.376-.89-1.722.028-3.315.999-4.205 2.548-1.802 3.127-.461 7.747 1.298 10.288.86 1.241 1.868 2.628 3.197 2.576 1.272-.054 1.76-.826 3.3-.826 1.536 0 1.977.826 3.328.799 1.378-.027 2.234-1.258 3.088-2.502.986-1.442 1.393-2.839 1.411-2.915-.031-.013-2.73-1.048-2.765-4.107zM15.42 6.541c.697-.843 1.168-2.016 1.04-3.191-1.009.041-2.228.672-2.946 1.512-.572.666-1.135 1.86-1.001 3.013 1.13.088 2.207-.491 2.907-1.334z" fill="#000" className="dark:fill-white"/>
	</svg>
);

export const SocialLoginButton = ({ provider = "google", onClick }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const providers = {
		google: {
			label: { en: "Continue with Google", ar: "متابعة باستخدام جوجل" },
			icon: GoogleIcon,
			bg: "bg-surface-2 border-border/60 hover:bg-border/30 text-text hover:text-text"
		},
		facebook: {
			label: { en: "Continue with Facebook", ar: "متابعة باستخدام فيسبوك" },
			icon: FacebookIcon,
			bg: "bg-[#1877F2]/10 border-[#1877F2]/20 hover:bg-[#1877F2]/20 text-[#1877F2]"
		},
		apple: {
			label: { en: "Continue with Apple", ar: "متابعة باستخدام أبل" },
			icon: AppleIcon,
			bg: "bg-surface-2 border-border/60 hover:bg-border/30 text-text hover:text-text"
		}
	};

	const config = providers[provider] || providers.google;
	const Icon = config.icon;

	return (
		<button
			type="button"
			onClick={onClick}
			className={`flex items-center justify-center gap-3 w-full h-12 rounded-xl border font-bold text-sm transition-all cursor-pointer ${config.bg}`}
		>
			<Icon />
			<span>{config.label[language]}</span>
		</button>
	);
};

export default SocialLoginButton;
