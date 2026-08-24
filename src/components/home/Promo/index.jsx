import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft, Tag } from "lucide-react";

export const PromoSection = ({ offers }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

	let mappedOffers = [];
	if (offers && offers.length > 0) {
		mappedOffers = offers.map((offer, index) => {
			const bgClasses = ["bg-primary/5", "bg-blue-50", "bg-slate-100"];
			const textClasses = ["text-primary", "text-blue-950", "text-slate-900"];
			const btnClasses = [
				"bg-primary text-white hover:bg-primary-hover hover:shadow-primary/30",
				"bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-600/30",
				"bg-slate-900 text-white hover:bg-slate-800 hover:shadow-slate-900/30"
			];
			const badgeClasses = [
				"bg-primary/10 text-primary border-primary/20",
				"bg-blue-600/10 text-blue-600 border-blue-600/20",
				"bg-slate-900/10 text-slate-900 border-slate-900/20"
			];
			
			const colorIdx = index % 3;

			return {
				id: offer.id || `offer-${index}`,
				title: { ar: offer.title || offer.name || "", en: offer.title || offer.name || "" },
				subtitle: { ar: offer.description || "", en: offer.description || "" },
				buttonText: { ar: "تسوق الآن", en: "Shop Now" },
				link: offer.link_type === 'category' ? `/category/${offer.category_id}` : (offer.link || "/"),
				image: offer.image || offer.category?.image || "https://images.unsplash.com/photo-1584820927498-cafe8c1c969b?auto=format&fit=crop&q=80&w=600",
				badge: offer.filters?.flash_sale ? { ar: "عرض خاص", en: "Special Offer" } : null,
				bgClass: bgClasses[colorIdx],
				textClass: textClasses[colorIdx],
				btnClass: btnClasses[colorIdx],
				badgeClass: badgeClasses[colorIdx],
				isFlashSale: !!offer.filters?.flash_sale
			};
		});
	}

	const displayCards = mappedOffers;
	
	const isSingle = displayCards.length === 1;

	const [emblaRef] = useEmblaCarousel(
		{
			loop: displayCards.length > 3,
			align: "center",
			direction: isRtl ? "rtl" : "ltr",
			dragFree: true,
		},
		[Autoplay({ delay: 6000, stopOnInteraction: true })]
	);

	return (
		<Section bg="surface" className="overflow-hidden py-10 lg:py-16">
			<Container>
				<div className="w-full relative" dir={isRtl ? "rtl" : "ltr"}>
					<div className="overflow-hidden -mx-4 px-4 pb-8" ref={emblaRef}>
						<div className={cn("flex touch-pan-y -ml-4 rtl:-mr-4 rtl:ml-0", isSingle && "justify-center")}>
							{displayCards.map((promo, index) => (
								<div
									key={promo.id + index}
									className={cn(
										"min-w-0 pl-4 rtl:pr-4 rtl:pl-0",
										isSingle 
											? "flex-[0_0_100%]" 
											: "flex-[0_0_90%] sm:flex-[0_0_50%] md:flex-[0_0_50%] lg:flex-[0_0_50%]"
									)}
								>
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, margin: "-50px" }}
										transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
										className="h-full"
									>
										<LocalizedLink
											to={promo.link}
											className="group relative block rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/5 hover:shadow-2xl transition-all duration-300"
										>
											<img
												src={promo.image}
												alt={promo.title[language]}
												className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
											/>
										</LocalizedLink>
									</motion.div>
								</div>
							))}
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default PromoSection;
