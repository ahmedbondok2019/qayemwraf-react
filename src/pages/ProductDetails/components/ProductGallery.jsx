import React, { useState, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { cn } from "@/lib/utils";

export const ProductGallery = ({ images = [] }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isZoomed, setIsZoomed] = useState(false);
	const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");

	// Main carousel
	const [mainRef, mainApi] = useEmblaCarousel({
		align: "center",
		direction: isRtl ? "rtl" : "ltr",
		skipSnaps: false
	});

	// Thumbnails carousel
	const [thumbRef, thumbApi] = useEmblaCarousel({
		containScroll: "keepSnaps",
		dragFree: true,
		direction: isRtl ? "rtl" : "ltr",
	});

	const onThumbClick = useCallback(
		(index) => {
			if (!mainApi || !thumbApi) return;
			mainApi.scrollTo(index);
		},
		[mainApi, thumbApi]
	);

	const onSelect = useCallback(() => {
		if (!mainApi || !thumbApi) return;
		setSelectedIndex(mainApi.selectedScrollSnap());
		thumbApi.scrollTo(mainApi.selectedScrollSnap());
	}, [mainApi, thumbApi]);

	React.useEffect(() => {
		if (!mainApi) return;
		onSelect();
		mainApi.on("select", onSelect);
		mainApi.on("reInit", onSelect);
	}, [mainApi, onSelect]);

	// Inner Zoom Handlers
	const handleMouseMove = (e) => {
		if (!isZoomed) return;
		const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
		const x = ((e.clientX - left) / width) * 100;
		const y = ((e.clientY - top) / height) * 100;
		setBackgroundPosition(`${x}% ${y}%`);
	};

	if (!images?.length) {
		return <div className="aspect-square bg-surface-2 rounded-2xl animate-pulse" />;
	}

	return (
		<div className="flex flex-col gap-4 w-full select-none">

			{/* Main Image Viewport */}
			<div className="relative w-full aspect-[4/3] max-h-[300px] sm:max-h-[380px] md:max-h-[420px] lg:max-h-[460px] bg-white dark:bg-white rounded-2xl border border-border overflow-hidden group">
				<div className="overflow-hidden h-full" ref={mainRef}>
					<div className="flex h-full">
						{images.map((img, index) => (
							<div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">

								{/* Zoomable Image Container */}
								<div
									className={cn(
										"w-full h-full cursor-zoom-in transition-all duration-300",
										isZoomed ? "cursor-zoom-out" : ""
									)}
									onMouseEnter={() => setIsZoomed(true)}
									onMouseLeave={() => {
										setIsZoomed(false);
										setBackgroundPosition("50% 50%");
									}}
									onMouseMove={handleMouseMove}
									onClick={() => setIsZoomed(!isZoomed)}
									style={{
										backgroundImage: `url("${img}")`,
										backgroundPosition: isZoomed ? backgroundPosition : "center",
										backgroundSize: isZoomed ? "200%" : "contain",
										backgroundRepeat: "no-repeat",
									}}
								/>

							</div>
						))}
					</div>
				</div>

				{/* Floating UI on Main Image */}
				<div className="absolute top-4 ltr:right-4 rtl:left-4 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
					<div className="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center text-text shadow-sm">
						<Maximize2 className="w-4 h-4" />
					</div>
				</div>

				{/* Mobile Navigation Arrows (Hidden on Desktop because thumbnails are sufficient) */}
				<button
					onClick={() => mainApi?.scrollPrev()}
					className="md:hidden absolute top-1/2 -translate-y-1/2 ltr:left-2 rtl:right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-text shadow-sm"
				>
					{isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
				</button>
				<button
					onClick={() => mainApi?.scrollNext()}
					className="md:hidden absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-text shadow-sm"
				>
					{isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
				</button>
			</div>

			{/* Thumbnails Row */}
			{images.length > 1 && (
				<div className="overflow-hidden" ref={thumbRef}>
					<div className="flex gap-3 ltr:-ml-3 rtl:-mr-3 ltr:pl-3 rtl:pr-3 py-1">
						{images.map((img, index) => (
							<button
								key={index}
								onClick={() => onThumbClick(index)}
								className={cn(
									"relative flex-[0_0_20%] sm:flex-[0_0_18%] min-w-0 aspect-square rounded-xl overflow-hidden border-2 transition-all",
									index === selectedIndex
										? "border-primary ring-2 ring-primary/20 ring-offset-1"
										: "border-transparent opacity-60 hover:opacity-100 bg-white dark:bg-white"
								)}
							>
								<img
									src={img}
									alt={`Thumbnail ${index + 1}`}
									className="w-full h-full object-contain p-1"
								/>
							</button>
						))}
					</div>
				</div>
			)}

		</div>
	);
};

export default ProductGallery;
