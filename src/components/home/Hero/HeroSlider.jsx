import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/app/providers/I18nProvider";
import HeroPagination from "./HeroPagination";
import HeroControls from "./HeroControls";

export const HeroSlider = ({ children, onSlideChange }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	// Embla configuration
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			direction: isRtl ? "rtl" : "ltr",
			align: "center",
		},
		[Autoplay({ delay: 5000, stopOnInteraction: true })]
	);

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);

	const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
	const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
	const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
		setCanScrollPrev(emblaApi.canScrollPrev());
		setCanScrollNext(emblaApi.canScrollNext());
		if (onSlideChange) {
			onSlideChange(emblaApi.selectedScrollSnap());
		}
	}, [emblaApi, onSlideChange]);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on("select", onSelect);
		emblaApi.on("reInit", onSelect);
		
		return () => {
			emblaApi.off("select", onSelect);
			emblaApi.off("reInit", onSelect);
		};
	}, [emblaApi, onSelect]);

	useEffect(() => {
		if (emblaApi) {
			emblaApi.reInit({ direction: isRtl ? "rtl" : "ltr" });
		}
	}, [isRtl, emblaApi]);

	const slidesCount = React.Children.count(children);

	return (
		<div className="relative group w-full overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
			<div className="overflow-hidden w-full h-full" ref={emblaRef}>
				<div className="flex touch-pan-y w-full h-full">
					{children}
				</div>
			</div>

			{/* Pagination (Dots) - Centered at the bottom */}
			<div className="absolute bottom-6 left-0 right-0 flex justify-center z-20 pointer-events-auto">
				<HeroPagination 
					slidesCount={slidesCount} 
					selectedIndex={selectedIndex} 
					scrollTo={scrollTo} 
				/>
			</div>

			{/* Optional Controls - Hidden on mobile, visible on desktop */}
			<div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-3 right-3 md:left-6 md:right-6 justify-between z-20 pointer-events-none">
				<HeroControls 
					scrollPrev={scrollPrev} 
					scrollNext={scrollNext} 
					canScrollPrev={canScrollPrev} 
					canScrollNext={canScrollNext} 
				/>
			</div>
		</div>
	);
};

export default HeroSlider;
