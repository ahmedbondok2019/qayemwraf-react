import { useQuery } from "@tanstack/react-query";
import productApi from "@/features/products/api/productApi";

export const useProducts = (params, options = {}) => {
	return useQuery({
		queryKey: ["products", params],
		queryFn: () => productApi.getProducts(params),
		...options,
	});
};

export const useProductDetails = (slug) => {
	return useQuery({
		queryKey: ["product", slug],
		queryFn: () => productApi.getProductBySlug(slug),
		enabled: !!slug,
	});
};


