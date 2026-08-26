import React from "react";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * Staggered Offset Masonry Gallery
 * Split into distinct columns with deliberate top offsets / margins (staggered flow)
 * and varied item heights so no adjacent columns start at the same vertical level.
 */
export const ProductGallerySection = ({
	title,
	subtitle,
	viewAllLink,
	bg = "background",
	products = [],
	isLoading
}) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	// Filter and format product images
	const items = (products || [])
		.filter((p) => p.primary_image || p.image)
		.map((apiProd, idx) => {
			const targetSlug =
				apiProd.slug ||
				apiProd._apiOriginal?.slug ||
				apiProd.id?.toString().replace("prod-", "");

			return {
				id: apiProd.id || idx,
				image: apiProd.primary_image || apiProd.image,
				title:
					typeof apiProd.title === "object"
						? apiProd.title[language] || apiProd.title.ar || apiProd.title.en
						: apiProd.title || apiProd.name || "Product Image",
				link: `/products/${targetSlug}`
			};
		});

	if (!isLoading && items.length === 0) return null;

	if (isLoading && items.length === 0) {
		return (
			<Section bg={bg} spacing="md" className="overflow-hidden">
				<Container>
					<div className="h-8 w-56 bg-slate-200 animate-pulse rounded-md mb-8"></div>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
						<div className="space-y-4">
							<div className="bg-slate-100 animate-pulse rounded-2xl h-64 w-full"></div>
							<div className="bg-slate-100 animate-pulse rounded-2xl h-48 w-full"></div>
						</div>
						<div className="space-y-4 pt-10">
							<div className="bg-slate-100 animate-pulse rounded-2xl h-52 w-full"></div>
							<div className="bg-slate-100 animate-pulse rounded-2xl h-72 w-full"></div>
						</div>
						<div className="space-y-4 pt-4">
							<div className="bg-slate-100 animate-pulse rounded-2xl h-72 w-full"></div>
							<div className="bg-slate-100 animate-pulse rounded-2xl h-44 w-full"></div>
						</div>
						<div className="space-y-4 pt-14">
							<div className="bg-slate-100 animate-pulse rounded-2xl h-48 w-full"></div>
							<div className="bg-slate-100 animate-pulse rounded-2xl h-64 w-full"></div>
						</div>
					</div>
				</Container>
			</Section>
		);
	}

	// Distribute items across 4 staggered columns for rich, unaligned masonry
	const numCols = 4;
	const cols = [[], [], [], []];
	items.forEach((item, index) => {
		cols[index % numCols].push({
			...item,
			index
		});
	});

	// Column offset classes & varied item aspect ratio presets
	const colConfig = [
		{
			offsetClass: "pt-0", // Column 1 starts at top
			aspectRatios: ["aspect-[3/4]", "aspect-[1/1]", "aspect-[4/5]"]
		},
		{
			offsetClass: "pt-8 sm:pt-14 md:pt-16", // Column 2 staggered down
			aspectRatios: ["aspect-[4/3]", "aspect-[3/5]", "aspect-[1/1]"]
		},
		{
			offsetClass: "pt-4 sm:pt-6 md:pt-8", // Column 3 slightly offset
			aspectRatios: ["aspect-[3/5]", "aspect-[4/3]", "aspect-[3/4]"]
		},
		{
			offsetClass: "pt-10 sm:pt-20 md:pt-24", // Column 4 deeply offset down
			aspectRatios: ["aspect-[1/1]", "aspect-[3/4]", "aspect-[4/3]"]
		}
	];

	return (
		<Section bg={bg} spacing="md" className="overflow-hidden py-10 md:py-20">
			<Container>
				{/* Section Header */}
				{(title || viewAllLink) && (
					<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
						<div>
							{title && (
								<h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-text tracking-tight">
									{typeof title === "object" ? title[language] : title}
								</h2>
							)}
							{subtitle && (
								<p className="text-text-secondary text-sm md:text-base mt-1.5">
									{typeof subtitle === "object" ? subtitle[language] : subtitle}
								</p>
							)}
						</div>

						{viewAllLink && (
							<LocalizedLink
								to={viewAllLink}
								className="group inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-all self-start sm:self-auto"
							>
								<span>{isRtl ? "عرض جميع المنتجات" : "View All Products"}</span>
								{isRtl ? (
									<ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
								) : (
									<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
								)}
							</LocalizedLink>
						)}
					</div>
				)}

				{/* 4-Column Staggered Offset Masonry Grid */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-start">
					{cols.map((columnItems, colIdx) => (
						<div
							key={colIdx}
							className={cn("flex flex-col gap-4 md:gap-6", colConfig[colIdx].offsetClass)}
						>
							{columnItems.map((item, itemIdx) => {
								const aspectClass =
									colConfig[colIdx].aspectRatios[
									itemIdx % colConfig[colIdx].aspectRatios.length
									];

								return (
									<LocalizedLink
										key={item.id || itemIdx}
										to={item.link}
										className="group relative block w-full rounded-2xl md:rounded-3xl overflow-hidden bg-surface border border-border shadow-sm hover:shadow-2xl hover:border-primary/50 transition-all duration-500 transform hover:-translate-y-1.5"
									>
										<div className={cn("w-full relative overflow-hidden bg-surface-2", aspectClass)}>
											<img
												src={item.image}
												alt={item.title}
												className="w-full h-full  transition-transform duration-700 ease-out group-hover:scale-108"
												loading="lazy"
											/>
											{/* Ambient hover shading */}
											<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
										</div>
									</LocalizedLink>
								);
							})}
						</div>
					))}
				</div>
			</Container>
		</Section>
	);
};

export default ProductGallerySection;
