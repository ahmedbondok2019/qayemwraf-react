import React, { useState, useEffect } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { useLanguage } from "@/app/providers/I18nProvider";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";
import LoadingState from "@/pages/Products/components/States/LoadingState";
import ErrorState from "@/pages/Products/components/States/ErrorState";
import EmptyState from "@/pages/Products/components/States/EmptyState";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/ui/ProductCard";
import Section from "@/components/ui/Section";
import LocalizedLink from "@/components/ui/LocalizedLink";
import SEO from "@/components/common/SEO";
import { Timer, ArrowLeft, ArrowRight, Sparkles, Tag } from "lucide-react";

// Real Countdown Timer component
const CountdownTimer = ({ initialSeconds }) => {
	const [timeLeft, setTimeLeft] = useState(initialSeconds);

	useEffect(() => {
		if (timeLeft <= 0) return;
		const intervalId = setInterval(() => {
			setTimeLeft(prev => prev - 1);
		}, 1000);
		return () => clearInterval(intervalId);
	}, [timeLeft]);

	const days = Math.floor(timeLeft / (3600 * 24));
	const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
	const minutes = Math.floor((timeLeft % 3600) / 60);
	const seconds = timeLeft % 60;

	const TimeUnit = ({ value }) => (
		<div className="flex flex-col items-center">
			<div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-danger text-white font-bold text-lg shadow-sm">
				{value.toString().padStart(2, '0')}
			</div>
		</div>
	);

	return (
		<div className="flex items-center gap-1 ltr:ml-4 rtl:mr-4 border border-danger/20 bg-danger/5 p-2 rounded-xl">
			{days > 0 && (
				<>
					<TimeUnit value={days} />
					<span className="text-danger font-bold text-lg mx-1 animate-pulse">:</span>
				</>
			)}
			<TimeUnit value={hours} />
			<span className="text-danger font-bold text-lg mx-1 animate-pulse">:</span>
			<TimeUnit value={minutes} />
			<span className="text-danger font-bold text-lg mx-1 animate-pulse">:</span>
			<TimeUnit value={seconds} />
		</div>
	);
};

const FlashDeals = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

	const [offers, setOffers] = useState([]);
	const [deals, setDeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		setIsLoading(true);
		setError(null);
		try {
			// Fetch both promotional offer banners and flash sales simultaneously
			const [offersRes, flashSalesRes] = await Promise.allSettled([
				api.get(API_ENDPOINTS.OFFERS || "/offers"),
				api.get(API_ENDPOINTS.FLASH_SALES || "/flash-sales")
			]);

			if (offersRes.status === "fulfilled") {
				const res = offersRes.value;
				const isSuccess = res && (res.success === true || res.status === true || Array.isArray(res) || res.data);
				if (isSuccess) {
					const dataPayload = res.data || res;
					const items = Array.isArray(dataPayload) ? dataPayload : (dataPayload?.data || []);
					setOffers(items);
				}
			}

			if (flashSalesRes.status === "fulfilled") {
				const res = flashSalesRes.value;
				const isSuccess = res && (res.success === true || res.status === true || Array.isArray(res) || res.data);
				if (isSuccess) {
					const dataPayload = res.data || res;
					const items = Array.isArray(dataPayload) ? dataPayload : (dataPayload?.data || []);
					setDeals(items);
				}
			}
		} catch (err) {
			console.error("Failed to load offers or flash deals", err);
			setError(err?.message || (isRtl ? "حدث خطأ أثناء جلب العروض." : "Failed to load offers."));
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [isRtl]);

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Offers & Deals", ar: "عروض وتخفيضات" } }
	];

	if (isLoading) return <LoadingState />;
	if (error && offers.length === 0 && deals.length === 0) {
		return (
			<div className="min-h-screen pb-10">
				<ErrorState message={error} onRetry={fetchData} />
			</div>
		);
	}

	const hasOffers = offers.length > 0;
	const hasDeals = deals.length > 0;
	const isEmpty = !hasOffers && !hasDeals;

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			<SEO
				title={isRtl ? "عروض وتخفيضات أرفف التخزين والمشغولات المعدنية | قايم ورف" : "Storage Shelving Offers & Deals | Qayem & Raf"}
				description={isRtl ? "اكتشف أحدث العروض والخصومات الحصرية على وحدات رفوف التخزين، أرفف المستودعات، والمشغولات المعدنية من قايم ورف." : "Discover the latest offers and exclusive deals on storage racking units, warehouse shelving, and metal works from Qayem & Raf."}
				canonical={`https://qayemwraf.com/${language}/flash-deals`}
			/>

			<PageHero 
				title={{ en: "Offers & Deals", ar: "عروض وتخفيضات قايم ورف 🔥" }}
				subtitle={{ en: "Explore our latest promotional campaigns, seasonal discounts, and limited-time deals!", ar: "استمتع بأقوى العروض الحصرية، الخصومات الموسمية، وحلول التخزين بأفضل الأسعار التنافسية!" }}
				breadcrumbs={breadcrumbItems}
			/>

			{isEmpty ? (
				<Container className="py-16">
					<EmptyState 
						title={isRtl ? "لا توجد عروض حالياً" : "No Active Offers Found"}
						description={isRtl ? "تابعنا دائماً للاطلاع على أحدث عروض وتخفيضات أنظمة التخزين والأرفف المعدنية قريباً." : "Check back soon for our upcoming promotions and seasonal discounts."}
					/>
				</Container>
			) : (
				<div className="flex flex-col gap-12 mt-8">
					{/* 1. Promotional Offer Banners (from /offers) */}
					{hasOffers && (
						<Section bg="transparent" spacing="none" className="py-4">
							<Container>
								<div className="flex items-center gap-3 mb-6">
									<div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
										<Sparkles className="w-5 h-5" />
									</div>
									<div>
										<h2 className="text-xl sm:text-2xl font-bold text-text">
											{isRtl ? "أحدث العروض والخصومات" : "Featured Offers & Discounts"}
										</h2>
										<p className="text-xs sm:text-sm text-text-secondary">
											{isRtl ? "عروض خاصة متاحة لفترة محدودة على وحدات التخزين والأرفف" : "Special offers available for a limited time on storage units and shelving"}
										</p>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
									{offers.map((offer, idx) => {
										let link = "/products";
										if (offer.category_id) {
											link = `/category/${offer.category_id}`;
										} else if (offer.link && offer.link !== "https://qayemwraf.com" && offer.link !== "https://qayemwraf.com/") {
											link = offer.link;
										} else if (offer.url && offer.url !== "https://qayemwraf.com" && offer.url !== "https://qayemwraf.com/") {
											link = offer.url;
										}

										const titleText = typeof offer.title === "object"
											? (offer.title?.[language] || offer.title?.ar || offer.name || "")
											: (offer.title || offer.name || "");

										const descText = typeof offer.description === "object"
											? (offer.description?.[language] || offer.description?.ar || "")
											: (offer.description || "");

										const imageUrl = offer.image || offer.category?.image;

										return (
											<div
												key={offer.id || idx}
												className="group relative flex flex-col bg-surface rounded-3xl border border-black/5 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
											>
												{/* Banner Image */}
												{imageUrl && (
													<LocalizedLink to={link} className="block overflow-hidden relative min-h-[260px] sm:min-h-[320px] max-h-[400px] bg-slate-100 dark:bg-slate-900/60 flex items-center justify-center">
														{/* Ambient glow matching the image */}
														<div 
															className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-20 scale-125 pointer-events-none"
															style={{ backgroundImage: `url(${imageUrl})` }}
														/>
														<img
															src={imageUrl}
															alt={titleText || "Offer Banner"}
															loading="lazy"
															className="relative z-10 w-auto h-auto max-h-[360px] max-w-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
														/>
														<div className="absolute top-4 start-4 z-20">
															<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-danger text-white shadow-md">
																<Tag className="w-3.5 h-3.5" />
																{isRtl ? "عرض خاص" : "Special Offer"}
															</span>
														</div>
													</LocalizedLink>
												)}

												{/* Banner Details & CTA */}
												<div className="p-6 flex flex-col justify-between flex-grow gap-4">
													<div>
														<LocalizedLink to={link}>
															<h3 className="text-lg sm:text-xl font-bold text-text group-hover:text-primary transition-colors">
																{titleText}
															</h3>
														</LocalizedLink>
														{descText && (
															<p className="mt-2 text-sm text-text-secondary line-clamp-2">
																{descText}
															</p>
														)}
													</div>

													<div className="pt-2 flex items-center justify-between border-t border-black/5 dark:border-white/5">
														<LocalizedLink
															to={link}
															className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover group-hover:gap-3 transition-all"
														>
															<span>{isRtl ? "استعراض العرض والمنتجات" : "Explore Offer & Products"}</span>
															<ArrowIcon className="w-4 h-4" />
														</LocalizedLink>

														{offer.category?.title && (
															<span className="text-xs text-text-muted bg-background px-3 py-1 rounded-full border border-black/5 dark:border-white/5">
																{typeof offer.category.title === "object" ? (offer.category.title[language] || offer.category.title.ar) : offer.category.title}
															</span>
														)}
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</Container>
						</Section>
					)}

					{/* 2. Flash Deals Campaigns (from /flash-sales) */}
					{hasDeals && (
						<div className="flex flex-col gap-10">
							{deals.map((deal) => {
								const products = (deal.products || []).map(apiProd => {
									const price = apiProd.price || 0;
									const currentPrice = apiProd.final_price || apiProd.special_price || apiProd.sale_price || price;
									const originalPrice = price > currentPrice ? price : null;
									const badges = [];
									if (apiProd.has_flash_sale) {
										badges.push({ type: "sale", label: { en: "Flash Sale", ar: "عرض فلاش" } });
									} else if (apiProd.discount_percentage > 0) {
										badges.push({ type: "sale", label: { en: `${apiProd.discount_percentage}% OFF`, ar: `خصم ${apiProd.discount_percentage}%` } });
									}
									const resolveI18n = (val, fallback) => {
										if (val && typeof val === 'object') return val;
										return { ar: val || fallback || "", en: val || fallback || "" };
									};

									return {
										id: `prod-${apiProd.id}`,
										title: resolveI18n(apiProd.title || apiProd.name, ""),
										category: { ...resolveI18n(apiProd.category, ""), id: String(apiProd.category_id || "") },
										image: apiProd.primary_image || apiProd.image || "",
										price: { current: currentPrice, original: originalPrice },
										reviews: { rating: apiProd.rating || 0, count: apiProd.rate_count || 0 },
										stock: { quantity: apiProd.quantity || 0, total: apiProd.total_quantity || 100 },
										badges,
										link: apiProd.product_link || `/product/${apiProd.id}`,
										_apiOriginal: apiProd
									};
								});

								return (
									<Section key={deal.id} bg="surface" spacing="none" className="py-10">
										<Container>
											{/* Flash Deal Header */}
											<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
												<div className="flex items-center gap-4">
													<div className="w-14 h-14 rounded-full bg-danger/10 text-danger flex items-center justify-center flex-shrink-0">
														<Timer className="w-7 h-7" />
													</div>
													<div>
														<h2 className="text-xl sm:text-2xl font-bold text-text mb-1">
															{isRtl ? "عروض حصرية لفترة محدودة" : "Exclusive Limited Time Offers"}
														</h2>
														<p className="text-text-secondary text-sm">
															{isRtl ? "ينتهي العرض قريباً، لا تفوت الفرصة!" : "Offer ends soon, don't miss out!"}
														</p>
													</div>
												</div>
												{deal.remaining_seconds > 0 && (
													<CountdownTimer initialSeconds={deal.remaining_seconds} />
												)}
											</div>

											{/* Products Grid */}
											<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
												{products.map((prod, i) => (
													<div key={prod.id || i} className="flex flex-col h-full">
														<ProductCard product={prod} />
													</div>
												))}
											</div>
										</Container>
									</Section>
								);
							})}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default FlashDeals;
