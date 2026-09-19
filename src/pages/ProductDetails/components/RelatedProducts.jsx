import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Sparkles, Boxes } from "lucide-react";
import { useLanguage } from "@/app/providers/I18nProvider";
import ProductCard from "@/components/ui/ProductCard";

export const RelatedProducts = ({ products }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	
	const [emblaRef, emblaApi] = useEmblaCarousel({ 
		align: "start",
		direction: isRtl ? "rtl" : "ltr",
		dragFree: true,
		containScroll: "trimSnaps"
	});

	if (!products || products.length === 0) return null;

	return (
		<section className="w-full py-10 md:py-14 border-t border-border/60">
			{/* Header with Title & Navigation Controls */}
			<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
				<div>
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-2 shadow-xs">
						<Sparkles size={14} className="animate-pulse" />
						<span>{isRtl ? "تجهيزات ومقترحات مماثلة" : "Recommended Solutions"}</span>
					</div>
					<h2 className="text-xl sm:text-2xl md:text-3xl font-black text-text tracking-tight">
						{isRtl ? "منتجات وتجهيزات ذات صلة" : "Related Products"}
					</h2>
				</div>

				{/* Carousel Controls */}
				<div className="flex items-center gap-2 self-end sm:self-auto">
					<button
						type="button"
						onClick={() => emblaApi?.scrollPrev()}
						className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-border/80 text-text hover:bg-surface-2 hover:text-primary hover:border-primary/50 transition-all duration-300 shadow-xs cursor-pointer"
						aria-label="Previous slide"
					>
						{isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
					</button>
					<button
						type="button"
						onClick={() => emblaApi?.scrollNext()}
						className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-border/80 text-text hover:bg-surface-2 hover:text-primary hover:border-primary/50 transition-all duration-300 shadow-xs cursor-pointer"
						aria-label="Next slide"
					>
						{isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
					</button>
				</div>
			</div>

			{/* Embla Carousel Slider */}
			<div className="overflow-hidden select-none -mx-2 px-2" ref={emblaRef}>
				<div className="flex items-stretch -ml-4 rtl:-mr-4 rtl:ml-0 py-2">
					{products.map((product) => (
						<div 
							key={product.id || product._realId} 
							className="flex-[0_0_82%] sm:flex-[0_0_46%] md:flex-[0_0_31%] lg:flex-[0_0_24%] min-w-0 pl-4 rtl:pr-4 rtl:pl-0 h-full flex flex-col"
						>
							<ProductCard product={product} className="h-full" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default RelatedProducts;
