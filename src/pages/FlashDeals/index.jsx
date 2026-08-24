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
import { Timer } from "lucide-react";

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
	const [deals, setDeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchFlashDeals = async () => {
			try {
				const response = await api.get(API_ENDPOINTS.FLASH_SALES);
				if (response && response.success) {
					setDeals(response.data || []);
				} else {
					setError(isRtl ? "حدث خطأ أثناء جلب العروض." : "Failed to load flash deals.");
				}
			} catch (err) {
				setError(err?.message || (isRtl ? "حدث خطأ أثناء جلب العروض." : "Failed to load flash deals."));
			} finally {
				setIsLoading(false);
			}
		};
		fetchFlashDeals();
	}, [isRtl]);

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Flash Deals", ar: "عروض فلاش" } }
	];

	if (isLoading) return <LoadingState />;
	if (error) return (
		<div className="min-h-screen pb-10"><ErrorState message={error} onRetry={() => window.location.reload()} /></div>
	);

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-10">
			<PageHero 
				title={{ en: "Flash Deals", ar: "عروض خاطفة 🔥" }}
				subtitle={{ en: "Grab these exclusive deals before time runs out!", ar: "اغتنم هذه العروض الحصرية قبل انتهاء الوقت!" }}
				breadcrumbs={breadcrumbItems}
			/>

			{deals.length === 0 ? (
				<Container className="py-10">
					<EmptyState />
				</Container>
			) : (
				<div className="flex flex-col gap-12 mt-8">
					{deals.map((deal) => {
						// map api products to ProductCard format
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
	);
};

export default FlashDeals;
