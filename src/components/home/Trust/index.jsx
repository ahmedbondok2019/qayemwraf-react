import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ShieldCheck, Award, FileBadge, Globe, Users, TrendingUp, ArrowRight, ArrowLeft } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

export const TrustSection = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const stats = [
		{ id: 1, icon: Users, value: "10,000+", label: { en: "Happy Clients", ar: "عميل سعيد" } },
		{ id: 2, icon: Globe, value: "15+", label: { en: "Global Partners", ar: "شريك عالمي" } },
		{ id: 3, icon: TrendingUp, value: "20+", label: { en: "Years Experience", ar: "سنوات خبرة" } },
	];

	return (
		<Section bg="primary" spacing="lg" className="text-white overflow-hidden relative">
			{/* Decorative Elements */}
			<div className="absolute top-0 ltr:-right-40 rtl:-left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute bottom-0 ltr:-left-40 rtl:-right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

			<Container className="relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					{/* Text & Stats */}
					<div className="space-y-8">
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-bold backdrop-blur-md border border-white/20">
							<ShieldCheck className="w-4 h-4 text-white" />
							{isRtl ? "الموزع الرسمي المعتمد في مصر" : "Authorized Official Distributor in Egypt"}
						</div>

						<h2 className="text-display font-bold leading-tight">
							{isRtl ? (
								<>شريكك الموثوق <span className="text-primary-light">EG Medical</span> للأجهزة الطبية العالمية</>
							) : (
								<>Your Trusted <span className="text-primary-light">EG Medical</span> Partner for Global Medical Devices</>
							)}
						</h2>

						<p className="text-white/80 text-lg leading-relaxed max-w-xl">
							{isRtl
								? "نحن نفخر بكوننا الموزع الرسمي والوكيل المعتمد لأكبر العلامات التجارية الطبية العالمية. نضمن لك منتجات أصلية 100%، ضمان الوكيل، ودعم فني متخصص."
								: "We take pride in being the official distributor and authorized agent for the world's leading medical brands. We guarantee 100% original products, official warranties, and specialized technical support."}
						</p>

						{/* Trust Numbers */}
						<div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
							{stats.map((stat) => {
								const IconComp = stat.icon;
								return (
									<div key={stat.id} className="flex flex-col gap-2">
										<IconComp className="w-6 h-6 text-primary-light" />
										<span className="text-3xl font-bold text-white">{stat.value}</span>
										<span className="text-sm font-medium text-white/70">{stat.label[language]}</span>
									</div>
								);
							})}
						</div>

						{/* Primary CTA */}
						<div className="pt-4">
							<LocalizedLink to="/about" className="inline-flex items-center gap-2 bg-white text-primary hover:bg-surface px-8 py-4 rounded-[14px] font-bold transition-colors">
								{isRtl ? "اكتشف قصة نجاحنا" : "Discover Our Story"}
								{isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
							</LocalizedLink>
						</div>
					</div>

					{/* Visual Side: Certificates & Timeline Grid */}
					<div className="relative w-full aspect-square md:aspect-[4/3] grid grid-cols-2 grid-rows-2 gap-4">
						{/* Cert 1 */}
						<div className="row-span-2 rounded-[32px] bg-white/10 backdrop-blur-md border border-white/20 p-8 flex flex-col items-center justify-center text-center hover:bg-white/15 transition-colors">
							<Award className="w-16 h-16 text-primary-light mb-4" />
							<h3 className="text-xl font-bold text-white mb-2">{isRtl ? "ضمان الوكيل" : "Official Warranty"}</h3>
							<p className="text-white/70 text-sm">{isRtl ? "تغطية شاملة وصيانة معتمدة لجميع الأجهزة" : "Comprehensive coverage & certified maintenance"}</p>
						</div>

						{/* Cert 2 */}
						<div className="rounded-[32px] bg-white/5 backdrop-blur-md border border-white/10 p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
							<FileBadge className="w-12 h-12 text-primary-light mb-3" />
							<h3 className="text-lg font-bold text-white mb-1">{isRtl ? "ISO 9001" : "ISO 9001"}</h3>
							<p className="text-white/60 text-xs">{isRtl ? "شهادة الجودة العالمية" : "Global Quality Certificate"}</p>
						</div>

						{/* Cert 3 */}
						<div className="rounded-[32px] bg-primary-dark/50 backdrop-blur-md border border-white/10 p-6 flex flex-col items-center justify-center text-center hover:bg-primary-dark/80 transition-colors">
							<ShieldCheck className="w-12 h-12 text-primary-light mb-3" />
							<h3 className="text-lg font-bold text-white mb-1">{isRtl ? "منتجات أصلية" : "Genuine Products"}</h3>
							<p className="text-white/60 text-xs">{isRtl ? "100% موثوقية" : "100% Authenticity"}</p>
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default TrustSection;


