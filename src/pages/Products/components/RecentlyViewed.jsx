import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, History } from "lucide-react";
import { useLanguage } from "@/app/providers/I18nProvider";
import ProductCard from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";

export const RecentlyViewed = ({ products }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	
	const [emblaRef, emblaApi] = useEmblaCarousel({ 
		align: "start",
		direction: isRtl ? "rtl" : "ltr",
		dragFree: true
	});

	if (!products || products.length === 0) return null;

	return (
		<div className="w-full py-12 border-t border-border/60 mt-8">
			<div className="flex items-center justify-between mb-8">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
						<History className="w-5 h-5" />
					</div>
					<h2 className="text-2xl font-extrabold text-text">
						{isRtl ? "شاهدتها مؤخراً" : "Recently Viewed"}
					</h2>
				</div>

				{/* Carousel Controls */}
				<div className="flex items-center gap-2">
					<button
						onClick={() => emblaApi?.scrollPrev()}
						className="w-10 h-10 flex items-center justify-center rounded-full bg-surface border border-border/60 text-text hover:bg-surface-2 transition-colors"
						aria-label="Previous slide"
					>
						{isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
					</button>
					<button
						onClick={() => emblaApi?.scrollNext()}
						className="w-10 h-10 flex items-center justify-center rounded-full bg-surface border border-border/60 text-text hover:bg-surface-2 transition-colors"
						aria-label="Next slide"
					>
						{isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
					</button>
				</div>
			</div>

			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex -ml-4 rtl:-mr-4 rtl:ml-0">
					{products.map((product) => (
						<div 
							key={product.id} 
							className="flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_22%] pl-4 rtl:pr-4 rtl:pl-0"
						>
							<ProductCard product={product} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default RecentlyViewed;
