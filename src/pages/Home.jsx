import React from "react";
import SEO from "@/components/common/SEO";
import { useLanguage } from "@/app/providers/I18nProvider";

import Hero from "@/components/home/Hero";
import AboutUsSection from "@/components/home/AboutUsSection";
import CategoryPills from "@/components/home/CategoryPills";
import PromoSection from "@/components/home/Promo";
import OfferBanners from "@/components/home/OfferBanners";
import ProductSection from "@/components/home/ProductSection";
import ProductGallerySection from "@/components/home/ProductGallerySection";
import CallToAction from "@/components/home/CTA";
import TrustBar from "@/components/home/TrustBar";
import BlogSection from "@/components/home/BlogSection";
import { homepageConfig } from "@/config/home.config";
import { useHome } from "@/hooks/queries/useHome";
import { useLatestProducts } from "@/hooks/queries/useLatestProducts";

const Home = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const { data, isLoading, error } = useHome();
	// Extract home data from the API response (interceptor returns response.data already)
	const homeData = data?.data || {};

	const { data: latestProducts, isLoading: latestLoading } = useLatestProducts();

	const homeSchema = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				"@id": "https://qayemwraf.com/#website",
				"url": "https://qayemwraf.com/",
				"name": "قايم ورف للمشغولات المعدنية وحلول التخزين",
				"alternateName": ["قايم ورف", "قائم ورف", "Qayem & Raf", "قايم ورف لحلول التخزين"],
				"description": "مصنع وتوريد وحدات رفوف التخزين الذكية، أرفف المخازن والمستودعات، أرفف المحلات والسوبرماركت، والمشغولات المعدنية في مصر.",
				"inLanguage": isRtl ? "ar" : "en"
			},
			{
				"@type": "Organization",
				"@id": "https://qayemwraf.com/#organization",
				"name": "قايم ورف للمشغولات المعدنية وحلول التخزين",
				"url": "https://qayemwraf.com/",
				"logo": "https://qayemwraf.com/android-chrome-512x512.png",
				"image": "https://qayemwraf.com/android-chrome-512x512.png",
				"description": "تصميم وتصنيع وتوريد أحدث أنظمة التخزين، أرفف المخازن، وحدات التخزين، والمشغولات المعدنية بأعلى جودة في مصر."
			}
		]
	};

	return (
		<div className="flex flex-col w-full overflow-hidden">
			<SEO
				title={isRtl ? "قايم ورف | مصنع وحدات رفوف تخزين وأرفف مخازن ومشغولات معدنية" : "Qayem & Raf | Storage Racks, Warehouse Shelving & Metal Works"}
				description={isRtl ? "قايم ورف - أكبر تشكيلة من وحدات رفوف التخزين المعدنية، أرفف المخازن والمستودعات، استاندات وأرفف المحلات والسوبر ماركت. حلول تخزين متكاملة بأفضل الأسعار وأعلى جودة في مصر." : "Qayem & Raf - Leading manufacturer and supplier of storage racking units, warehouse shelving, supermarket racks, and custom metal works in Egypt."}
				keywords={isRtl ? "وحدة رفوف تخزين, ارفف تخزين معدنية, ارفف مخازن, ارفف مستودعات, ارفف سوبرماركت, ارفف محلات, وحدات تخزين صاج, ارفف احمال ثقيلة, تجهيز مخازن, مشغولات معدنية, قايم ورف" : "storage racks, storage racking unit, warehouse shelving, metal racks, supermarket shelving, heavy duty racks, industrial storage, Egypt, Qayem and Raf"}
				canonical={`https://qayemwraf.com/${language}`}
				schema={homeSchema}
			/>

			{homepageConfig.map((section) => {
				switch (section.type) {
					case "hero":
						return (
							<React.Fragment key={section.id}>
								<Hero sliders={homeData.sliders || []} isLoading={isLoading} />
								<AboutUsSection data={homeData.about || homeData.about_us || homeData} isLoading={isLoading} />
							</React.Fragment>
						);
					case "categoryPills":
						return <CategoryPills key={section.id} categories={homeData.categories || []} isLoading={isLoading} />;
					case "trustBar":
						return <TrustBar key={section.id} />;
					case "promo":
						return <PromoSection key={section.id} offers={homeData.offers} />;
					case "offerBanners":
						return <OfferBanners key={section.id} offers={homeData.offers || []} isLoading={isLoading} />;
					case "blogSection":
						return <BlogSection key={section.id} />;
					case "productGallery": {
						const products = latestProducts?.length ? latestProducts : homeData.latest_products || [];
						return (
							<ProductGallerySection
								key={section.id}
								title={section.title}
								subtitle={section.subtitle}
								viewAllLink={section.viewAllLink}
								bg={section.bg}
								products={products}
								isLoading={isLoading || latestLoading}
							/>
						);
					}
					case "productSection":
						let products = [];
						let sectionLoading = isLoading;
						if (section.id === "flash-deals") products = homeData.flash_sales || [];
						if (section.id === "latest-products") {
							products = latestProducts?.length ? latestProducts : homeData.latest_products || [];
							sectionLoading = isLoading || latestLoading;
						}
						if (section.id === "best-sellers") products = homeData.top_sellers || [];

						return (
							<ProductSection
								key={section.id}
								variant={section.variant}
								title={section.title}
								subtitle={section.subtitle}
								viewAllLink={section.viewAllLink}
								bg={section.bg}
								products={products}
								isLoading={sectionLoading}
							/>
						);
					case "cta":
						return <CallToAction key={section.id} />;
					default:
						return null;
				}
			})}
		</div>
	);
};

export default Home;
