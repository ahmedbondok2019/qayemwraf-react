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
		.slice(0, 2) // Limit to maximum 2 banners
		.map((offer, index) => {
			let link = "/";
			if (offer.link_type === "category" && offer.category_id) {
				link = `/category/${offer.category_id}`;
			} else if (offer.link_type === "product" && offer.product_id) {
				link = `/product/${offer.product_id}`;
			} else if (offer.link) {
				link = offer.link;
			}

			return {
				id: offer.id || `banner-${index}`,
				image: offer.image || offer.category?.image,
				title: offer.title || offer.name || "Offer Banner",
				link,
			};
		})
		.filter((b) => b.image);

	if (banners.length === 0) return null;

	const isSingle = banners.length === 1;

	// Embla Carousel configuration for mobile slider (or desktop too if preferred)
	const [emblaRef] = useEmblaCarousel(
		{
			loop: false,
			align: "center",
			direction: isRtl ? "rtl" : "ltr",
			active: !isSingle, // Only active if there are multiple banners
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
							className="block group overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300"
						>
							<img
								src={banners[0].image}
								alt={banners[0].title}
								className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
							/>
						</LocalizedLink>
					</div>
				) : (
					// Two Banners: Slider / Grid view
					<div className="w-full relative" dir={isRtl ? "rtl" : "ltr"}>
						<div className="overflow-hidden" ref={emblaRef}>
							<div className="flex touch-pan-y -ml-4 rtl:-mr-4 rtl:ml-0">
								{banners.map((banner) => (
									<div
										key={banner.id}
										className="min-w-0 pl-4 rtl:pr-4 rtl:pl-0 flex-[0_0_100%] md:flex-[0_0_50%]"
									>
										<LocalizedLink
											to={banner.link}
											className="block group overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300 h-full"
										>
											<img
												src={banner.image}
												alt={banner.title}
												className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
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
