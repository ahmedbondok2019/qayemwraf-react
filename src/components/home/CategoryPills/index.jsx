import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { ArrowLeft, ArrowRight, Sparkles, Layers } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * Premium Showcased Categories Layout
 * Features a large highlight promo banner on the left (or right based on RTL/LTR)
 * and a grid of card categories with customized backgrounds, badge icons, and details.
 */
export const CategoriesSection = ({ categories = [], isLoading }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const categoriesToDisplay = categories || [];

	if (isLoading && (!categories || categories.length === 0)) {
		return (
			<Section bg="background" spacing="sm" className="overflow-hidden">
				<Container>
					<div className="h-6 w-48 bg-slate-200 animate-pulse rounded-md mb-6"></div>
					<div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[400px]">
						<div className="md:col-span-4 bg-slate-100 animate-pulse rounded-3xl h-full"></div>
						<div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4 h-full">
							{[...Array(6)].map((_, i) => (
								<div key={i} className="bg-slate-100 animate-pulse rounded-2xl h-full w-full"></div>
							))}
						</div>
					</div>
				</Container>
			</Section>
		);
	}

	if (!isLoading && categoriesToDisplay.length === 0) return null;

	// Extract first category for the large featured promo card
	const featuredCategory = categoriesToDisplay[0];
	const gridCategories = categoriesToDisplay.slice(1, 9); // Display next 8 categories in a grid

	// Premium background colors for grid cards to look exactly like the reference design
	const cardColors = [
		{ bg: "bg-blue-50/70 dark:bg-blue-950/20", border: "border-blue-100 dark:border-blue-900/40", text: "text-blue-600 dark:text-blue-400" },
		{ bg: "bg-amber-50/70 dark:bg-amber-950/20", border: "border-amber-100 dark:border-amber-900/40", text: "text-amber-600 dark:text-amber-400" },
		{ bg: "bg-purple-50/70 dark:bg-purple-950/20", border: "border-purple-100 dark:border-purple-900/40", text: "text-purple-600 dark:text-purple-400" },
		{ bg: "bg-emerald-50/70 dark:bg-emerald-950/20", border: "border-emerald-100 dark:border-emerald-900/40", text: "text-emerald-600 dark:text-emerald-400" },
		{ bg: "bg-rose-50/70 dark:bg-rose-950/20", border: "border-rose-100 dark:border-rose-900/40", text: "text-rose-600 dark:text-rose-400" },
		{ bg: "bg-indigo-50/70 dark:bg-indigo-950/20", border: "border-indigo-100 dark:border-indigo-900/40", text: "text-indigo-600 dark:text-indigo-400" },
		{ bg: "bg-sky-50/70 dark:bg-sky-950/20", border: "border-sky-100 dark:border-sky-900/40", text: "text-sky-600 dark:text-sky-400" },
		{ bg: "bg-teal-50/70 dark:bg-teal-950/20", border: "border-teal-100 dark:border-teal-900/40", text: "text-teal-600 dark:text-teal-400" }
	];

	const getLocalized = (field) => {
		if (!field) return "";
		if (typeof field === "string") return field;
		return field[language] || field.en || field.ar || "";
	};

	return (
		<Section bg="background" spacing="sm" className="overflow-hidden py-8 sm:py-12">
			<Container>
				{/* Top Title Bar */}
				<div className="flex items-end justify-between gap-4 mb-8">
					<div>
						<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
							<Sparkles size={14} />
							<span>{isRtl ? "تصنيفات حصرية" : "Showcased Categories"}</span>
						</div>
						<h2 className="text-xl sm:text-2xl md:text-3xl font-black text-text tracking-tight">
							{isRtl ? "أقسام وتجهيزات التخزين" : "Storage & Equipment Categories"}
						</h2>
					</div>
					<LocalizedLink
						to="/categories"
						className="group inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors"
					>
						<span>{isRtl ? "كل الأقسام" : "All Categories"}</span>
						{isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
					</LocalizedLink>
				</div>

				{/* Two Column Layout (Large featured on one side, Grid on the other) */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
					
					{/* Column 1: Featured Category Large Showcase (Col Span 4) */}
					{featuredCategory && (() => {
						const featuredTitle = getLocalized(featuredCategory.title) || getLocalized(featuredCategory.name);
						const featuredLink = featuredCategory.link && typeof featuredCategory.link === "string" && featuredCategory.link.startsWith("/")
							? featuredCategory.link
							: `/category/${featuredCategory.id || featuredCategory.link}`;
						
						return (
							<LocalizedLink
								to={featuredLink}
								className="lg:col-span-4 rounded-3xl bg-gradient-to-b from-blue-500/10 to-blue-600/20 border border-blue-500/20 p-6 md:p-8 flex flex-col justify-between shadow-sm relative group overflow-hidden min-h-[350px] lg:min-h-auto"
							>
								{/* Decorative details */}
								<div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
								
								{/* Product Image inside the large layout */}
								<div className="w-full flex items-center justify-center flex-grow py-4">
									<img
										src={featuredCategory.image}
										alt={featuredTitle}
										className="max-h-[220px] object-contain transition-transform duration-500 group-hover:scale-105"
									/>
								</div>

								{/* Bottom info bar */}
								<div className="relative z-10 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-md flex items-center justify-between border border-border/40 mt-4">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
											<Layers size={18} />
										</div>
										<div>
											<h3 className="text-sm font-bold text-text line-clamp-1">
												{featuredTitle}
											</h3>
											<span className="text-[10px] text-text-muted">
												{isRtl ? "مختلف المقاسات والأحمال" : "All dimensions & loads"}
											</span>
										</div>
									</div>
									<span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
										{isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
									</span>
								</div>
							</LocalizedLink>
						);
					})()}

					{/* Column 2: 8-Category Grid (Col Span 8) */}
					<div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
						{gridCategories.map((item, idx) => {
							const title = getLocalized(item.title) || getLocalized(item.name);
							const linkUrl = item.link && typeof item.link === "string" && item.link.startsWith("/")
								? item.link
								: `/category/${item.id || item.link}`;
							
							const theme = cardColors[idx % cardColors.length];

							return (
								<LocalizedLink
									key={item.id || idx}
									to={linkUrl}
									className="group rounded-2xl p-4 bg-white dark:bg-slate-900 border border-border/50 hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
								>
									{/* Top: Photo on subtle premium colored backdrop */}
									<div className={cn("w-full aspect-[4/3] rounded-xl flex items-center justify-center p-3 relative overflow-hidden", theme.bg, "border", theme.border)}>
										<img
											src={item.image}
											alt={title}
											className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-108"
										/>
									</div>

									{/* Bottom: Info Bar */}
									<div className="mt-3.5 flex items-end justify-between">
										<div className="space-y-0.5">
											<h3 className="text-xs sm:text-sm font-bold text-text group-hover:text-primary transition-colors line-clamp-1">
												{title}
											</h3>
											<span className="text-[10px] text-text-muted block">
												{isRtl ? "مختلف المقاسات" : "All Dimensions"}
											</span>
										</div>

										<span className={cn("w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white shrink-0", theme.text)}>
											{isRtl ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
										</span>
									</div>
								</LocalizedLink>
							);
						})}
					</div>

				</div>
			</Container>
		</Section>
	);
};

export default CategoriesSection;
