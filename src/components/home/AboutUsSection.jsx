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

	// Map icon name from snake_case/kebab-case/any string to valid PascalCase Lucide icon
	const mapIconName = (name) => {
		if (!name) return "ShieldCheck";
		const lower = String(name).toLowerCase().trim();
		const iconAliasMap = {
			shield_check: "ShieldCheck",
			shield: "ShieldCheck",
			truck: "Truck",
			delivery: "Truck",
			shipping: "Truck",
			headphone: "Headphones",
			headphones: "Headphones",
			support: "Headphones",
			service: "Headphones",
			award: "Award",
			quality: "Award",
			badge: "Award",
			star: "Star",
			clock: "Clock",
			time: "Clock",
			speed: "Zap",
			zap: "Zap",
			tools: "Wrench",
			wrench: "Wrench",
			settings: "Settings",
			gear: "Settings",
			users: "Users",
			team: "Users",
			box: "Package",
			package: "Package",
			warehouse: "Warehouse",
			factory: "Factory",
			check_circle: "CheckCircle",
			check: "CheckCircle",
			building: "Building2"
		};

		if (iconAliasMap[lower]) return iconAliasMap[lower];

		const cleaned = lower
			.split(/[_\-\s]+/)
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join("");

		return cleaned || "ShieldCheck";
	};

	// Extract payload from various possible nesting paths
	const rawData = data?.about || data?.about_us || data?.data?.about || data?.data || data || {};

	// Fallback stats
	const defaultStats = [
		{ value: "15+", label: isRtl ? "عاماً خبرة" : "Years Exp." },
		{ value: "5000+", label: isRtl ? "مشروع مكتمل" : "Projects" },
		{ value: "100%+", label: isRtl ? "رضا العملاء" : "Satisfaction" },
		{ value: "50+", label: isRtl ? "مهندس وفني" : "Experts" }
	];

	// Fallback features
	const defaultFeatures = [
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

	// Extract API values with resilient fallbacks
	const badge = resolveText(rawData.badge || data.badge, isRtl ? "عن قائم ورف" : "About Qayem W Raf");
	
	const isBookstorePlaceholder = (html) => {
		if (!html) return false;
		const str = String(html).toLowerCase();
		return str.includes("مكتبتنا") || str.includes("bookstore") || str.includes("كتب لجميع") || str.includes("الكتب");
	};

	const rawTitle = rawData.title || data.title;
	const title = !rawTitle || isBookstorePlaceholder(rawTitle) || rawTitle === "من نحن"
		? (isRtl
			? "الرائدون في تقديم أنظمة وحلول التخزين المعدني المتكاملة"
			: "Leaders in Providing Integrated Metal Storage Solutions")
		: resolveText(rawTitle);

	const rawContent = rawData.content || data.content;
	const content = !rawContent || isBookstorePlaceholder(rawContent)
		? (isRtl
			? "<p>شركة قائم ورف متخصصة في تصميم، تصنيع، وتوريد كافة حلول التخزين والمستلزمات المعدنية للمخازن والشركات والمصانع. نلتزم بأعلى معايير المتانة والسلامة لتوفير بيئة تخزين منظمة وفعالة تلبي تطلعات عملائنا.</p>"
			: "<p>Qayem W Raf specializes in designing, manufacturing, and supplying comprehensive storage solutions and metal equipment for warehouses and companies, committed to high durability and safety standards.</p>")
		: rawContent;

	// Stats parsing
	const rawStats = rawData.stats || data.stats;
	const stats = Array.isArray(rawStats) && rawStats.length > 0
		? rawStats.map((s) => ({
				value: s.value || s.number || s.count || "15+",
				label: resolveText(s.label || s.title || s.name, isRtl ? "إحصائية" : "Stat")
		  }))
		: defaultStats;

	// Features parsing
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
	const expTitle = resolveText(experienceCard.title, isRtl ? "عاماً من الخبرة" : "Years of Experience");
	const expText = resolveText(
		experienceCard.text || experienceCard.subtitle,
		isRtl
			? "ثقة متجددة مع كبرى الشركات والمستودعات في مصر."
			: "Trusted by major warehouses & enterprises across Egypt."
	);

	// Button / CTA
	const button = rawData.button || data.button || {};
	const buttonText = resolveText(button.text, isRtl ? "اكتشف المزيد عنا" : "Discover More About Us");
	const rawButtonLink = button.link || "/about";
	const buttonLink = rawButtonLink === "/about-us" ? "/about" : rawButtonLink;

	// Extract Gallery / Images
	const galleryList = Array.isArray(rawData.gallery) && rawData.gallery.length > 0
		? rawData.gallery
		: (Array.isArray(data.gallery) && data.gallery.length > 0
			? data.gallery
			: (Array.isArray(rawData.images) && rawData.images.length > 0
				? rawData.images
				: (Array.isArray(data.images) && data.images.length > 0
					? data.images
					: [])));

	// Fallback curated images
	const defaultImages = [
		{
			image: FALLBACK_IMAGES.ABOUT_1,
			badge: isRtl ? "تجهيز مستودعات" : "Warehousing",
			title: isRtl ? "أنظمة تخزين متطورة" : "Advanced Storage Systems"
		},
		{
			image: FALLBACK_IMAGES.ABOUT_2,
			badge: isRtl ? "دراسات هندسية" : "Engineering Studies",
			title: isRtl ? "دراسات هندسية" : "Engineering Studies"
		},
		{
			image: FALLBACK_IMAGES.ABOUT_3,
			badge: "",
			title: isRtl ? "أعلى معايير المتانة والصلب" : "Heavy Duty Steel Quality"
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
			<section className="py-8 md:py-12 relative overflow-hidden">
				<Container>
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-pulse">
						<div className="lg:col-span-6 grid grid-cols-2 gap-4">
							<div className="h-64 bg-surface rounded-3xl border border-border/40" />
							<div className="h-64 bg-surface rounded-3xl border border-border/40 -translate-y-4" />
							<div className="h-44 bg-surface rounded-3xl border border-border/40" />
							<div className="h-44 bg-surface rounded-3xl border border-border/40" />
						</div>
						<div className="lg:col-span-6 space-y-4">
							<div className="h-6 w-32 bg-surface rounded-full" />
							<div className="h-10 w-3/4 bg-surface rounded-xl" />
							<div className="h-20 w-full bg-surface rounded-xl" />
							<div className="h-12 w-full bg-surface rounded-xl" />
						</div>
					</div>
				</Container>
			</section>
		);
	}

	return (
		<section className="py-8 md:py-12 relative overflow-hidden">
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
								<div className="col-span-7 relative rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-surface shadow-xl group bg-surface">
									<img
										src={item1.image}
										alt={item1.title || "About Qayem W Raf"}
										onError={(e) => { e.currentTarget.src = FALLBACK_IMAGES.ABOUT_1; }}
										className="w-full h-[220px] sm:h-[280px] object-cover transition-transform duration-700 group-hover:scale-105"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
									<div className="absolute bottom-3 start-3 end-3 text-white">
										{item1.badge && (
											<span className="text-[10px] font-bold text-primary bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm inline-block">
												{item1.badge}
											</span>
										)}
										{item1.title && (
											<p className="text-xs font-bold mt-1 line-clamp-1">
												{item1.title}
											</p>
										)}
									</div>
								</div>

								{/* Image 2: Engineers & Team Inspection (Span 5) */}
								<div className="col-span-5 relative rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-surface shadow-xl group -translate-y-4 bg-surface">
									<img
										src={item2.image}
										alt={item2.badge || item2.title || "Engineering Team"}
										onError={(e) => { e.currentTarget.src = FALLBACK_IMAGES.ABOUT_2; }}
										className="w-full h-[180px] sm:h-[230px] object-cover transition-transform duration-700 group-hover:scale-105"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
									<div className="absolute bottom-3 start-3 end-3 text-white">
										{(item2.badge || item2.title) && (
											<span className="text-[10px] font-bold text-white bg-primary/90 px-2 py-0.5 rounded backdrop-blur-sm inline-block">
												{item2.badge || item2.title}
											</span>
										)}
									</div>
								</div>
							</div>

							{/* Bottom Row / Floating Detail Component */}
							<div className="grid grid-cols-12 gap-4 mt-4 items-start">
								{/* Image 3: Racks & Metal Shelving Precision (Span 6) */}
								<div className="col-span-6 relative rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-surface shadow-xl group bg-surface">
									<img
										src={item3.image}
										alt={item3.title || "Precision Steel Manufacturing"}
										onError={(e) => { e.currentTarget.src = FALLBACK_IMAGES.ABOUT_3; }}
										className="w-full h-[140px] sm:h-[170px] object-cover transition-transform duration-700 group-hover:scale-105"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
									<div className="absolute bottom-2.5 start-3 end-3 text-white">
										{item3.title && (
											<p className="text-[11px] font-bold line-clamp-1">
												{item3.title}
											</p>
										)}
									</div>
								</div>

								{/* Interactive Experience Badge Card (Span 6) */}
								<div className="col-span-6 rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-surface border-2 border-primary/20 shadow-xl flex flex-col justify-center gap-2">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-md shadow-primary/30 shrink-0">
											<Icon name="Award" size={22} />
										</div>
										<div>
											<div className="text-xl sm:text-2xl font-black text-primary leading-none">{expYears}</div>
											<div className="text-[11px] font-extrabold text-text mt-0.5">
												{expTitle}
											</div>
										</div>
									</div>
									<p className="text-[10px] text-text-muted leading-tight border-t border-border/50 pt-2 mt-1">
										{expText}
									</p>
								</div>
							</div>

						</div>
					</div>

					{/* Right / Content Column */}
					<div className="lg:col-span-6 space-y-6">
						{badge && (
							<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
								<Icon name="Building2" size={16} />
								<span>{badge}</span>
							</div>
						)}

						<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text leading-tight">
							{title}
						</h2>

						{/* Content paragraph / HTML */}
						{typeof content === "string" && content.includes("<") ? (
							<div
								className="text-text-secondary text-sm md:text-base leading-relaxed prose dark:prose-invert max-w-none [&>p]:mb-3 [&>p:last-child]:mb-0"
								dangerouslySetInnerHTML={{ __html: content }}
							/>
						) : (
							<p className="text-text-secondary text-sm md:text-base leading-relaxed">
								{content}
							</p>
						)}

						{/* Stats Row */}
						{stats.length > 0 && (
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-border/60">
								{stats.map((stat, idx) => (
									<div key={idx} className="text-center sm:text-start">
										<div className="text-xl sm:text-2xl font-black text-primary">{stat.value}</div>
										<div className="text-[11px] font-semibold text-text-muted">{stat.label}</div>
									</div>
								))}
							</div>
						)}

						{/* Features List */}
						{features.length > 0 && (
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
								{features.map((item, idx) => (
									<div key={idx} className="p-3.5 rounded-2xl bg-surface border border-border/60 shadow-sm hover:border-primary/40 transition-all duration-300">
										<div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2.5">
											<Icon name={item.icon} size={18} />
										</div>
										<h3 className="font-bold text-text text-xs mb-1">{item.title}</h3>
										{item.desc && (
											<p className="text-text-muted text-[11px] leading-normal">{item.desc}</p>
										)}
									</div>
								))}
							</div>
						)}

						{/* CTA link */}
						{buttonText && (
							<div className="pt-2">
								<LocalizedLink
									to={buttonLink}
									className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-all duration-300 shadow-md shadow-primary/20 hover:-translate-y-0.5"
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
