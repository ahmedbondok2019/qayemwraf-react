import React from "react";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { useLanguage } from "@/app/providers/I18nProvider";
import { PhoneCall, MessageCircle, ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { useSettings } from "@/hooks/queries/useSettings";

/**
 * Premium Conversion-Driven CTA Section
 * Designed specifically for Qayem W Raf B2B & industrial warehouse storage solutions.
 */
export const CallToAction = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const { data: settings } = useSettings();

	const phone = settings?.phone || "01203036736";
	const whatsapp = settings?.whatsapp || settings?.phone || "01203036736";
	const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, "");

	const highlights = [
		{ text: isRtl ? "معاينة ودراسة مساحات مجانية" : "Free On-Site Inspection & Study" },
		{ text: isRtl ? "تصنيع طبقاً للمواصفات والأحمال" : "Customized Heavy-Duty Manufacturing" },
		{ text: isRtl ? "ضمان شامل وفريق تركيب محترف" : "Full Warranty & Professional Assembly" }
	];

	return (
		<Section spacing="sm" className="py-8 md:py-16 overflow-hidden">
			<Container>
				<div className="relative rounded-3xl md:rounded-[36px] bg-gradient-to-br from-[#071324] via-[#0b1e36] to-[#122b4d] text-white p-8 sm:p-12 md:p-16 overflow-hidden border border-white/5 shadow-2xl">
					
					{/* Glow & Radial Elements - Subdued & Premium */}
					<div className="absolute top-0 end-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
					<div className="absolute bottom-0 start-0 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/3 via-transparent to-transparent pointer-events-none" />

					<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
						
						{/* Left / Text & Highlights Column */}
						<div className="lg:col-span-7 space-y-6 text-center lg:text-start">
							<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
								<Sparkles size={15} className="text-primary" />
								<span>{isRtl ? "تجهيز وتطوير المستودعات" : "Warehouse Fitout & Storage"}</span>
							</div>

							<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
								{isRtl ? (
									<>
										جاهز لتجهيز مخزنك بأعلى معايير <span className="text-primary">الأمان والاستيعاب؟</span>
									</>
								) : (
									<>
										Ready to equip your facility with <span className="text-primary">Maximum Capacity?</span>
									</>
								)}
							</h2>

							<p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
								{isRtl
									? "تواصل مباشرة مع مهندسينا للحصول على مقايسة هندسية مخصصة وتصميم ثلاثي الأبعاد لنظام التخزين الأنسب لمشروعك بأفضل الأسعار وأعلى جودة تصنيع."
									: "Consult our engineering team today for a tailored quotation and optimal 3D layout storage system built to international safety standards."}
							</p>

							{/* Checklist items */}
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
								{highlights.map((item, idx) => (
									<div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-300 justify-center lg:justify-start">
										<CheckCircle2 size={16} className="text-primary/90 shrink-0" />
										<span>{item.text}</span>
									</div>
								))}
							</div>
						</div>

						{/* Right / Fast Action Buttons & Contact Box */}
						<div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-4 w-full">
							<div className="w-full max-w-sm rounded-2xl bg-white/[0.03] backdrop-blur-lg border border-white/10 p-6 shadow-xl space-y-4">
								<div className="text-center lg:text-start">
									<span className="text-xs font-bold text-primary block">
										{isRtl ? "استجابة فورية" : "Instant Response"}
									</span>
									<h3 className="text-lg font-bold text-white mt-0.5">
										{isRtl ? "تواصل معنا مباشرة الآن" : "Get In Touch Now"}
									</h3>
								</div>

								{/* WhatsApp Button */}
								<a
									href={`https://wa.me/${cleanWhatsapp}`}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-600/10 transform hover:-translate-y-0.5"
								>
									<MessageCircle size={18} />
									<span>{isRtl ? "محادثة واتساب فورية" : "Chat on WhatsApp"}</span>
								</a>

								{/* Direct Phone Call Button */}
								<a
									href={`tel:${phone}`}
									className="flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 transform hover:-translate-y-0.5"
								>
									<PhoneCall size={18} />
									<span>{isRtl ? `اتصل بنا: ${phone}` : `Call Us: ${phone}`}</span>
								</a>

								{/* Secondary Contact Link */}
								<LocalizedLink
									to="/contact"
									className="inline-flex items-center justify-center gap-1.5 w-full text-center text-xs font-bold text-slate-400 hover:text-white transition-colors pt-1"
								>
									<span>{isRtl ? "طلب معاينة وعرض أسعار مفصل" : "Request Detailed Quotation"}</span>
									{isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
								</LocalizedLink>
							</div>
						</div>

					</div>
				</div>
			</Container>
		</Section>
	);
};

export default CallToAction;
