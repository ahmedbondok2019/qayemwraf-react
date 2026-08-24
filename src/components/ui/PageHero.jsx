import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { cn } from "@/lib/utils";

/**
 * PageHero Component
 * A compact internal page hero banner for non-homepage pages.
 *
 * @variant API:
 * - title: { en, ar } — Main page heading
 * - subtitle: { en, ar } — Optional description
 * - count: number — Optional product/item count badge
 * - countLabel: { en, ar } — Optional label for count (defaults to "Products")
 * - breadcrumbs: Array — Array of breadcrumb items
 */
export const PageHero = ({ title, subtitle, count, countLabel, breadcrumbs, bgImage, className }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const defaultCountLabel = { en: "Products", ar: "منتج" };
	const resolvedCountLabel = countLabel || defaultCountLabel;

	// Default subtle medical abstract background image
	const backdropUrl = bgImage || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600";

	return (
		<div
			className={cn(
				"relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-900 border-b border-border/40 overflow-hidden",
				className
			)}
		>
			{/* Subtle Background Image & Soft Gradient Overlay */}
			<div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
				<img 
					src={backdropUrl} 
					alt="" 
					className="w-full h-full object-cover opacity-35 dark:opacity-15 mix-blend-multiply dark:mix-blend-normal transition-opacity duration-300"
				/>
				<div className={cn(
					"absolute inset-0 bg-gradient-to-r",
					isRtl 
						? "from-slate-50/90 via-slate-50/70 to-blue-50/40 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-blue-950/30" 
						: "from-slate-50/90 via-slate-50/70 to-blue-50/40 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-blue-950/30"
				)} />
			</div>

			{/* Decorative Dot Grid */}
			<div className="absolute top-2 end-6 w-28 h-36 opacity-20 pointer-events-none">
				<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<pattern id="pageHeroDots" width="18" height="18" patternUnits="userSpaceOnUse">
							<circle cx="2" cy="2" r="1.5" fill="currentColor" className="text-primary opacity-60 dark:opacity-30" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#pageHeroDots)" />
				</svg>
			</div>

			<Container className="relative z-10 py-14 sm:py-20 md:py-24 flex flex-col gap-6">
				{breadcrumbs && breadcrumbs.length > 0 && (
					<Breadcrumb items={breadcrumbs} className="py-0 border-b-0" />
				)}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
					{/* Title & Subtitle */}
					<div className="flex flex-col gap-2">
						<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text tracking-tight">
							{title?.[language] || title}
						</h1>
						{subtitle && (
							<p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
								{subtitle?.[language] || subtitle}
							</p>
						)}
					</div>

					{/* Product Count Badge */}
					{count != null && (
						<div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm md:text-base font-bold shrink-0 shadow-sm shadow-primary/20">
							<span>
								{count.toLocaleString("en-US")} {resolvedCountLabel[language]}
							</span>
						</div>
					)}
				</div>
			</Container>
		</div>
	);
};

export default PageHero;
