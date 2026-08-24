import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/app/providers/I18nProvider";

export const HeroControls = ({ scrollPrev, scrollNext, canScrollPrev, canScrollNext }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<>
			{/* Prev Button */}
			<button
				onClick={scrollPrev}
				disabled={!canScrollPrev}
				className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-[#0a2342] shadow-lg hover:scale-105 flex items-center justify-center transition-all duration-200 pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed"
				aria-label="Previous slide"
			>
				{isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
			</button>

			{/* Next Button */}
			<button
				onClick={scrollNext}
				disabled={!canScrollNext}
				className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-[#0a2342] shadow-lg hover:scale-105 flex items-center justify-center transition-all duration-200 pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed"
				aria-label="Next slide"
			>
				{isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
			</button>
		</>
	);
};

export default HeroControls;
