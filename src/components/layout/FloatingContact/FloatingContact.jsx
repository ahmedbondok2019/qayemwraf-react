import React, { useState, useEffect } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { useSettings } from "@/hooks/queries/useSettings";
import { cn } from "@/lib/utils";
import { X, Sparkles, Phone, MessageSquare } from "lucide-react";

/**
 * FloatingContact Component
 * Features clean, identical WhatsApp & Messenger action buttons with an interactive
 * welcoming speech bubble popup and optional support card.
 */
export const FloatingContact = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const { data: settings } = useSettings();

	const [isBubbleVisible, setIsBubbleVisible] = useState(true);

	// WhatsApp number resolution
	const rawWhatsapp = settings?.social_links?.whatsapp || settings?.phone || "01154813836";
	let cleanWhatsapp = rawWhatsapp.replace(/\D/g, "");
	if (cleanWhatsapp.startsWith("01")) {
		cleanWhatsapp = "2" + cleanWhatsapp;
	} else if (!cleanWhatsapp.startsWith("20") && cleanWhatsapp.length === 10 && cleanWhatsapp.startsWith("1")) {
		cleanWhatsapp = "20" + cleanWhatsapp;
	}
	const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
		isRtl ? "مرحباً، أود الاستفسار عن تفاصيل وأسعار حلول التخزين والأرفف المعدنية لدى قائم ورف." : "Hello, I would like to inquire about Qayem & Raf storage systems and shelving."
	)}`;

	// Messenger / Facebook resolution
	const facebookUrl = settings?.social_links?.facebook || "https://facebook.com";
	let messengerUrl = "https://m.me";
	try {
		if (facebookUrl && facebookUrl.includes("facebook.com/")) {
			const segments = facebookUrl.split("facebook.com/")[1]?.split(/[\/?#]/)[0];
			if (segments && segments !== "profile.php") {
				messengerUrl = `https://m.me/${segments}`;
			} else {
				messengerUrl = facebookUrl;
			}
		} else {
			messengerUrl = facebookUrl;
		}
	} catch {
		messengerUrl = facebookUrl;
	}

	const phone = settings?.phone || "01154813836";

	return (
		<aside 
			aria-label={isRtl ? "أزرار التواصل السريع" : "Quick contact buttons"}
			className="fixed bottom-6 end-6 z-[999] flex flex-col gap-3 items-end select-none"
		>
			
			{/* ── Welcome Speech Bubble Popup ── */}
			{isBubbleVisible && (
				<div 
					className={cn(
						"relative mb-1 bg-surface/95 dark:bg-slate-900/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl p-3.5 max-w-[260px] sm:max-w-[280px] transition-all duration-300 animate-in fade-in slide-in-from-bottom-3",
						"text-start"
					)}
				>
					{/* Close Bubble Button */}
					<button
						onClick={(e) => {
							e.stopPropagation();
							setIsBubbleVisible(false);
						}}
						className="absolute -top-2 -start-2 w-5 h-5 rounded-full bg-surface border border-border shadow-md flex items-center justify-center text-text-muted hover:text-text text-xs cursor-pointer transition-colors"
						aria-label={isRtl ? "إغلاق الرسالة" : "Close message"}
					>
						<X className="w-3 h-3" />
					</button>

					{/* Header with Live Pulse */}
					<div className="flex items-center gap-2 mb-1.5">
						<span className="relative flex h-2.5 w-2.5">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
							<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
						</span>
						<span className="text-xs font-black text-text">
							{isRtl ? "فريق المبيعات والدعم متصل 👋" : "Sales Team is Online 👋"}
						</span>
					</div>

					<p className="text-[11.5px] text-text-secondary leading-snug">
						{isRtl 
							? "مرحباً بك في قائم ورف! هل تود استشارة هندسية أو عرض أسعار سريع؟" 
							: "Welcome to Qayem & Raf! Need an engineering consultation or quick quote?"}
					</p>

					{/* Triangle pointer */}
					<div 
						className={cn(
							"absolute -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-surface dark:border-t-slate-900 drop-shadow-sm",
							isRtl ? "start-6" : "end-6"
						)} 
					/>
				</div>
			)}

			{/* ── Messenger Floating Button ── */}
			<div className="relative flex items-center group animate-float-gentle">
				{/* Hover Tooltip */}
				<div
					className={cn(
						"absolute whitespace-nowrap bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 z-50",
						isRtl ? "left-full ms-3" : "right-full me-3",
						"hidden sm:block"
					)}
				>
					{isRtl ? "تواصل عبر ماسنجر" : "Chat on Messenger"}
				</div>

				<a
					href={messengerUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={isRtl ? "تواصل عبر ماسنجر" : "Chat on Messenger"}
					className="flex items-center justify-center w-12.5 h-12.5 sm:w-13.5 sm:h-13.5 rounded-full bg-[#0084FF] hover:bg-[#0074e0] text-white shadow-lg shadow-[#0084FF]/25 hover:shadow-xl hover:shadow-[#0084FF]/40 hover:scale-110 active:scale-95 transition-all duration-300"
				>
					<svg className="w-6.5 h-6.5 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
						<path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.43 3.16 7.15.16.14.26.35.26.57l-.08 1.78c-.03.73.74 1.22 1.37.86l1.99-1.12c.18-.1.39-.14.6-.11.87.24 1.79.37 2.7.37 5.64 0 10-4.13 10-9.7S17.64 2 12 2Zm1.18 13.06-2.6-2.77a.64.64 0 0 0-.91 0l-3.56 2.71c-.48.37-1.1-.17-.83-.71l3.75-7.39a.64.64 0 0 1 .91-.3l2.6 2.77a.64.64 0 0 0 .91 0l3.56-2.71c.48-.37 1.1.17.83.71l-3.75 7.39a.64.64 0 0 1-.91.3Z"/>
					</svg>
				</a>
			</div>

			{/* ── WhatsApp Floating Button ── */}
			<div className="relative flex items-center group animate-float-gentle-delayed">
				{/* Hover Tooltip */}
				<div
					className={cn(
						"absolute whitespace-nowrap bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 z-50",
						isRtl ? "left-full ms-3" : "right-full me-3",
						"hidden sm:block"
					)}
				>
					{isRtl ? "راسلنا على واتساب" : "Chat on WhatsApp"}
				</div>

				<a
					href={whatsappUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={isRtl ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
					className="flex items-center justify-center w-12.5 h-12.5 sm:w-13.5 sm:h-13.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg shadow-[#25D366]/25 hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300"
				>
					<svg className="w-6.5 h-6.5 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
						<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
					</svg>
				</a>
			</div>

		</aside>
	);
};

export default FloatingContact;
