import React from "react";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * ProductGallerySection
 * 4-Column Staggered Offset Grid Gallery with large image area and concise card information.
 */
export const ProductGallerySection = ({
	title,
	subtitle,
	viewAllLink = "/projects",
	bg = "background",
	products = [],
	isLoading
}) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	// Filter and format items
	const items = (products || [])
		.filter((p) => p.primary_image || p.image)
		.map((apiProd, idx) => {
			const targetSlug =
				apiProd.slug ||
				apiProd._apiOriginal?.slug ||
				apiProd.id?.toString().replace("prod-", "");

			const isProjectGallery = viewAllLink?.includes("/projects");
			const basePath = isProjectGallery ? "/projects" : "/products";

			const resolvedTitle =
				typeof apiProd.title === "object"
					? apiProd.title[language] || apiProd.title.ar || apiProd.title.en
					: apiProd.title || apiProd.name || (isRtl ? "مشروع تجهيز مستودع" : "Warehouse Fitout Project");

			const resolvedCategory =
				typeof apiProd.category === "object"
					? (apiProd.category.title?.[language] || apiProd.category.title?.ar || apiProd.category[language] || apiProd.category.ar || apiProd.category.en)
					: (typeof apiProd.category?.title === "string" ? apiProd.category.title : (apiProd.category || (isRtl ? "حلول التخزين الصناعي" : "Industrial Storage")));

			const year = apiProd.completionDate ? (apiProd.completionDate.includes("-") ? apiProd.completionDate.split("-")[0] : apiProd.completionDate) : "2026";

			return {
				id: apiProd.id || idx,
				image: apiProd.primary_image || apiProd.image,
				title: resolvedTitle,
				category: resolvedCategory,
				year,
				link: `${basePath}/${targetSlug}`
			};
		});

	if (!isLoading && items.length === 0) return null;

	if (isLoading && items.length === 0) {
		return (
			<Section bg={bg} spacing="md" className="overflow-hidden">
				<Container>
					<div className="h-8 w-56 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-md mb-8"></div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
						<div className="space-y-4">
							<div className="bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl h-80 w-full"></div>
							<div className="bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl h-80 w-full"></div>
						</div>
						<div className="space-y-4 pt-0 sm:pt-12 lg:pt-16">
							<div className="bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl h-80 w-full"></div>
							<div className="bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl h-80 w-full"></div>
						</div>
						<div className="space-y-4">
							<div className="bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl h-80 w-full"></div>
							<div className="bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl h-80 w-full"></div>
						</div>
						<div className="space-y-4 pt-0 sm:pt-12 lg:pt-16">
							<div className="bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl h-80 w-full"></div>
							<div className="bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl h-80 w-full"></div>
						</div>
					</div>
				</Container>
			</Section>
		);
	}

	// Distribute items across 4 staggered columns
	const numCols = 4;
	const cols = [[], [], [], []];
	items.forEach((item, index) => {
		cols[index % numCols].push({
			...item,
			index
		});
	});

	// Column offset classes: alternating staggered columns (1 & 3 top, 2 & 4 lowered)
	const colConfig = [
		{ offsetClass: "pt-0" },                   // Column 1
		{ offsetClass: "pt-0 sm:pt-12 lg:pt-16" }, // Column 2
		{ offsetClass: "pt-0" },                   // Column 3
		{ offsetClass: "pt-0 sm:pt-12 lg:pt-16" }  // Column 4
	];

	return (
		<Section bg={bg} spacing="md" className="overflow-hidden">
			<Container>
				{/* Section Header */}
				{(title || viewAllLink) && (
					<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
						<div>
							{title && (
								<h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-text tracking-tight">
									{typeof title === "object" ? title[language] : title}
								</h2>
							)}
							{subtitle && (
								<p className="text-text-secondary text-sm md:text-base mt-1.5 max-w-2xl">
									{typeof subtitle === "object" ? subtitle[language] : subtitle}
								</p>
							)}
						</div>

						{viewAllLink && (
							<LocalizedLink
								to={viewAllLink}
								className="group inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-all self-start sm:self-auto"
							>
								<span>{isRtl ? "عرض كل المشاريع" : "View All Projects"}</span>
								{isRtl ? (
									<ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
								) : (
									<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
								)}
							</LocalizedLink>
						)}
					</div>
				)}

				{/* 4-Column Staggered Offset Grid with Equal Card & Image Sizing */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-start">
					{cols.map((columnItems, colIdx) => (
						<div
							key={colIdx}
							className={cn("flex flex-col gap-5 lg:gap-6", colConfig[colIdx].offsetClass)}
						>
							{columnItems.map((item, itemIdx) => (
								<LocalizedLink
									key={item.id || itemIdx}
									to={item.link}
									className="group flex flex-col w-full rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 bg-surface dark:bg-slate-900/80 border border-border hover:border-primary/60 dark:border-slate-800/90 dark:hover:border-primary/60 shadow-xs hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
								>
									{/* Large Square Aspect Ratio Image (1:1) */}
									<div className="relative w-full aspect-[1/1] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950/40 border border-border/40 dark:border-slate-800 shrink-0">
										<img
											src={item.image}
											alt={item.title}
											className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
											loading="lazy"
										/>
										<div className="absolute top-3 end-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
											<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
												<ArrowUpRight className="w-4 h-4" />
											</div>
										</div>
										<div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</div>

									{/* Card Body Info */}
									<div className="flex flex-col flex-1 pt-3 sm:pt-3.5 justify-between">
										<h3 className="text-xs sm:text-[13.5px] font-bold text-text group-hover:text-primary transition-colors line-clamp-2 leading-relaxed">
											{item.title}
										</h3>
										<div className="flex items-center justify-between gap-2 pt-2.5 mt-2 border-t border-border/60 dark:border-slate-800/80 text-[11px] text-text-muted font-medium">
											<span className="truncate group-hover:text-text transition-colors">
												{item.category}
											</span>
											<span className="font-semibold text-text-secondary shrink-0" dir="ltr">
												{item.year}
											</span>
										</div>
									</div>
								</LocalizedLink>
							))}
						</div>
					))}
				</div>
			</Container>
		</Section>
	);
};

export default ProductGallerySection;
