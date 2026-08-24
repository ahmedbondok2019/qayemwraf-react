import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { featuredCategories } from "./featured-categories.data";
import { FeaturedCategoriesCard } from "./FeaturedCategoriesCard";

export const FeaturedCategories = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const [emblaRef] = useEmblaCarousel(
		{
			loop: true,
			align: "start",
			direction: isRtl ? "rtl" : "ltr",
			skipSnaps: false,
		},
		[Autoplay({ delay: 3500, stopOnInteraction: false })]
	);

	const headerTitle = {
		en: "Featured Categories",
		ar: "الأقسام المميزة",
	};

	const headerSubtitle = {
		en: "Explore our top medical supply and equipment categories",
		ar: "استكشف أبرز أقسام المستلزمات والمعدات الطبية الرئيسية",
	};

	return (
		<Section bg="surface" spacing="md" className="border-b border-border/40">
			<Container>
				<SectionHeader title={headerTitle} subtitle={headerSubtitle} viewAllLink="/categories" />
				
				{/* Continuous Horizontal Slider */}
				<div className="w-full relative mt-8" dir={isRtl ? "rtl" : "ltr"}>
					<div className="overflow-hidden" ref={emblaRef}>
						<div className="flex touch-pan-y -ml-4 rtl:-mr-4 rtl:ml-0">
							{featuredCategories.map((category) => (
								<div
									key={category.id}
									className="flex-[0_0_82%] sm:flex-[0_0_48%] md:flex-[0_0_36%] lg:flex-[0_0_30%] min-w-0 pl-4 rtl:pr-4 rtl:pl-0"
								>
									<FeaturedCategoriesCard
										category={category}
										isRtl={isRtl}
										language={language}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default FeaturedCategories;


