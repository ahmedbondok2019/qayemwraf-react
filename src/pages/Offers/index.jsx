import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { PageHero } from "@/components/ui/PageHero";
import { useOffers } from "@/hooks/queries/useOffers";
import ErrorState from "@/pages/Products/components/States/ErrorState";
import LoadingState from "@/pages/Products/components/States/LoadingState";
import { ArrowLeft, ArrowRight, Percent, Tag, ChevronRight, ChevronLeft } from "lucide-react";
import SEO from "@/components/common/SEO";

const Offers = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const { data: responseData, isLoading, error } = useOffers();

	// Support response format from API client interceptor or direct payload
	const offers = responseData?.data || (Array.isArray(responseData) ? responseData : []);

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Offers & Deals", ar: "عروض وتخفيضات" } },
	];

	if (isLoading) {
		return <LoadingState />;
	}

	if (error) {
		return (
			<div className="flex flex-col w-full min-h-screen bg-background pb-10 px-4">
				<ErrorState
					message={error?.message || (isRtl ? "حدث خطأ أثناء تحميل العروض." : "Failed to load offers.")}
					onRetry={() => window.location.reload()}
				/>
			</div>
		);
	}

	const pageTitle = isRtl
		? "عروض وتخفيضات أرفف التخزين والمخازن | قايم ورف"
		: "Storage Racks Offers & Deals | Qayem & Raf";

	const pageDescription = isRtl
		? "اكتشف أقوى عروض وتخفيضات وحدات رفوف التخزين المعدنية، أرفف المخازن والمستودعات من قايم ورف بأفضل الأسعار وأعلى جودة."
		: "Discover the best offers and exclusive discounts on heavy and light storage racks, warehouse shelving, and shop fixtures.";

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			<SEO
				title={pageTitle}
				description={pageDescription}
				keywords={isRtl ? "عروض, تخفيضات, خصومات أرفف, وحدات أرفف, قايم ورف" : "offers, storage rack deals, discounts, qayem and raf"}
				canonical={`https://qayemwraf.com/${language}/offers`}
			/>

			<PageHero
				title={{ en: "Offers & Deals", ar: "عروض وتخفيضات 🏷️" }}
				subtitle={{
					en: "Explore our latest special offers, discounts, and exclusive deals on storage solutions.",
					ar: "اكتشف أحدث العروض الحصرية والتخفيضات المميزة على وحدات وحلول التخزين.",
				}}
				count={offers.length}
				countLabel={{ en: "Offers", ar: "عروض" }}
				breadcrumbs={breadcrumbItems}
			/>

			<Container className="mt-10 sm:mt-12">
				{offers.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-20 text-text-muted">
						<Percent className="w-16 h-16 mb-4 text-primary/40 stroke-1" />
						<h3 className="text-xl font-bold text-text mb-2">
							{isRtl ? "لا توجد عروض نشطة حالياً" : "No active offers at the moment"}
						</h3>
						<p className="text-sm text-text-secondary text-center max-w-md">
							{isRtl
								? "يرجى التحقق مرة أخرى قريباً للاطلاع على أحدث الخصومات والتخفيضات المميزة."
								: "Please check back soon for our latest exclusive deals and special discounts."}
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
						{offers.map((offer) => {
							const offerTitle = offer.title || offer.name || "";
							const offerDescription = offer.description || offer.category?.description || "";
							const offerImage = offer.image || offer.category?.image || "";
							
							// Resolve link target safely
							let targetLink = "/products";
							if (offer.link_type === "category" && (offer.category_id || offer.category_slug || offer.link_id)) {
								const catParam = offer.category_id || offer.category_slug || offer.link_id;
								targetLink = `/category/${catParam}`;
							} else if (offer.link_type === "product" && (offer.product_id || offer.link_id)) {
								targetLink = `/products/${offer.product_id || offer.link_id}`;
							} else if (offer.link) {
								targetLink = offer.link;
							} else if (offer.url) {
								targetLink = offer.url;
							}

							const isFlash = Boolean(offer.filters?.flash_sale);

							return (
								<LocalizedLink
									key={offer.id}
									to={targetLink}
									className="group flex flex-col bg-surface border border-border/70 rounded-3xl overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1"
								>
									{/* Offer Banner Image */}
									<div className="relative w-full aspect-[16/9] sm:aspect-[4/3] bg-surface-2 overflow-hidden flex items-center justify-center">
										{offerImage ? (
											<img
												src={offerImage}
												alt={offerTitle}
												className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
												loading="lazy"
											/>
										) : (
											<Percent className="w-16 h-16 text-text-muted/40" />
										)}

										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

										{/* Badges */}
										<div className="absolute top-4 start-4 flex items-center gap-2">
											<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-md">
												<Tag className="w-3.5 h-3.5" />
												{isRtl ? "عرض خاص" : "Special Offer"}
											</span>
											{isFlash && (
												<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-danger text-white text-xs font-bold shadow-md animate-pulse">
													⚡ {isRtl ? "عروض حصرية" : "Flash Deal"}
												</span>
											)}
										</div>
									</div>

									{/* Content */}
									<div className="p-6 flex flex-col flex-1">
										<h2 className="text-xl font-bold text-text group-hover:text-primary transition-colors duration-200 mb-2 leading-snug">
											{offerTitle}
										</h2>

										{offerDescription ? (
											<p className="text-sm text-text-secondary line-clamp-2 mb-6 leading-relaxed">
												{offerDescription}
											</p>
										) : (
											<p className="text-sm text-text-secondary mb-6 leading-relaxed">
												{isRtl
													? "تصفح أحدث وحدات التخزين المشمولة بهذا العرض بأسعار خاصة."
													: "Browse the latest storage units included in this deal at special prices."}
											</p>
										)}

										{/* CTA Button */}
										<div className="mt-auto flex items-center justify-between w-full pt-4 border-t border-border/60">
											<span className="text-sm font-bold text-primary group-hover:text-primary-hover transition-colors flex items-center gap-1.5">
												{isRtl ? "تصفح العرض والمنتجات" : "View Deal & Products"}
											</span>
											<div className="w-9 h-9 rounded-full bg-surface-2 border border-border/40 flex items-center justify-center text-text-muted group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
												{isRtl ? (
													<ChevronLeft className="w-4.5 h-4.5" />
												) : (
													<ChevronRight className="w-4.5 h-4.5" />
												)}
											</div>
										</div>
									</div>
								</LocalizedLink>
							);
						})}
					</div>
				)}
			</Container>
		</div>
	);
};

export default Offers;
