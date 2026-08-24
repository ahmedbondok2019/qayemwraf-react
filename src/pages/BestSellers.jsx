import React, { useMemo } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import ProductCard from "@/components/ui/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/ProductCard";
import { useBestSellers } from "@/hooks/queries/useBestSellers";

/**
 * Helper to format a numeric ID back to frontend mock-compatible 'prod-X' format.
 */
const formatProductIdForFrontend = (productId) => {
	if (productId === undefined || productId === null) return "";
	if (typeof productId === "string" && productId.startsWith("prod-")) {
		return productId;
	}
	const parsed = parseInt(productId, 10);
	if (!isNaN(parsed)) {
		return `prod-${parsed}`;
	}
	return String(productId);
};

/**
 * Helper to construct absolute URLs for images starting with relative database paths.
 */
const resolveImageUrl = (url) => {
	if (!url) return "";
	if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
		return url;
	}
	const cleanPath = url.startsWith("/") ? url.substring(1) : url;
	return `https://egimedical.com/${cleanPath}`;
};

/**
 * Localize helper to ensure titles and localized values always support { en, ar } structure.
 */
const getLocalizedValue = (value) => {
	if (!value) return { en: "", ar: "" };
	if (typeof value === "object") {
		return {
			en: value.en || value.ar || "",
			ar: value.ar || value.en || ""
		};
	}
	return { en: value, ar: value };
};

/**
 * Map backend images schema to flat array of absolute URL strings
 */
const mapImages = (images, fallbackImage) => {
	if (Array.isArray(images) && images.length > 0) {
		return images.map(img => {
			if (typeof img === 'string') return resolveImageUrl(img);
			if (img && typeof img === 'object') return resolveImageUrl(img.image || img.url || "");
			return "";
		}).filter(Boolean);
	}
	return fallbackImage ? [resolveImageUrl(fallbackImage)] : [];
};

/**
 * Helper to parse numbers safely from strings.
 */
const parsePrice = (value) => {
	if (value === undefined || value === null) return 0;
	if (typeof value === "number") return value;
	const parsed = parseFloat(value);
	return isNaN(parsed) ? 0 : parsed;
};

// Robust mapping of backend product records to frontend compatible structure
const mapBackendProduct = (prod) => {
	if (!prod) return null;

	const finalPrice = prod.final_price || prod.special_price || prod.sale_price;
	const basePrice = prod.price;

	const unitPrice = parsePrice(finalPrice) || (basePrice && typeof basePrice === 'object' ? parsePrice(basePrice.current) : parsePrice(basePrice));
	const originalPrice = basePrice && typeof basePrice === 'object' ? parsePrice(basePrice.original) : (parsePrice(basePrice) || unitPrice);

	const frontendProductId = formatProductIdForFrontend(prod.id);

	const imageList = mapImages(prod.images || prod.gallery, prod.image || prod.primary_image);
	const primaryImage = resolveImageUrl(prod.image || prod.primary_image) || imageList[0] || "";

	const titleValue = prod.title || prod.name || prod.translation?.name || prod.translation?.title || "";

	return {
		id: frontendProductId,
		sku: prod.sku || "",
		title: getLocalizedValue(titleValue),
		slug: prod.slug || String(frontendProductId),
		brand: prod.brand || "",
		category: prod.category || [],
		images: imageList,
		image: primaryImage,
		price: { current: unitPrice, original: originalPrice },
		reviews: {
			rating: parsePrice(prod.rating !== undefined ? prod.rating : (prod.reviews?.rating || 0)),
			count: parseInt(prod.rate_count !== undefined ? prod.rate_count : (prod.reviews?.count || prod.reviewsCount || 0), 10)
		},
		stock: {
			quantity: prod.stock?.quantity !== undefined ? prod.stock.quantity : (prod.quantity !== undefined ? prod.quantity : 99),
			inStock: prod.stock?.inStock !== undefined ? prod.stock.inStock : (prod.quantity > 0 || prod.ignore_quantity)
		},
		status: prod.status || "active",
	};
};

export const BestSellers = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	// Fetch only best sellers
	const { data: responseData, isLoading, error } = useBestSellers();

	const rawProducts = useMemo(() => {
		const list = responseData?.data?.data || responseData?.data || (Array.isArray(responseData) ? responseData : []);
		return Array.isArray(list) ? list : [];
	}, [responseData]);

	const products = useMemo(() => rawProducts.map(mapBackendProduct).filter(Boolean), [rawProducts]);

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Best Sellers", ar: "الأكثر مبيعاً" } }
	];

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			<PageHero
				title={{ en: "Best Sellers", ar: "الأكثر مبيعاً" }}
				subtitle={{ en: "Discover our most popular and trusted medical equipment chosen by professionals.", ar: "اكتشف أجهزتنا الطبية الأكثر شعبية وثقة والمختارة من قبل المحترفين." }}
				count={products.length}
				breadcrumbs={breadcrumbItems}
			/>

			<Container className="mt-8">
				{isLoading ? (
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
						{[...Array(10)].map((_, i) => (
							<ProductCardSkeleton key={i} />
						))}
					</div>
				) : error ? (
					<div className="flex flex-col items-center justify-center py-20 text-center">
						<span className="text-danger font-bold text-lg mb-2">
							{isRtl ? "فشل تحميل المنتجات" : "Failed to load products"}
						</span>
						<span className="text-text-secondary text-sm">
							{error.message || (isRtl ? "يرجى المحاولة مرة أخرى لاحقاً" : "Please try again later")}
						</span>
					</div>
				) : products.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-20 text-center">
						<span className="text-text-secondary font-bold text-lg">
							{isRtl ? "لا توجد منتجات أكثر مبيعاً حالياً" : "No best sellers available at the moment"}
						</span>
					</div>
				) : (
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
						{products.map(product => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				)}
			</Container>
		</div>
	);
};

export default BestSellers;
