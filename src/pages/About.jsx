import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Award, ShieldCheck, HeartHandshake, Eye, Target, Users, CheckCircle2, ChevronRight, Activity } from "lucide-react";
import { usePages } from "@/hooks/queries/usePages";
import { cn } from "@/lib/utils";

export const About = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const { data: pages = [], isLoading } = usePages();
	const aboutPage = pages.find(p => p.id === 1 || p.title?.includes("من نحن") || p.title?.includes("About") || p.translations?.some(t => t.title?.includes("About") || t.title?.includes("من نحن")));
	
	const pageData = aboutPage ? (aboutPage.translations?.find(t => t.locale === language) || {
		title: aboutPage.title || "",
		content: aboutPage.content || ""
	}) : null;

	const isPlaceholderContent = (content) => {
		if (!content) return true;
		const lower = content.toLowerCase();
		return lower.includes("bookstore") || lower.includes("books for all ages");
	};

	const hasValidContent = pageData?.content && !isPlaceholderContent(pageData.content);
	const pageImage = aboutPage?.image || aboutPage?.primary_image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop";

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "About Us", ar: "من نحن" } }
	];

	const stats = [
		{ value: "500+", label: { en: "Happy Customers", ar: "عميل يثق بنا" } },
		{ value: "1200+", label: { en: "Completed Projects", ar: "مشروع تم تنفيذه" } },
		{ value: "80+", label: { en: "Partner Facilities", ar: "مؤسسة وشركة شريكة" } },
		{ value: "10+", label: { en: "Years of Excellence", ar: "أعوام من الخبرة" } }
	];

	const values = [
		{
			icon: ShieldCheck,
			title: { en: "Certified Quality", ar: "جودة هندسية معتمدة" },
			description: {
				en: "All products undergo rigorous testing to meet industrial safety and load capacity standards.",
				ar: "تخضع جميع منتجاتنا لفحوصات جودة صارمة وتلبي معايير السلامة الصناعية وتحمل الأوزان."
			},
			glow: "hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5"
		},
		{
			icon: HeartHandshake,
			title: { en: "Customer Centric", ar: "العميل أولاً دائماً" },
			description: {
				en: "We build long-term partnerships with our clients, providing engineering support and excellent post-sale services.",
				ar: "نبني شراكات طويلة الأمد مع عملائنا، ونوفر الدعم الهندسي وخدمات ما بعد البيع المتميزة."
			},
			glow: "hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5"
		},
		{
			icon: Users,
			title: { en: "Expert Guidance", ar: "فريق من المهندسين" },
			description: {
				en: "Guided by professional engineers to design and install the most efficient storage systems.",
				ar: "نعمل تحت إشراف مهندسين متخصصين لضمان تصميم وتركيب أفضل أنظمة التخزين وأكثرها كفاءة."
			},
			glow: "hover:shadow-purple-500/10 dark:hover:shadow-purple-500/5"
		}
	];

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-20 overflow-hidden relative">
			{/* Decorative background grids/blobs */}
			<div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
			<div className="absolute top-[30%] right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl pointer-events-none translate-x-1/3" />

			{/* Premium Hero Section */}
			<div className="relative pt-8 pb-16 md:py-20 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
				<Container>
					<Breadcrumb items={breadcrumbItems} className="mb-6" />
					
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
						<div className={cn("flex flex-col gap-6 text-start", pageImage ? "lg:col-span-7" : "lg:col-span-12")}>
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold w-fit">
								<Activity className="w-3.5 h-3.5 animate-pulse" />
								{isRtl ? "شريكك الموثوق في أنظمة التخزين" : "Your Trusted Storage Partner"}
							</div>
							
							<h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
								{isRtl ? (
									<>
										الشركة الرائدة في <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">حلول التخزين المعدني</span> وتجهيز المستودعات
									</>
								) : (
									<>
										Pioneering in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">Metal Storage</span> & Warehousing
									</>
								)}
							</h1>
							{isLoading ? (
								<div className="space-y-3">
									<div className="h-4 bg-slate-200 dark:bg-slate-800 animate-pulse rounded w-full"></div>
									<div className="h-4 bg-slate-200 dark:bg-slate-800 animate-pulse rounded w-5/6"></div>
									<div className="h-4 bg-slate-200 dark:bg-slate-800 animate-pulse rounded w-2/3"></div>
								</div>
							) : hasValidContent ? (
								<div 
									className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-none space-y-4 html-content"
									dangerouslySetInnerHTML={{ __html: pageData.content }}
								/>
							) : (
								<p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
									{isRtl 
										? "قائم ورف هي مؤسسة متخصصة في تصميم وتوريد وتركيب الأرفف وأنظمة التخزين المعدنية عالية الجودة للمستودعات والشركات والمؤسسات التجارية."
										: "Qayem & Raf is specialized in designing, supplying, and installing high-quality metal shelving and storage systems for warehouses and commercial institutions."}
								</p>
							)}
						</div>

						{/* Hero Image / Visual Element - Dynamic based on pageImage */}
						{pageImage && (
							<div className="lg:col-span-5 relative">
								<div className="absolute -inset-2 bg-gradient-to-tr from-primary to-secondary rounded-3xl opacity-20 blur-lg" />
								<div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
									<img 
										src={pageImage}
										alt="Precision Engineering" 
										className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
								</div>
							</div>
						)}
					</div>
				</Container>
			</div>

			<Container className="mt-16">
				{/* Mission & Vision Section */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
					{/* Mission */}
					<div className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl flex flex-col gap-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
						<div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-tr-3xl pointer-events-none" />
						<div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
							<Target className="w-6 h-6" />
						</div>
						<h2 className="text-2xl font-black text-slate-900 dark:text-white">
							{isRtl ? "رسالتنا" : "Our Mission"}
						</h2>
						<p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
							{isRtl
								? "تمكين المؤسسات والشركات في مصر من تحسين مساحاتها التخزينية بأفضل الحلول المعدنية المبتكرة بأعلى معايير الجودة."
								: "To empower institutions and companies in Egypt by optimizing their storage spaces with the best innovative metal solutions at the highest quality standards."}
						</p>
					</div>

					{/* Vision */}
					<div className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl flex flex-col gap-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
						<div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary/5 to-transparent rounded-tr-3xl pointer-events-none" />
						<div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
							<Eye className="w-6 h-6" />
						</div>
						<h2 className="text-2xl font-black text-slate-900 dark:text-white">
							{isRtl ? "رؤيتنا" : "Our Vision"}
						</h2>
						<p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
							{isRtl
								? "أن نكون الشريك الهندسي الأول والأكثر موثوقية في الشرق الأوسط في مجال التخزين وتجهيز المستودعات."
								: "To be the premier and most reliable engineering partner in the Middle East for storage and warehouse equipping."}
						</p>
					</div>
				</div>

				{/* Premium Glassmorphic Stats Section */}
				<div className="relative rounded-3xl overflow-hidden mb-20 p-8 md:p-12 border border-slate-100 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md shadow-lg">
					<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 pointer-events-none" />
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center relative z-10">
						{stats.map((stat, idx) => (
							<div key={idx} className="flex flex-col gap-2 group">
								<span className="text-4xl md:text-5xl font-black text-primary transition-transform group-hover:scale-105 duration-300 inline-block">
									{stat.value}
								</span>
								<span className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
									{stat.label[language]}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Values Grid */}
				<div className="mb-20">
					<div className="text-center max-w-2xl mx-auto mb-12">
						<h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
							{isRtl ? "القيم الأساسية التي نؤمن بها" : "Our Core Values"}
						</h2>
						<p className="text-sm text-slate-500 dark:text-slate-400">
							{isRtl ? "ثقافتنا مبنية على الدقة الهندسية والالتزام بالتميز وتلبية احتياجات العملاء." : "Our culture is built on engineering precision, commitment to excellence, and meeting customer needs."}
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{values.map((val, idx) => {
							const Icon = val.icon;
							return (
								<div 
									key={idx} 
									className={`group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl flex flex-col gap-5 shadow-sm hover:shadow-xl transition-all duration-300 ${val.glow}`}
								>
									<div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800/80 text-primary flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
										<Icon className="w-6 h-6" />
									</div>
									<h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{val.title[language]}</h3>
									<p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{val.description[language]}</p>
								</div>
							);
						})}
					</div>
				</div>

				{/* Licensing & Trust Section */}
				<div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-850 rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
					<div className="flex flex-col gap-3 text-start">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
								<Award className="w-6 h-6" />
							</div>
						<h3 className="text-xl font-black text-slate-900 dark:text-white">
								{isRtl ? "مؤسسة هندسية معتمدة" : "Official Engineering Enterprise"}
							</h3>
						</div>
						<p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
							{isRtl
								? "نحن مؤسسة رائدة تقدم حلول التخزين بأعلى معايير الصناعة، ونلتزم بتقديم منتجات قوية وآمنة للمستودعات بكافة أنواعها، تلبي كافة المعايير الهندسية ومعايير السلامة."
								: "We are a leading institution providing storage solutions with the highest industry standards, committed to offering robust and safe products for all warehouses."}
						</p>
					</div>
					
					{/* Badges */}
					<div className="flex flex-wrap items-center gap-4 shrink-0 justify-center">
						<div className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-xs font-bold text-slate-700 dark:text-slate-300">
							<CheckCircle2 className="w-4 h-4 text-primary" />
							ISO 9001:2015
						</div>
						<div className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-xs font-bold text-slate-700 dark:text-slate-300">
							<CheckCircle2 className="w-4 h-4 text-primary" />
							INDUSTRIAL STANDARD
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default About;
