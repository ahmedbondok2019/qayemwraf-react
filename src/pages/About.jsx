import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { 
	Award, 
	ShieldCheck, 
	Truck, 
	Headphones, 
	Target, 
	Eye, 
	CheckCircle2, 
	Sparkles, 
	PhoneCall, 
	Building2, 
	Check,
	ArrowRight,
	ArrowLeft
} from "lucide-react";
import { useAbout } from "@/hooks/queries/useAbout";
import { cn } from "@/lib/utils";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { resolveImageUrl, FALLBACK_IMAGES } from "@/lib/imageUtils";

/**
 * Map icon name from snake_case/kebab-case/any string to valid Lucide icon component
 */
const getFeatureIcon = (iconName) => {
	const lower = String(iconName || "").toLowerCase().trim();
	switch (lower) {
		case "shield_check":
		case "shield":
		case "quality":
			return ShieldCheck;
		case "truck":
		case "delivery":
		case "shipping":
			return Truck;
		case "headphones":
		case "headphone":
		case "support":
		case "service":
			return Headphones;
		case "award":
		case "star":
			return Award;
		case "building":
		case "building2":
			return Building2;
		default:
			return ShieldCheck;
	}
};

export const About = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const { data: aboutData, isLoading } = useAbout();

	// Localized Translation & Meta
	const currentTranslation = Array.isArray(aboutData?.translations)
		? aboutData.translations.find((t) => t.locale === language)
		: null;

	const title = currentTranslation?.title || aboutData?.title || (isRtl ? "من نحن" : "About Us");
	const badge = aboutData?.badge || (isRtl ? "عن قائم ورف" : "About Qayem & Raf");

	// Content resolution with fallback for legacy bookstore dummy text
	const rawContent = currentTranslation?.content || aboutData?.content;
	const isBookstorePlaceholder = (html) => {
		if (!html) return false;
		const str = String(html).toLowerCase();
		return str.includes("مكتبتنا") || str.includes("bookstore") || str.includes("كتب لجميع");
	};

	const content = !rawContent || isBookstorePlaceholder(rawContent)
		? (isRtl
			? "<p>مؤسسة قائم ورف هي صرح صناعي وهندسي رائد متخصص في تصنيع، توريد، وتركيب أنظمة وحلول التخزين المعدني للمصانع والمستودعات والشركات الكبرى بأعلى معايير المتانة والسلامة العالمية.</p>"
			: "<p>Qayem & Raf is a leading engineering and industrial enterprise specialized in manufacturing, supplying, and installing high-grade metal storage solutions and shelving for warehouses, factories, and commercial enterprises.</p>")
		: rawContent;

	// Stats
	const defaultStats = [
		{ value: "15+", label: isRtl ? "عاماً خبرة" : "Years Experience" },
		{ value: "5000+", label: isRtl ? "مشروع مكتمل" : "Completed Projects" },
		{ value: "100%+", label: isRtl ? "رضا العملاء" : "Client Satisfaction" },
		{ value: "50+", label: isRtl ? "مهندس وفني" : "Engineers & Experts" },
	];
	const stats = Array.isArray(aboutData?.stats) && aboutData.stats.length > 0
		? aboutData.stats.map(s => ({
			value: s.value || "15+",
			label: typeof s.label === "object" ? (s.label[language] || s.label.ar || s.label.en) : (s.label || "")
		}))
		: defaultStats;

	// Features
	const defaultFeatures = [
		{
			icon: "shield_check",
			title: isRtl ? "جودة فائقة ومضمونة" : "Guaranteed Superior Quality",
			description: isRtl
				? "تصنيع طبقاً لأعلى معايير السلامة والجودة العالمية باستخدام أفضل أنواع الصلب."
				: "Manufactured to the highest international safety and quality standards using prime steel."
		},
		{
			icon: "truck",
			title: isRtl ? "توصيل وتركيب سريع" : "Fast Delivery & Assembly",
			description: isRtl
				? "فريق متخصص في التوصيل والتركيب الاحترافي لضمان أقصى درجات الثبات والأمان."
				: "Specialized team in fast delivery and professional assembly ensuring maximum stability."
		},
		{
			icon: "headphones",
			title: isRtl ? "استشارات وحلول مخصصة" : "Customized Solutions & Support",
			description: isRtl
				? "نقدم دراسات هندسية وتصاميم تخزين تناسب مساحتك واحتياجاتك الفعالة."
				: "We provide engineering studies and storage designs tailored to your space and requirements."
		}
	];
	const features = Array.isArray(aboutData?.features) && aboutData.features.length > 0
		? aboutData.features.map(f => ({
			icon: f.icon || "shield_check",
			title: typeof f.title === "object" ? (f.title[language] || f.title.ar || f.title.en) : (f.title || ""),
			description: typeof f.description === "object" ? (f.description[language] || f.description.ar || f.description.en) : (f.description || "")
		}))
		: defaultFeatures;

	// Gallery & Images
	const defaultGallery = [
		{
			image: "https://admin.qayemwraf.com/website/images/about/engineering_studies.jpg",
			title: isRtl ? "دراسات هندسية واستشارات مساحية" : "Engineering Studies & Layout Planning"
		},
		{
			image: "https://admin.qayemwraf.com/website/images/about/warehouse_equipment.jpg",
			title: isRtl ? "تجهيز مستودعات - أنظمة تخزين متطورة" : "Warehouse Equipping - Advanced Racking"
		},
		{
			image: "https://admin.qayemwraf.com/website/images/about/durability_steel.jpg",
			title: isRtl ? "أعلى معايير المتانة والصلب المعالج" : "Heavy Duty Treated Steel Standards"
		}
	];

	const gallery = Array.isArray(aboutData?.gallery) && aboutData.gallery.length > 0
		? aboutData.gallery.map((g, idx) => ({
			image: resolveImageUrl(g.image || g.url || g, defaultGallery[idx]?.image || FALLBACK_IMAGES.ABOUT_1),
			title: typeof g.title === "object" ? (g.title[language] || g.title.ar || g.title.en) : (g.title || defaultGallery[idx]?.title || "")
		}))
		: (Array.isArray(aboutData?.images) && aboutData.images.length > 0
			? aboutData.images.map((img, idx) => ({
				image: resolveImageUrl(img, defaultGallery[idx]?.image || FALLBACK_IMAGES.ABOUT_1),
				title: defaultGallery[idx]?.title || ""
			}))
			: defaultGallery);

	// Experience Card
	const expCard = aboutData?.experience_card || {
		years: "15+",
		title: isRtl ? "15+ عاماً من الخبرة والريادة" : "15+ Years of Leadership",
		subtitle: isRtl ? "ثقة متجددة مع كبرى الشركات والمستودعات في مصر." : "Trusted by major enterprises across Egypt."
	};

	const expYears = expCard.years || "15+";
	const expTitle = typeof expCard.title === "object" ? (expCard.title[language] || expCard.title.ar || expCard.title.en) : (expCard.title || (isRtl ? "15+ عاماً من الخبرة" : "15+ Years Experience"));
	const expSubtitle = typeof expCard.subtitle === "object" ? (expCard.subtitle[language] || expCard.subtitle.ar || expCard.subtitle.en) : (expCard.subtitle || expCard.text || "");

	// Button CTA
	const button = aboutData?.button || {};
	const buttonText = typeof button.text === "object" ? (button.text[language] || button.text.ar || button.text.en) : (button.text || (isRtl ? "طلب استشارة هندسية" : "Request Consultation"));
	const buttonLink = button.link === "/about-us" || !button.link ? "/contact" : button.link;

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "About Us", ar: "من نحن" } }
	];

	const heroImage = gallery[0]?.image || FALLBACK_IMAGES.ABOUT_1;

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-20 overflow-hidden relative">
			{/* Decorative ambient background glows */}
			<div className="absolute top-0 left-1/4 w-[550px] h-[550px] bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
			<div className="absolute top-[35%] right-0 w-[450px] h-[450px] bg-secondary/5 rounded-full blur-3xl pointer-events-none translate-x-1/3" />

			{/* ── 1. Hero Section ── */}
			<div className="relative pt-8 pb-16 md:py-20 border-b border-border/60 bg-surface/50">
				<Container>
					<Breadcrumb items={breadcrumbItems} className="mb-6" />

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
						{/* Left: Text Info */}
						<div className="lg:col-span-7 flex flex-col gap-6 text-start">
							{/* Badge */}
							<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black w-fit">
								<Sparkles className="w-3.5 h-3.5 animate-pulse text-primary" />
								<span>{badge}</span>
							</div>

							{/* Main Title */}
							<h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-text leading-[1.2] tracking-tight">
								{isRtl ? (
									<>
										الرواد في تصنيع وتوريد <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">حلول التخزين المعدني</span> المتكاملة
									</>
								) : (
									<>
										Pioneering in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">Industrial Metal Storage</span> & Shelving
									</>
								)}
							</h1>

							{/* Content HTML */}
							{isLoading ? (
								<div className="space-y-3 py-2">
									<div className="h-4 bg-surface-2 animate-pulse rounded w-full" />
									<div className="h-4 bg-surface-2 animate-pulse rounded w-5/6" />
									<div className="h-4 bg-surface-2 animate-pulse rounded w-4/6" />
								</div>
							) : (
								<div
									className="text-text-secondary text-base md:text-lg leading-relaxed space-y-3 prose dark:prose-invert max-w-none"
									dangerouslySetInnerHTML={{ __html: content }}
								/>
							)}

							{/* CTA & Experience Action */}
							<div className="flex flex-wrap items-center gap-4 pt-2">
								<LocalizedLink
									to={buttonLink}
									className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-extrabold text-sm shadow-lg shadow-primary/25 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
								>
									<span>{buttonText}</span>
									{isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
								</LocalizedLink>

								<LocalizedLink
									to="/projects"
									className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-surface-2 hover:bg-surface-3 text-text font-bold text-sm border border-border/80 transition-all duration-300"
								>
									<span>{isRtl ? "تصفح مشاريعنا السابقة" : "View Our Portfolio"}</span>
								</LocalizedLink>
							</div>
						</div>

						{/* Right: Hero Image with Floating Experience Badge */}
						<div className="lg:col-span-5 relative">
							<div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-surface group bg-surface">
								<img
									src={heroImage}
									alt="Qayem & Raf Facilities"
									onError={(e) => { e.currentTarget.src = FALLBACK_IMAGES.ABOUT_1; }}
									className="w-full h-[340px] sm:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
								
								{/* Floating Experience Card Badge */}
								<div className="absolute bottom-4 start-4 end-4 p-4 rounded-2xl bg-surface/90 dark:bg-slate-900/90 backdrop-blur-md border border-border/80 shadow-xl flex items-center gap-4">
									<div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-md shadow-primary/30 shrink-0">
										<Award className="w-6 h-6" />
									</div>
									<div className="flex flex-col min-w-0">
										<div className="flex items-center gap-2">
											<span className="text-lg font-black text-primary">{expYears}</span>
											<span className="text-xs font-extrabold text-text truncate">{expTitle}</span>
										</div>
										{expSubtitle && (
											<span className="text-[11px] text-text-muted font-medium line-clamp-1 mt-0.5">
												{expSubtitle}
											</span>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</div>

			<Container className="mt-14 space-y-16 sm:space-y-20">
				
				{/* ── 2. Live Stats Counter Section ── */}
				<div className="relative rounded-3xl p-8 md:p-12 border border-border/80 bg-surface/70 backdrop-blur-xl shadow-xl shadow-black/5 overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-center relative z-10">
						{stats.map((stat, idx) => (
							<div key={idx} className="flex flex-col gap-1.5 group">
								<span className="text-4xl sm:text-5xl font-black text-primary group-hover:scale-105 transition-transform duration-300 inline-block">
									{stat.value}
								</span>
								<span className="text-xs sm:text-sm font-bold text-text-secondary uppercase tracking-wider">
									{stat.label}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* ── 3. Features & Value Pillars Section ── */}
				<div>
					<div className="text-center max-w-2xl mx-auto mb-10">
						<div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider mb-2">
							<ShieldCheck className="w-4 h-4" />
							<span>{isRtl ? "لماذا تختار قائم ورف؟" : "Why Choose Qayem & Raf?"}</span>
						</div>
						<h2 className="text-2xl sm:text-3xl font-black text-text">
							{isRtl ? "معايير هندسية متقدمة وجودة لا تضاهى" : "Advanced Engineering Standards & Unmatched Quality"}
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{features.map((item, idx) => {
							const IconComponent = getFeatureIcon(item.icon);
							return (
								<div
									key={idx}
									className="p-7 rounded-3xl bg-surface border border-border/70 shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 group"
								>
									<div className="w-13 h-13 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner">
										<IconComponent className="w-6 h-6" />
									</div>
									<h3 className="text-lg font-black text-text group-hover:text-primary transition-colors">
										{item.title}
									</h3>
									<p className="text-sm text-text-secondary leading-relaxed">
										{item.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>

				{/* ── 4. Gallery & Work Showcase ── */}
				{gallery.length > 0 && (
					<div>
						<div className="text-center max-w-2xl mx-auto mb-10">
							<div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider mb-2">
								<Building2 className="w-4 h-4" />
								<span>{isRtl ? "معرض أعمالنا وتجهيزاتنا" : "Our Facilities & Manufacturing"}</span>
							</div>
							<h2 className="text-2xl sm:text-3xl font-black text-text">
								{isRtl ? "معدات متطورة ودراسات هندسية دقيقة" : "Advanced Equipment & Precision Engineering"}
							</h2>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{gallery.map((item, idx) => (
								<div
									key={idx}
									className="group relative rounded-3xl overflow-hidden border-2 border-border/60 shadow-lg bg-surface aspect-[4/3]"
								>
									<img
										src={item.image}
										alt={item.title || "Gallery Item"}
										onError={(e) => { e.currentTarget.src = FALLBACK_IMAGES.ABOUT_2; }}
										className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
									<div className="absolute bottom-4 start-4 end-4 text-white">
										<span className="text-sm font-bold leading-tight line-clamp-2 drop-shadow-sm">
											{item.title}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* ── 5. Mission & Vision Section ── */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Mission */}
					<div className="group relative bg-surface border border-border/70 p-8 sm:p-10 rounded-3xl flex flex-col gap-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
						<div className="w-13 h-13 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
							<Target className="w-6 h-6" />
						</div>
						<h3 className="text-2xl font-black text-text">
							{isRtl ? "رسالتنا" : "Our Mission"}
						</h3>
						<p className="text-text-secondary leading-relaxed text-sm md:text-base">
							{isRtl
								? "تمكين المؤسسات والشركات والمصانع في مصر من تحسين مساحاتها التخزينية بأعلى كفاءة وأفضل الحلول المعدنية المبتكرة المعتمدة طبقاً لأعلى معايير السلامة الصناعية."
								: "Empowering enterprises and warehouses across Egypt to optimize their storage capacity efficiently with innovative, high-standard metal racking solutions."}
						</p>
					</div>

					{/* Vision */}
					<div className="group relative bg-surface border border-border/70 p-8 sm:p-10 rounded-3xl flex flex-col gap-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
						<div className="w-13 h-13 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
							<Eye className="w-6 h-6" />
						</div>
						<h3 className="text-2xl font-black text-text">
							{isRtl ? "رؤيتنا" : "Our Vision"}
						</h3>
						<p className="text-text-secondary leading-relaxed text-sm md:text-base">
							{isRtl
								? "أن نكون الشريك الصناعي والهندسي الأول والأكثر موثوقية في الشرق الأوسط في قطاع تصنيع وتجهيز أنظمة وحلول التخزين المعدني والمستودعات الذكية."
								: "To be the premier and most trusted engineering partner in the Middle East for industrial metal storage solutions and smart warehouse infrastructure."}
						</p>
					</div>
				</div>

				{/* ── 6. Certification & Trust Banner ── */}
				<div className="bg-gradient-to-r from-surface-2 via-surface to-surface-2 border border-border/80 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
					<div className="flex flex-col gap-3 text-start max-w-2xl">
						<div className="flex items-center gap-3">
							<div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500">
								<Award className="w-6 h-6" />
							</div>
							<h3 className="text-xl sm:text-2xl font-black text-text">
								{isRtl ? "مؤسسة صناعية وهندسية معتمدة" : "Certified Engineering & Industrial Enterprise"}
							</h3>
						</div>
						<p className="text-sm text-text-secondary leading-relaxed">
							{isRtl
								? "نلتزم بأعلى معايير الجودة والمتانة وتحمل الأوزان الثقيلة، ونوفر لعملائنا شهادات ضمان شاملة وخدمات تركيب ودعم فني متخصص بعد البيع."
								: "We adhere to the highest international quality, heavy load bearing, and industrial safety standards with comprehensive warranty and assembly services."}
						</p>
					</div>

					{/* Badges */}
					<div className="flex flex-wrap items-center gap-3 shrink-0 justify-center">
						<div className="flex items-center gap-2 px-5 py-3 bg-surface border border-border rounded-2xl shadow-sm text-xs font-black text-text">
							<CheckCircle2 className="w-4 h-4 text-primary" />
							<span>ISO 9001:2015</span>
						</div>
						<div className="flex items-center gap-2 px-5 py-3 bg-surface border border-border rounded-2xl shadow-sm text-xs font-black text-text">
							<CheckCircle2 className="w-4 h-4 text-primary" />
							<span>HEAVY DUTY CERTIFIED</span>
						</div>
					</div>
				</div>

			</Container>
		</div>
	);
};

export default About;
