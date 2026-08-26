import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Layers, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * Modern Interactive Categories Hub
 * High-end visual category showcase with top header controls, glass cards, and brand colors.
 */
export const CategoriesSection = ({ categories = [], isLoading }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			direction: isRtl ? "rtl" : "ltr",
			align: "start",
			skipSnaps: false,
			dragFree: true
		},
		[Autoplay({ delay: 4500, stopOnInteraction: true })]
	);

	const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
	const scrollNext = () => emblaApi && emblaApi.scrollNext();

	const categoriesToDisplay = categories || [];

	if (isLoading && (!categories || categories.length === 0)) {
		return (
			<Section bg="background" spacing="sm" className="overflow-hidden">
				<Container>
					<div className="h-6 w-48 bg-slate-200 animate-pulse rounded-md mb-6"></div>
					<div className="flex gap-4 overflow-hidden">
						{[...Array(6)].map((_, i) => (
							<div key={i} className="flex-[0_0_45%] sm:flex-[0_0_28%] md:flex-[0_0_20%] lg:flex-[0_0_16%]">
								<div className="h-44 bg-slate-100 animate-pulse rounded-2xl w-full"></div>
							</div>
						))}
					</div>
				</Container>
			</Section>
		);
	}

	if (!isLoading && categoriesToDisplay.length === 0) return null;

	return (
		<Section bg="background" spacing="sm" className="overflow-hidden py-6 sm:py-10">
			<Container>
				{/* Top Header Bar */}
				<div className="flex items-end justify-between gap-4 mb-6">
					<div>
						<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
							<Sparkles size={14} />
							<span>{isRtl ? "تصفح حسب التصنيف" : "Explore Categories"}</span>
						</div>
						<h2 className="text-xl sm:text-2xl md:text-3xl font-black text-text tracking-tight">
							{isRtl ? "أقسام وتجهيزات التخزين" : "Storage & Equipment Categories"}
						</h2>
					</div>

					{/* Navigation Controls */}
					<div className="flex items-center gap-3">
						<LocalizedLink
							to="/categories"
							className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-hover transition-colors me-2"
						>
							<span>{isRtl ? "كل الأقسام" : "All Categories"}</span>
							{isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
						</LocalizedLink>

						<div className="flex items-center gap-1.5">
							<button
								onClick={scrollPrev}
								className="w-9 h-9 rounded-full bg-surface border border-border hover:border-primary/40 shadow-sm hover:shadow text-text hover:text-primary flex items-center justify-center transition-all cursor-pointer"
								aria-label="Previous Category"
							>
								{isRtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
							</button>
							<button
								onClick={scrollNext}
								className="w-9 h-9 rounded-full bg-surface border border-border hover:border-primary/40 shadow-sm hover:shadow text-text hover:text-primary flex items-center justify-center transition-all cursor-pointer"
								aria-label="Next Category"
							>
								{isRtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
							</button>
						</div>
					</div>
				</div>

				{/* Modern Horizontal Scroll Carousel */}
				<div className="relative w-full" dir={isRtl ? "rtl" : "ltr"}>
					<div className="overflow-hidden -mx-1 px-1 py-2" ref={emblaRef}>
						<div className="flex touch-pan-y -ml-1.5 rtl:-mr-1.5 rtl:ml-0">
							{categoriesToDisplay.map((item, index) => {
								const getLocalized = (field) => {
									if (!field) return "";
									if (typeof field === "string") return field;
									return field[language] || field.en || field.ar || "";
								};

								const title = getLocalized(item.title) || getLocalized(item.name);
								const linkUrl =
									item.link && typeof item.link === "string" && item.link.startsWith("/")
										? item.link
										: `/category/${item.id || item.link}`;

								return (
									<div
										key={item.id || index}
										className="flex-[0_0_30%] sm:flex-[0_0_18%] md:flex-[0_0_14%] lg:flex-[0_0_11.11%] min-w-0 pl-1.5 rtl:pr-1.5 rtl:pl-0"
									>
										<LocalizedLink
											to={linkUrl}
											className="group flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-1.5"
										>
											{/* Image Container with Circle Ring */}
											<div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden mb-3 border border-border shadow-sm group-hover:border-primary group-hover:shadow-md transition-all duration-300">
												<div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-full transition-colors duration-300" />
												<img
													src={item.image}
													alt={title}
													className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-110"
													loading="lazy"
												/>
											</div>

											{/* Category Title */}
											<div className="w-full px-1">
												<h3 className="text-xs sm:text-sm font-bold text-text-secondary group-hover:text-primary transition-colors line-clamp-1 leading-snug">
													{title}
												</h3>
											</div>
										</LocalizedLink>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default CategoriesSection;
