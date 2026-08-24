import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/app/providers/I18nProvider";

import LocalizedLink from "@/components/ui/LocalizedLink";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export const CategoriesSection = ({ categories = [], isLoading }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			direction: isRtl ? "rtl" : "ltr",
			align: "start",
			skipSnaps: false,
		},
		[Autoplay({ delay: 4000, stopOnInteraction: true })]
	);

	const scrollNext = () => {
		if (emblaApi) emblaApi.scrollNext();
	};

	const categoriesToDisplay = categories || [];

	if (isLoading && (!categories || categories.length === 0)) {
		return (
			<Section bg="background" spacing="xs" className="overflow-hidden">
				<Container>
					<div className="h-[280px] w-full bg-slate-100 animate-pulse rounded-[32px]"></div>
				</Container>
			</Section>
		);
	}

	return (
		<Section bg="background" spacing="xs" className="overflow-hidden">
			<Container>
				<div className="bg-slate-50/60 dark:bg-slate-900/20 rounded-[32px] flex  flex-col md:flex-row gap-4 md:gap-6 border border-border/60 shadow-sm overflow-hidden">
					{/* Text Side */}
					<div className="relative z-10 w-full md:w-[24%] lg:w-[18%] flex flex-col items-start justify-center gap-3 bg-[#021d49] text-white p-6 rounded-2xl self-stretch shrink-0">
						<h2 className="text-sm sm:text-base md:text-xl font-extrabold text-white leading-tight drop-shadow-sm">
							{isRtl ? "تسوق حسب الاحتياجات الصحية" : "Shop by Health Needs"}
						</h2>
						<LocalizedLink
							to="/categories"
							className="group inline-flex items-center gap-1.5 text-orange-400 font-bold text-xs sm:text-sm transition-colors hover:text-orange-300 mt-1"
						>
							{isRtl ? "عرض كل الأقسام" : "View all categories"}
							{isRtl ? (
								<ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
							) : (
								<ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
							)}
						</LocalizedLink>
					</div>
					<div className="relativep-3 md:p-4  items-center overflow-hidden  shadow-sm ">

						{/* Slider Side */}
						<div className="relative z-10 w-full " dir={isRtl ? "rtl" : "ltr"}>
							<div className="overflow-hidden" ref={emblaRef}>
								<div className="flex touch-pan-y -ml-4 rtl:-mr-4 rtl:ml-0">
									{categoriesToDisplay.map((need, index) => {
										const getLocalized = (field) => {
											if (!field) return "";
											if (typeof field === "string") return field;
											return field[language] || field.en || field.ar || "";
										};

										const title = getLocalized(need.title) || getLocalized(need.name);
										const linkUrl = (need.link && typeof need.link === 'string' && need.link.startsWith('/'))
											? need.link
											: `/category/${need.id || need.link}`;

										return (
											<div
												key={need.id || index}
												className="flex-[0_0_100%] sm:flex-[0_0_30%] md:flex-[0_0_25%] lg:flex-[0_0_20%] min-w-0 pl-4 rtl:pr-4 rtl:pl-0"
											>
												<LocalizedLink
													to={linkUrl}
													className="group flex flex-col overflow-hidden rounded-[20px] bg-white dark:bg-slate-900 border border-orange-500/30 dark:border-slate-800 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-lg hover:border-orange-500 transition-all duration-300 hover:-translate-y-1 h-full"
												>
													{/* Image Container */}
													<div className="w-full aspect-[4/3] sm:aspect-square bg-slate-50/50 dark:bg-slate-800/20 flex items-center justify-center overflow-hidden border-b border-orange-500/20">
														<img
															src={need.image}
															alt={title}
															className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
														/>
													</div>

													{/* Text Container below the image to prevent overlap */}
													<div className="p-3.5 flex-grow flex items-center justify-center text-center bg-surface">
														<span className="text-text font-extrabold text-xs sm:text-sm md:text-base leading-snug line-clamp-2">
															{title}
														</span>
													</div>
												</LocalizedLink>
											</div>
										);
									})}
								</div>
							</div>

							{/* Next Arrow inside slider container */}
							<div className="absolute top-1/2 -translate-y-1/2 right-0 rtl:right-auto rtl:left-0 z-10 hidden sm:flex pointer-events-none">
								<div
									onClick={scrollNext}
									className="w-10 h-10 rounded-full bg-surface shadow-md border border-border/65 flex items-center justify-center text-primary pointer-events-auto cursor-pointer hover:bg-surface-2 transition-colors transform translate-x-1/3 rtl:-translate-x-1/3"
								>
									{isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default CategoriesSection;


