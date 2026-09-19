import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { ArrowLeft, ArrowRight, Sparkles, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { resolveImageUrl, FALLBACK_IMAGES } from "@/lib/imageUtils";

/**
 * CategoriesSection Component
 * Ultra-smooth, buttery interactive accordion showcase for storage & racking categories.
 * Features persistent DOM mounting for zero-flicker transitions, spring-like flex expansion,
 * glassmorphic badges, high-contrast readable vertical text pills, and bottom indicator dots.
 */
export const CategoriesSection = ({ categories = [], isLoading }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [activeIndex, setActiveIndex] = useState(0);
	const hoverTimeoutRef = useRef(null);

	const categoriesToDisplay = categories && categories.length > 0 ? categories.slice(0, 6) : [];

	const handleCardHover = (index) => {
		if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
		hoverTimeoutRef.current = setTimeout(() => {
			setActiveIndex(index);
		}, 40); // 40ms micro-debounce for ultra-smooth responsiveness
	};

	const nextCategory = () => {
		setActiveIndex((prev) => (prev + 1) % categoriesToDisplay.length);
	};

	const prevCategory = () => {
		setActiveIndex((prev) => (prev - 1 + categoriesToDisplay.length) % categoriesToDisplay.length);
	};

	useEffect(() => {
		return () => {
			if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
		};
	}, []);

	const getLocalized = (field) => {
		if (!field) return "";
		if (typeof field === "string") return field;
		if (typeof field === "number") return String(field);
		if (typeof field === "object") {
			const val = field[language] || field.ar || field.en || Object.values(field)[0] || "";
			if (typeof val === "object" && val !== null) {
				return val[language] || val.ar || val.en || "";
			}
			return typeof val === "string" ? val : "";
		}
		return String(field);
	};

	if (isLoading && (!categories || categories.length === 0)) {
		return (
			<Section bg="background" spacing="sm" className="overflow-hidden py-8 sm:py-12">
				<Container>
					<div className="h-6 w-48 bg-surface animate-pulse rounded-full mb-8" />
					<div className="h-[460px] w-full bg-surface animate-pulse rounded-3xl border border-border/40" />
				</Container>
			</Section>
		);
	}

	if (!isLoading && categoriesToDisplay.length === 0) return null;

	return (
		<Section bg="background" spacing="sm" className="overflow-hidden py-8 sm:py-12 relative select-none">
			{/* Ambient background glow effects */}
			<div className="absolute top-1/3 start-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute bottom-0 end-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

			<Container>
				{/* Header Section */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
					<div>
						<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-3 shadow-xs">
							<Sparkles size={14} className="animate-pulse" />
							<span>{isRtl ? "تصنيفات حصرية ومنتجات رئيسية" : "Showcased Categories"}</span>
						</div>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-text tracking-tight leading-tight">
							{isRtl ? "أقسام وتجهيزات التخزين المتكاملة" : "Storage & Racking Solutions"}
						</h2>
					</div>

					<div className="flex items-center gap-3 self-start sm:self-auto">
						{/* Desktop Navigation Arrows */}
						<div className="hidden md:flex items-center gap-1.5 bg-surface border border-border/70 rounded-xl p-1 shadow-xs">
							<button
								type="button"
								onClick={isRtl ? nextCategory : prevCategory}
								className="w-8 h-8 rounded-lg flex items-center justify-center text-text hover:bg-surface-2 hover:text-primary transition-colors cursor-pointer"
								aria-label="Previous category"
							>
								{isRtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
							</button>
							<button
								type="button"
								onClick={isRtl ? prevCategory : nextCategory}
								className="w-8 h-8 rounded-lg flex items-center justify-center text-text hover:bg-surface-2 hover:text-primary transition-colors cursor-pointer"
								aria-label="Next category"
							>
								{isRtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
							</button>
						</div>

						<LocalizedLink
							to="/categories"
							className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border/70 hover:border-primary/50 text-xs sm:text-sm font-bold text-text hover:text-primary transition-all duration-300 shadow-xs hover:shadow-md"
						>
							<span>{isRtl ? "تصفح جميع الأقسام" : "View All Categories"}</span>
							{isRtl ? (
								<ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
							) : (
								<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
							)}
						</LocalizedLink>
					</div>
				</div>

				{/* Desktop & Tablet Interactive Expanding Accordion Showcase (Hidden on Mobile) */}
				<div className="hidden md:flex gap-3 lg:gap-4 h-[440px] lg:h-[480px] w-full items-stretch">
					{categoriesToDisplay.map((item, idx) => {
						const isActive = activeIndex === idx;
						const title = getLocalized(item.title) || getLocalized(item.name) || (isRtl ? "قسم التخزين" : "Category");
						const subtitle = getLocalized(item.description) || (isRtl ? "مختلف المقاسات والأحمال القياسية" : "All dimensions & heavy-duty loads");
						const linkUrl = item.link && typeof item.link === "string" && item.link.startsWith("/")
							? item.link
							: `/category/${item.id || item.slug || item.link}`;
						const catImg = resolveImageUrl(item.image, FALLBACK_IMAGES.CATEGORY);

						return (
							<div
								key={item.id || idx}
								onMouseEnter={() => handleCardHover(idx)}
								onClick={() => setActiveIndex(idx)}
								className={cn(
									"relative rounded-3xl overflow-hidden cursor-pointer bg-surface",
									"transition-[flex,border-color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[flex]",
									"border group",
									isActive
										? "flex-[4.2] lg:flex-[4.8] border-primary/60 shadow-2xl ring-2 ring-primary/25 z-20"
										: "flex-[1] border-white/10 dark:border-slate-800/80 hover:border-primary/40 opacity-85 hover:opacity-100 z-10"
								)}
							>
								{/* Background Image filling 100% of card with smooth zoom & fallback */}
								<img
									src={catImg}
									alt={title}
									onError={(e) => { e.currentTarget.src = FALLBACK_IMAGES.CATEGORY; }}
									className={cn(
										"absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out",
										isActive ? "scale-105" : "scale-100 group-hover:scale-105"
									)}
									loading="lazy"
								/>

								{/* Dynamic multi-gradient backdrop overlay */}
								<div
									className={cn(
										"absolute inset-0 transition-opacity duration-700 ease-out",
										isActive
											? "bg-gradient-to-t from-black/95 via-black/45 to-black/15"
											: "bg-gradient-to-t from-black/90 via-black/60 to-black/35 group-hover:from-black/80"
									)}
								/>

								{/* ACTIVE STATE OVERLAY (Always mounted, silky smooth crossfade & slide) */}
								<div
									className={cn(
										"absolute inset-0 p-6 lg:p-8 flex flex-col justify-between z-20 transition-all duration-500 ease-out",
										isActive
											? "opacity-100 translate-y-0 pointer-events-auto delay-100"
											: "opacity-0 translate-y-4 pointer-events-none"
									)}
								>
									{/* Top Header of Active Card */}
									<div className="flex items-center justify-between">
										<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-md">
											<span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
											<span>{isRtl ? `القسم 0${idx + 1}` : `Category 0${idx + 1}`}</span>
										</div>

										<div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
											<Layers size={20} />
										</div>
									</div>

									{/* Bottom Glassmorphic Panel of Active Card */}
									<div className="bg-black/75 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-white/20 shadow-2xl">
										<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
											<div className="space-y-1.5 flex-1 min-w-0">
												<h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white leading-tight drop-shadow-md">
													{title}
												</h3>
												<p className="text-xs sm:text-sm text-slate-300 font-medium line-clamp-1">
													{subtitle}
												</p>
											</div>

											<LocalizedLink
												to={linkUrl}
												onClick={(e) => e.stopPropagation()}
												className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm shadow-xl shadow-primary/35 hover:bg-primary-hover hover:scale-105 transition-all duration-300 shrink-0 self-start sm:self-auto"
											>
												<span>{isRtl ? "تصفح المنتجات" : "Explore Category"}</span>
												{isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
											</LocalizedLink>
										</div>
									</div>
								</div>

								{/* COLLAPSED STATE OVERLAY (Always mounted, silky smooth crossfade) */}
								<div
									className={cn(
										"absolute inset-0 p-3 sm:p-4 flex flex-col justify-between items-center z-10 transition-all duration-400 ease-out",
										isActive
											? "opacity-0 scale-90 pointer-events-none"
											: "opacity-100 scale-100 pointer-events-auto delay-75"
									)}
								>
									{/* Category Number Badge */}
									<div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-white text-xs font-black flex items-center justify-center shadow-lg">
										0{idx + 1}
									</div>

									{/* High-Contrast Frosted Vertical Text Capsule */}
									<div className="flex-1 flex items-center justify-center py-3 w-full">
										<div className="px-2.5 py-4 rounded-full bg-black/55 backdrop-blur-md border border-white/15 flex items-center justify-center shadow-lg group-hover:border-primary/50 group-hover:bg-black/70 transition-all duration-300">
											<span className="text-white font-extrabold text-xs lg:text-[13px] tracking-wide text-center drop-shadow-md [writing-mode:vertical-rl] rotate-180 group-hover:text-primary transition-colors whitespace-nowrap">
												{title}
											</span>
										</div>
									</div>

									{/* Expand Chevron Icon */}
									<div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-sm">
										{isRtl ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Dot Progress Indicators for Desktop */}
				<div className="hidden md:flex items-center justify-center gap-2 mt-5">
					{categoriesToDisplay.map((_, idx) => (
						<button
							key={idx}
							type="button"
							onClick={() => setActiveIndex(idx)}
							className={cn(
								"h-2 rounded-full transition-all duration-500 cursor-pointer",
								activeIndex === idx
									? "w-8 bg-primary shadow-sm shadow-primary/50"
									: "w-2 bg-border hover:bg-text-muted/50"
							)}
							aria-label={`Go to category ${idx + 1}`}
						/>
					))}
				</div>

				{/* Mobile Grid Showcase (Displayed on phones for optimal UX) */}
				<div className="grid grid-cols-2 gap-3.5 md:hidden">
					{categoriesToDisplay.map((item, idx) => {
						const title = getLocalized(item.title) || getLocalized(item.name) || (isRtl ? "قسم التخزين" : "Category");
						const linkUrl = item.link && typeof item.link === "string" && item.link.startsWith("/")
							? item.link
							: `/category/${item.id || item.slug || item.link}`;
						const catImg = resolveImageUrl(item.image, FALLBACK_IMAGES.CATEGORY);

						return (
							<LocalizedLink
								key={item.id || idx}
								to={linkUrl}
								className="group relative h-48 rounded-2xl overflow-hidden border border-border/80 shadow-md flex flex-col justify-end p-3.5 bg-surface"
							>
								{/* Full cover image */}
								<img
									src={catImg}
									alt={title}
									onError={(e) => { e.currentTarget.src = FALLBACK_IMAGES.CATEGORY; }}
									className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
									loading="lazy"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

								{/* Mobile content info */}
								<div className="relative z-10 space-y-1">
									<span className="inline-block text-[10px] font-bold text-primary bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
										0{idx + 1}
									</span>
									<h3 className="text-xs font-bold text-white line-clamp-2 leading-tight drop-shadow-md group-hover:text-primary transition-colors">
										{title}
									</h3>
								</div>
							</LocalizedLink>
						);
					})}
				</div>

			</Container>
		</Section>
	);
};

export default CategoriesSection;
