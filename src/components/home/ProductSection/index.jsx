import LocalizedLink from "@/components/ui/LocalizedLink";
import React, { useEffect, useState } from "react";
import { } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ArrowRight, ArrowLeft, Timer } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";


/**
 * Universal ProductSection
 * Handles all product grids across the site (Featured, Offers, Best Sellers).
 */
export const ProductSection = ({ title, subtitle, viewAllLink, variant = "default", bg = "background", products = [], isLoading }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const isOffer = variant === "offer";

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			align: "center",
			direction: isRtl ? "rtl" : "ltr",
			dragFree: true,
		},
		[Autoplay({ delay: 4000, stopOnInteraction: true })]
	);

	// Map API products to match the expected format for ProductCard, so we don't need to change ProductCard.
	const productsToDisplay = products && products.length > 0 ? products.map(apiProd => {
		if (apiProd.price && typeof apiProd.price === 'object' && 'current' in apiProd.price) {
			return apiProd;
		}
		const price = apiProd.price || 0;
		const currentPrice = apiProd.final_price || apiProd.special_price || apiProd.sale_price || price;
		const originalPrice = price > currentPrice ? price : null;

		const badges = [];
		if (apiProd.has_flash_sale) {
			badges.push({ type: "sale", label: { en: "Flash Sale", ar: "عرض فلاش" } });
		} else if (apiProd.discount_percentage > 0) {
			badges.push({ type: "sale", label: { en: `${apiProd.discount_percentage}% OFF`, ar: `خصم ${apiProd.discount_percentage}%` } });
		}
		if (apiProd.is_best_seller) {
			badges.push({ type: "bestseller", label: { en: "Best Seller", ar: "الأكثر مبيعاً" } });
		}

		return {
			id: `prod-${apiProd.id}`,
			title: { ar: apiProd.title || apiProd.name || "", en: apiProd.title || apiProd.name || "" },
			category: { ar: apiProd.category || "", en: apiProd.category || "", id: String(apiProd.category_id || "") },
			brand: apiProd.brand || "",
			image: apiProd.primary_image || apiProd.image || "",
			price: { current: currentPrice, original: originalPrice },
			reviews: { rating: apiProd.rating || 0, count: apiProd.rate_count || 0 },
			stock: { quantity: apiProd.quantity || 0 },
			badges,
			link: apiProd.product_link || `/products/${apiProd.id}`,
			_apiOriginal: apiProd
		};
	}) : [];

	if (!isLoading && productsToDisplay.length === 0) {
		return null;
	}

	if (isLoading && (!products || products.length === 0)) {
		return (
			<Section bg={bg} spacing="md" className="overflow-hidden">
				<Container>
					<div className="flex justify-between items-center mb-6">
						<div className="h-8 w-48 bg-slate-200 animate-pulse rounded-md"></div>
						<div className="h-6 w-24 bg-slate-200 animate-pulse rounded-md"></div>
					</div>
					<div className="flex gap-4 overflow-hidden">
						{[...Array(5)].map((_, i) => (
							<div key={i} className="flex-[0_0_65%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_22%] xl:flex-[0_0_18%] min-w-0">
								<div className="w-full h-80 bg-slate-100 animate-pulse rounded-2xl"></div>
							</div>
						))}
					</div>
				</Container>
			</Section>
		);
	}

	return (
		<Section bg={bg} spacing="md" className="overflow-hidden">
			<Container>
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
					<div className="flex items-center gap-3">
						{isOffer && (
							<div className="flex items-center justify-center w-10 h-10 rounded-full bg-danger/10 text-danger">
								<Timer className="w-5 h-5" />
							</div>
						)}
						<div className="flex flex-col gap-2">
							<div className="flex items-center">
								<h2 className="text-xl sm:text-h2 font-bold text-text leading-tight">
									{title[language]}
								</h2>
							</div>
							{subtitle && (
								<p className="text-body text-text-secondary">
									{subtitle[language]}
								</p>
							)}
						</div>
					</div>

					{viewAllLink && (
						<LocalizedLink
							to={viewAllLink}
							className={cn(
								"group inline-flex items-center gap-2 text-sm font-semibold transition-colors",
								isOffer ? "text-danger hover:text-danger/80" : "text-primary hover:text-primary-hover"
							)}
						>
							{isRtl ? "عرض الكل" : "View All"}
							{isRtl ? (
								<ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
							) : (
								<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
							)}
						</LocalizedLink>
					)}
				</div>
				{/* Products Layout: Continuous Slider */}
				<div className="w-full relative" dir={isRtl ? "rtl" : "ltr"}>
					<div className="overflow-hidden" ref={emblaRef}>
						<div className="flex touch-pan-y -ml-4 rtl:-mr-4 rtl:ml-0">
							{/* Render Products */}
							{productsToDisplay.map((prod, i) => (
								<div
									key={prod.id || i}
									className="flex-[0_0_65%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_22%] xl:flex-[0_0_18%] min-w-0 pl-4 rtl:pr-4 rtl:pl-0"
								>
									<ProductCard product={prod} />
								</div>
							))}
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default ProductSection;


