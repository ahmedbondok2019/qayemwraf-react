import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const mapBackendProduct = (apiProd) => {
	const priceVal = apiProd.price || 0;
	const currentPrice = apiProd.final_price || apiProd.special_price || apiProd.sale_price || priceVal;
	const originalPrice = priceVal > currentPrice ? priceVal : null;
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
		price: { 
			current: currentPrice, 
			original: originalPrice,
			discount: apiProd.discount_percentage || (originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0)
		},
		reviews: { rating: apiProd.rating || 0, count: apiProd.rate_count || 0 },
		stock: { quantity: apiProd.quantity || 0 },
		badges,
		link: apiProd.product_link || `/products/${apiProd.slug || apiProd.id}`,
		_apiOriginal: apiProd
	};
};

export const useLatestProducts = () => {
	return useQuery({
		queryKey: ["latestProducts"],
		queryFn: async () => {
			try {
				const res = await api.get(API_ENDPOINTS.LATEST_PRODUCTS);
				const data = res?.data?.data || res?.data || [];
				if (Array.isArray(data)) {
					return data.map(mapBackendProduct);
				}
				return [];
			} catch (error) {
				console.error("Failed to fetch latest products:", error);
				return [];
			}
		},
	});
};

export default useLatestProducts;
