import { useQuery } from "@tanstack/react-query";
import productApi from "@/features/products/api/productApi";
import { useLanguage } from "@/app/providers/I18nProvider";

export const useProducts = (params, options = {}) => {
	const { language } = useLanguage();

	return useQuery({
		queryKey: ["products", params, language],
		queryFn: () => productApi.getProducts(params),
		...options,
	});
};

export const useProductDetails = (slug) => {
	const { language } = useLanguage();

	return useQuery({
		queryKey: ["product", slug, language],
		queryFn: () => productApi.getProductBySlug(slug),
		enabled: !!slug,
	});
};

export default useProducts;
