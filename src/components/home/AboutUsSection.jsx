import React from "react";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Icon } from "@/components/ui/Icon";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { resolveImageUrl, FALLBACK_IMAGES } from "@/lib/imageUtils";

export const AboutUsSection = ({ data = {}, isLoading = false }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	// Helper to extract localized text or string safely
	const resolveText = (val, fallback = "") => {
		if (!val) return fallback;
		if (typeof val === "string") return val;
		if (typeof val === "object") {
			return val[language] || val.ar || val.en || fallback;
		}
		return String(val);
	};

	// Map icon name from snake_case/kebab-case to valid Lucide icon
	const mapIconName = (name) => {
		if (!name) return "ShieldCheck";
		const lower = String(name).toLowerCase().trim();
		const iconAliasMap = {
			shield_check: "ShieldCheck",
			shield: "ShieldCheck",
			truck: "Truck",
			delivery: "Truck",
			headphones: "Headphones",
			support: "Headphones",
			award: "Award",
			quality: "Award",
			wrench: "Wrench",
			settings: "Settings",
			package: "Package",
			warehouse: "Warehouse",
			factory: "Factory",
			check_circle: "CheckCircle",
			building: "Building2"
		};

		if (iconAliasMap[lower]) return iconAliasMap[lower];

		const cleaned = lower
			.split(/[_\-\s]+/)
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join("");

		return cleaned || "ShieldCheck";
	};

	// Extract payload
	const rawData = data?.about || data?.about_us || data?.data?.about || data?.data || data || {};

	// Fallback stats
	const defaultStats = [
		{ value: "15+", label: isRtl ? "عاماً خبرة" : "Years Exp." },
		{ value: "5000+", label: isRtl ? "مشروع مكتمل" : "Projects" },
		{ value: "100%", label: isRtl ? "رضا العملاء" : "Satisfaction" },
		{ value: "50+", label: isRtl ? "مهندس وفني" : "Specialists" }
	];

	// Fallback features
	const defaultFeatures = [
		{
			icon: "ShieldCheck",
			title: isRtl ? "جودة فائقة ومضمونة" : "Guaranteed High Quality",
			desc: isRtl
				? "تصنيع طبقاً لأعلى معايير السلامة والجودة العالمية باستخدام أفضل أنواع الصلب."
				: "Engineered to international safety standards using premium industrial steel."
		},
		{
			icon: "Truck",
			title: isRtl ? "توصيل وتركيب سريع" : "Fast Delivery & Setup",
			desc: isRtl
				? "فريق متخصص في التوريد والتركيب الاحترافي لضمان أقصى درجات الثبات والأمان."
				: "Dedicated technical crews for safe transport, rapid assembly, and anchored stability."
		},
		{
			icon: "Headphones",
			title: isRtl ? "استشارات وحلول مخصصة" : "Customized Solutions",
			desc: isRtl
				? "نقدم دراسات هندسية وتصاميم تخزين تناسب مساحة مستودعك وطبيعة أحمالك."
				: "Tailored layout studies and rack dimensions to match your exact floor area."
		}
	];

	// Badge & Title
	const badge = resolveText(rawData.badge || data.badge, isRtl ? "عن قايم ورف" : "About Qayem & Raf");

	const rawTitle = rawData.title || data.title;
	const title = !rawTitle || rawTitle === "من نحن" || rawTitle === "About Us"
		? (isRtl
			? "رواد تصميم وتصنيع أنظمة التخزين وحلول الأرفف المعدنية الذكية"
			: "Pioneering Industrial Storage Systems & Metal Racking Solutions")
		: resolveText(rawTitle);

	const rawContent = rawData.content || data.content;
	const content = !rawContent
		? (isRtl
			? "<p>شركة قايم ورف متخصصة في تصميم، تصنيع، وتوريد كافة أنظمة التخزين ووحدات الأرفف المعدنية للمستودعات والمخازن والشركات والمحلات التجارية بأعلى معايير المتانة والسلامة.</p>"
			: "<p>Qayem & Raf is a specialized Egyptian company delivering state-of-the-art metal storage racks, heavy-duty warehouse shelving, and custom structural fitouts with high durability and safety.</p>")
		: rawContent;

	// Stats
	const rawStats = rawData.stats || data.stats;
	const stats = Array.isArray(rawStats) && rawStats.length > 0
		? rawStats.map((s) => ({
				value: s.value || s.number || s.count || "15+",
				label: resolveText(s.label || s.title || s.name, isRtl ? "إحصائية" : "Stat")
		  }))
		: defaultStats;

	// Features
	const rawFeatures = rawData.features || data.features;
	const features = Array.isArray(rawFeatures) && rawFeatures.length > 0
		? rawFeatures.map((f) => ({
				icon: mapIconName(f.icon),
				title: resolveText(f.title || f.name, isRtl ? "ميزة" : "Feature"),
				desc: resolveText(f.desc || f.description || f.subtitle, "")
		  }))
		: defaultFeatures;

	// Experience Card
	const experienceCard = rawData.experience_card || data.experience_card || {};
	const expYears = experienceCard.years || "15+";
	const expTitle = resolveText(experienceCard.title, isRtl ? "عاماً من الخبرة والريادة" : "Years of Industrial Expertise");
	const expText = resolveText(
		experienceCard.text || experienceCard.subtitle,
		isRtl
			? "ثقة متجددة مع كبرى الشركات والمستودعات في مصر."
			: "Trusted by top enterprises & warehouses across Egypt."
	);

	// Button
	const button = rawData.button || data.button || {};
	const buttonText = resolveText(button.text, isRtl ? "المزيد عن المصنع" : "Learn More About Us");
	const rawButtonLink = button.link || "/about";
	const buttonLink = rawButtonLink === "/about-us" ? "/about" : rawButtonLink;

	// Images
	const galleryList = Array.isArray(rawData.gallery) && rawData.gallery.length > 0
		? rawData.gallery
		: (Array.isArray(data.gallery) && data.gallery.length > 0
			? data.gallery
			: (Array.isArray(rawData.images) && rawData.images.length > 0
				? rawData.images
				: (Array.isArray(data.images) && data.images.length > 0
					? data.images
					: [])));

	const defaultImages = [
		{
			image: FALLBACK_IMAGES.ABOUT_1,
			badge: isRtl ? "تجهيز مستودعات" : "Warehousing",
			title: isRtl ? "أنظمة تخزين أحمال ثقيلة" : "Heavy Duty Pallet Racking"
		},
		{
			image: FALLBACK_IMAGES.ABOUT_2,
			badge: isRtl ? "دراسات هندسية" : "Engineering Studies",
			title: isRtl ? "تخطيط واستغلال المساحات" : "Space Optimization"
		},
		{
			image: FALLBACK_IMAGES.ABOUT_3,
			badge: isRtl ? "جودة الصلب" : "Steel Quality",
			title: isRtl ? "أعلى معايير المتانة والصلب" : "Durable Electrostatic Coating"
		}
	];

	const getImageItem = (index) => {
		const item = galleryList[index];
		const fallback = defaultImages[index] || defaultImages[0];
		if (!item) return fallback;
		if (typeof item === "string") {
			return {
				image: resolveImageUrl(item, fallback.image),
				badge: fallback.badge,
				title: fallback.title
			};
		}
		return {
			image: resolveImageUrl(item.image || item.url || item.src, fallback.image),
			badge: resolveText(item.badge || item.subtitle, fallback.badge),
			title: resolveText(item.title || item.name, fallback.title)
		};
	};

	const item1 = getImageItem(0);
	const item2 = getImageItem(1);
	const item3 = getImageItem(2);

	if (isLoading) {
		return (
			<section className="py-12 md:py-20 relative overflow-hidden bg-surface-2/40">
				<Container>
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-pulse">
						<div className="lg:col-span-5 h-96 bg-surface rounded-3xl border border-border/40" />
						<div className="lg:col-span-7 space-y-4">
							<div className="h-6 w-32 bg-surface rounded-full" />
							<div className="h-10 w-3/4 bg-surface rounded-xl" />
							<div className="h-24 w-full bg-surface rounded-xl" />
							<div className="h-20 w-full bg-surface rounded-xl" />
						</div>
					</div>
				</Container>
			</section>
		);
	}

	return (
		<section className="py-14 sm:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-surface/40 to-transparent">
			{/* Ambient background glows */}
			<div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

			<Container>
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
					
					{/* Left Column: Visual Collage + Stats + Feature Pillars directly underneath */}
					<div className="lg:col-span-6 flex flex-col gap-6">
						
						{/* Images Composite */}
						<div className="relative mx-auto max-w-lg lg:max-w-none w-full">
							
							{/* Top Row: Main image + Secondary */}
							<div className="grid grid-cols-12 gap-4 items-end">
								{/* Image 1: Main Warehouse Storage (Span 7) */}
								<div className="col-span-7 relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-border/80 shadow-xl group bg-surface">
									<img
										src={item1.image}
										alt={item1.title || "About Qayem W Raf"}
										onError={(e) => { e.currentTarget.src = FALLBACK_IMAGES.ABOUT_1; }}
										className="w-full h-[220px] sm:h-[260px] object-cover transition-transform duration-700 group-hover:scale-105"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
									<div className="absolute bottom-3 start-3 end-3 text-white">
										{item1.badge && (
											<span className="text-[10px] font-bold text-amber-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm inline-block mb-1">
												{item1.badge}
											</span>
										)}
										{item1.title && (
											<p className="text-xs font-bold line-clamp-1">
												{item1.title}
											</p>
										)}
									</div>
								</div>

								{/* Image 2: Secondary Photo (Span 5) */}
								<div className="col-span-5 relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-border/80 shadow-xl group -translate-y-3 bg-surface">
									<img
										src={item2.image}
										alt={item2.title || "Engineering"}
										onError={(e) => { e.currentTarget.src = FALLBACK_IMAGES.ABOUT_2; }}
										className="w-full h-[180px] sm:h-[210px] object-cover transition-transform duration-700 group-hover:scale-105"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
									<div className="absolute bottom-3 start-3 end-3 text-white">
										{item2.title && (
											<span className="text-[10px] font-bold text-white bg-amber-500/90 px-2 py-0.5 rounded backdrop-blur-sm inline-block line-clamp-1">
												{item2.title}
											</span>
										)}
									</div>
								</div>
							</div>

							{/* Bottom Row of Images */}
							<div className="grid grid-cols-12 gap-4 mt-3 sm:mt-4 items-center">
								{/* Image 3 (Span 6) */}
								<div className="col-span-6 relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-border/80 shadow-xl group bg-surface h-[130px] sm:h-[150px]">
									<img
										src={item3.image}
										alt={item3.title || "Steel Fabrication"}
										onError={(e) => { e.currentTarget.src = FALLBACK_IMAGES.ABOUT_3; }}
										className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
									<div className="absolute bottom-2.5 start-3 end-3 text-white">
										{item3.title && (
											<p className="text-[11px] font-bold line-clamp-1">
												{item3.title}
											</p>
										)}
									</div>
								</div>

								{/* Experience Float Card (Span 6) */}
								<div className="col-span-6 rounded-2xl sm:rounded-3xl p-4 bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-xl shadow-amber-500/20 flex flex-col justify-center h-[130px] sm:h-[150px]">
									<div className="flex items-center justify-between mb-1">
										<span className="text-2xl sm:text-3xl font-black">{expYears}</span>
										<div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
											<Icon name="Award" size={18} className="text-white" />
										</div>
									</div>
									<p className="text-xs font-extrabold leading-tight">{expTitle}</p>
									<p className="text-[10px] text-amber-100 line-clamp-2 mt-1">{expText}</p>
								</div>
							</div>

						</div>

						{/* Quick Statistics Bar - Under the images */}
						{stats.length > 0 && (
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-surface border border-border/80 shadow-sm">
								{stats.map((stat, idx) => (
									<div key={idx} className="flex flex-col items-center text-center">
										<span className="text-xl sm:text-2xl font-black text-amber-500 tracking-tight">{stat.value}</span>
										<span className="text-[11px] font-bold text-text-muted mt-0.5">{stat.label}</span>
									</div>
								))}
							</div>
						)}

						{/* 3 Value Pillars / Features Cards - Under the images */}
						{features.length > 0 && (
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
								{features.map((item, idx) => (
									<div 
										key={idx} 
										className="p-3.5 rounded-2xl bg-surface border border-border/70 hover:border-amber-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
									>
										<div>
											<div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
												<Icon name={item.icon} size={16} />
											</div>
											<h3 className="font-bold text-text text-xs mb-1">{item.title}</h3>
											{item.desc && (
												<p className="text-text-muted text-[10.5px] leading-relaxed line-clamp-3">
													{item.desc}
												</p>
											)}
										</div>
									</div>
								))}
							</div>
						)}

					</div>

					{/* Right Column: Text Content & Description & CTA Button */}
					<div className="lg:col-span-6 flex flex-col space-y-6 pt-2">
						
						{/* Badge & Heading */}
						<div>
							{badge && (
								<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/20">
									<Icon name="Building2" size={14} />
									<span>{badge}</span>
								</div>
							)}

							<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text leading-[1.3] tracking-tight">
								{title}
							</h2>
						</div>

						{/* Full Formatted Description Text */}
						{typeof content === "string" && content.includes("<") ? (
							<div
								className="text-text-secondary text-sm sm:text-base leading-relaxed space-y-3.5 prose dark:prose-invert max-w-none [&>p]:leading-relaxed [&>p]:text-text-secondary [&>p]:text-sm sm:[&>p]:text-base [&>p_strong]:text-text [&>p_strong]:font-bold"
								dangerouslySetInnerHTML={{ __html: content }}
							/>
						) : (
							<p className="text-text-secondary text-sm sm:text-base leading-relaxed whitespace-pre-line">
								{content}
							</p>
						)}

						{/* CTA Button */}
						{buttonText && (
							<div className="pt-3">
								<LocalizedLink
									to={buttonLink}
									className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all duration-200"
								>
									<span>{buttonText}</span>
									<Icon name={isRtl ? "ArrowLeft" : "ArrowRight"} size={16} />
								</LocalizedLink>
							</div>
						)}

					</div>

				</div>
			</Container>
		</section>
	);
};

export default AboutUsSection;
