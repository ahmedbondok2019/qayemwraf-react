import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import LocalizedLink from "@/components/ui/LocalizedLink";
import Container from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const OfferBanners = ({ offers = [], isLoading }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	if (isLoading) {
		return (
			<Section spacing="none" className="py-6 sm:py-10">
				<Container>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="aspect-[21/9] w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-[2rem]" />
						<div className="aspect-[21/9] w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-[2rem] hidden md:block" />
					</div>
				</Container>
			</Section>
		);
	}

	// Filter and map offers
	const banners = (offers || [])
		.map((offer, index) => {
			const targetSlug = offer.category?.slug 
				|| offer.category_slug 
				|| (offer.category?.link && isNaN(Number(offer.category.link)) ? offer.category.link : null)
				|| (offer.slug && isNaN(Number(offer.slug)) ? offer.slug : null);

			let link = "/flash-deals";
			if (targetSlug && isNaN(Number(targetSlug))) {
				link = `/category/${targetSlug}`;
			} else if (offer.link && offer.link !== "https://qayemwraf.com" && offer.link !== "https://qayemwraf.com/" && !offer.link.startsWith("http")) {
				link = offer.link.startsWith("/") ? offer.link : `/${offer.link}`;
			} else if (offer.category_id || offer.category?.id) {
				link = `/category/${offer.category_id || offer.category?.id}`;
			} else if (offer.link && offer.link !== "https://qayemwraf.com" && offer.link !== "https://qayemwraf.com/") {
				link = offer.link;
			} else if (offer.url && offer.url !== "https://qayemwraf.com" && offer.url !== "https://qayemwraf.com/") {
				link = offer.url;
			}

			const titleText = typeof offer.title === "object"
				? (offer.title?.[language] || offer.title?.ar || offer.name || "")
				: (offer.title || offer.name || "");

			return {
				id: offer.id || `banner-${index}`,
				image: offer.image || offer.category?.image,
				title: titleText || (isRtl ? "عرض خاص" : "Special Offer"),
				link,
			};
		})
		.filter((b) => Boolean(b.image));

	if (banners.length === 0) return null;

	const isSingle = banners.length === 1;
	const isDouble = banners.length === 2;

	// Embla Carousel configuration for multi-banner slider (when > 2)
	const [emblaRef] = useEmblaCarousel(
		{
			loop: banners.length > 2,
			align: "start",
			direction: isRtl ? "rtl" : "ltr",
			active: banners.length > 2,
		},
		[Autoplay({ delay: 5000, stopOnInteraction: true })]
	);

	return (
		<Section spacing="none" className="py-6 sm:py-10">
			<Container>
				{isSingle ? (
					// Single Banner: Takes full width
					<div className="w-full">
						<LocalizedLink
							to={banners[0].link}
							className="block group overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-300 bg-surface relative min-h-[220px] sm:min-h-[340px] max-h-[460px] flex items-center justify-center"
						>
							<div 
								className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-20 scale-125 pointer-events-none"
								style={{ backgroundImage: `url(${banners[0].image})` }}
							/>
							<img
								src={banners[0].image}
								alt={banners[0].title}
								loading="lazy"
								className="relative z-10 w-auto h-auto max-h-[440px] max-w-full object-contain p-2 sm:p-4 transition-transform duration-700 group-hover:scale-[1.02]"
							/>
						</LocalizedLink>
					</div>
				) : isDouble ? (
					// Exactly 2 Banners: 2-column Grid
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
						{banners.map((banner) => (
							<LocalizedLink
								key={banner.id}
								to={banner.link}
								className="block group overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-300 bg-surface relative min-h-[220px] sm:min-h-[280px] max-h-[380px] flex items-center justify-center h-full"
							>
								<div 
									className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-20 scale-125 pointer-events-none"
									style={{ backgroundImage: `url(${banner.image})` }}
								/>
								<img
									src={banner.image}
									alt={banner.title}
									loading="lazy"
									className="relative z-10 w-auto h-auto max-h-[340px] max-w-full object-contain p-2 transition-transform duration-700 group-hover:scale-[1.02]"
								/>
							</LocalizedLink>
						))}
					</div>
				) : (
					// 3 or more Banners: Slider View
					<div className="w-full relative" dir={isRtl ? "rtl" : "ltr"}>
						<div className="overflow-hidden" ref={emblaRef}>
							<div className="flex touch-pan-y -ml-4 rtl:-mr-4 rtl:ml-0">
								{banners.map((banner) => (
									<div
										key={banner.id}
										className="min-w-0 pl-4 rtl:pr-4 rtl:pl-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
									>
										<LocalizedLink
											to={banner.link}
											className="block group overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-300 bg-surface relative min-h-[220px] sm:min-h-[280px] max-h-[340px] flex items-center justify-center h-full"
										>
											<div 
												className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-20 scale-125 pointer-events-none"
												style={{ backgroundImage: `url(${banner.image})` }}
											/>
											<img
												src={banner.image}
												alt={banner.title}
												loading="lazy"
												className="relative z-10 w-auto h-auto max-h-[300px] max-w-full object-contain p-2 transition-transform duration-700 group-hover:scale-[1.02]"
											/>
										</LocalizedLink>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</Container>
		</Section>
	);
};

export default OfferBanners;
