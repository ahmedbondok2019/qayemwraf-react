import React from "react";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Icon } from "@/components/ui/Icon";
import LocalizedLink from "@/components/ui/LocalizedLink";

export const AboutUsSection = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const features = [
		{
			icon: "ShieldCheck",
			title: isRtl ? "جودة فائقة ومضمونة" : "High Guaranteed Quality",
			desc: isRtl
				? "تصنيع طبقاً لأعلى معايير السلامة والجودة العالمية باستخدام أفضل أنواع الصلب."
				: "Manufactured according to international safety standards using top-tier steel."
		},
		{
			icon: "Truck",
			title: isRtl ? "توصيل وتركيب سريع" : "Fast Delivery & Assembly",
			desc: isRtl
				? "فريق متخصص في التوصيل والتركيب الاحترافي لضمان أقصى درجات الثبات والأمان."
				: "Professional installation team guaranteeing complete stability and safety."
		},
		{
			icon: "Headphones",
			title: isRtl ? "استشارات وحلول مخصصة" : "Customized Solutions & Support",
			desc: isRtl
				? "نقدم دراسات هندسية وتصاميم تخزين تناسب مساحتك واحتياجاتك الفعالة."
				: "Free engineering consultations and customized designs fitting your space."
		}
	];

	const stats = [
		{ value: "+15", label: isRtl ? "عاماً خبرة" : "Years Exp." },
		{ value: "+5000", label: isRtl ? "مشروع مكتمل" : "Projects" },
		{ value: "+100%", label: isRtl ? "رضا العملاء" : "Satisfaction" },
		{ value: "+50", label: isRtl ? "مهندس وفني" : "Experts" }
	];

	return (
		<section className="py-16 md:py-24 bg-surface-2 relative overflow-hidden border-y border-border/50">
			{/* Decorative background glow */}
			<div className="absolute top-1/2 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

			<Container>
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
					{/* Left / Images Composite Multi-Layer Layout */}
					<div className="lg:col-span-6 relative">
						<div className="relative mx-auto max-w-lg lg:max-w-none">
							
							{/* Top Row: Two Complementary Images */}
							<div className="grid grid-cols-12 gap-4 items-end">
								{/* Image 1: Main Warehouse Storage (Span 7) */}
								<div className="col-span-7 relative rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-surface shadow-xl group">
									<img
										src="/images/about-warehouse.jpg"
										alt={isRtl ? "أنظمة تخزين قائم ورف" : "Qayem W Raf Storage Systems"}
										className="w-full h-[220px] sm:h-[280px] object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
									<div className="absolute bottom-3 start-3 end-3 text-white">
										<span className="text-[10px] font-bold text-primary bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
											{isRtl ? "تجهيز مستودعات" : "Warehousing"}
										</span>
										<p className="text-xs font-bold mt-1 line-clamp-1">
											{isRtl ? "أنظمة تخزين متطورة" : "Advanced Storage Systems"}
										</p>
									</div>
								</div>

								{/* Image 2: Engineers & Team Inspection (Span 5) */}
								<div className="col-span-5 relative rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-surface shadow-xl group -translate-y-4">
									<img
										src="/images/about-engineer.jpg"
										alt={isRtl ? "فريق العمل والاستشارات" : "Engineering Consultation"}
										className="w-full h-[180px] sm:h-[230px] object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
									<div className="absolute bottom-3 start-3 end-3 text-white">
										<span className="text-[10px] font-bold text-white bg-primary/80 px-2 py-0.5 rounded backdrop-blur-sm">
											{isRtl ? "دراسات هندسية" : "Engineering"}
										</span>
									</div>
								</div>
							</div>

							{/* Bottom Row / Floating Detail Component */}
							<div className="grid grid-cols-12 gap-4 mt-4 items-start">
								{/* Image 3: Racks & Metal Shelving Precision (Span 6) */}
								<div className="col-span-6 relative rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-surface shadow-xl group">
									<img
										src="/images/about-shelving.jpg"
										alt={isRtl ? "دقة تصنيع الأرفف" : "Metal Shelving Precision"}
										className="w-full h-[140px] sm:h-[170px] object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
									<div className="absolute bottom-2.5 start-3 end-3 text-white">
										<p className="text-[11px] font-bold">
											{isRtl ? "أعلى معايير المتانة والصلب" : "Heavy Duty Steel Quality"}
										</p>
									</div>
								</div>

								{/* Interactive Experience Badge Card (Span 6) */}
								<div className="col-span-6 rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-surface border-2 border-primary/20 shadow-xl flex flex-col justify-center gap-2">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-md shadow-primary/30 shrink-0">
											<Icon name="Award" size={22} />
										</div>
										<div>
											<div className="text-xl sm:text-2xl font-black text-primary leading-none">+15</div>
											<div className="text-[11px] font-extrabold text-text mt-0.5">
												{isRtl ? "عاماً من الخبرة" : "Years of Experience"}
											</div>
										</div>
									</div>
									<p className="text-[10px] text-text-muted leading-tight border-t border-border/50 pt-2 mt-1">
										{isRtl
											? "ثقة متجددة مع كبرى الشركات والمستودعات في مصر."
											: "Trusted by major warehouses & enterprises across Egypt."}
									</p>
								</div>
							</div>

						</div>
					</div>

					{/* Right / Content Column */}
					<div className="lg:col-span-6 space-y-6">
						<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
							<Icon name="Building2" size={16} />
							<span>{isRtl ? "عن قائم ورف" : "About Qayem W Raf"}</span>
						</div>

						<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text leading-tight">
							{isRtl ? (
								<>
									الرائدون في تقديم <span className="text-primary">أنظمة وحلول التخزين</span> المعدني المتكاملة
								</>
							) : (
								<>
									Leaders in Providing Integrated <span className="text-primary">Metal Storage Solutions</span>
								</>
							)}
						</h2>

						<p className="text-text-secondary text-sm md:text-base leading-relaxed">
							{isRtl
								? "شركة قائم ورف متخصصة في تصميم، تصنيع، وتوريد كافة حلول التخزين والمستلزمات المعدنية للمخازن والشركات والمصانع. نلتزم بأعلى معايير المتانة والسلامة لتوفير بيئة تخزين منظمة وفعالة تلبي تطلعات عملائنا."
								: "Qayem W Raf specializes in designing, manufacturing, and supplying comprehensive storage solutions and metal equipment for warehouses and companies, committed to high durability and safety standards."}
						</p>

						{/* Stats Row */}
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-border/60">
							{stats.map((stat, idx) => (
								<div key={idx} className="text-center sm:text-start">
									<div className="text-xl sm:text-2xl font-black text-primary">{stat.value}</div>
									<div className="text-[11px] font-semibold text-text-muted">{stat.label}</div>
								</div>
							))}
						</div>

						{/* Features List */}
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
							{features.map((item, idx) => (
								<div key={idx} className="p-3.5 rounded-2xl bg-surface border border-border/60 shadow-sm hover:border-primary/40 transition-all duration-300">
									<div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2.5">
										<Icon name={item.icon} size={18} />
									</div>
									<h3 className="font-bold text-text text-xs mb-1">{item.title}</h3>
									<p className="text-text-muted text-[11px] leading-normal">{item.desc}</p>
								</div>
							))}
						</div>

						{/* CTA link */}
						<div className="pt-2">
							<LocalizedLink
								to="/about"
								className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-all duration-300 shadow-md shadow-primary/20 hover:-translate-y-0.5"
							>
								<span>{isRtl ? "اكتشف المزيد عنا" : "Discover More About Us"}</span>
								<Icon name={isRtl ? "ArrowLeft" : "ArrowRight"} size={16} />
							</LocalizedLink>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default AboutUsSection;
