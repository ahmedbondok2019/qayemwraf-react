import { useQuery } from "@tanstack/react-query";
import brandApi from "@/features/brands/api/brandApi";

export const useBrands = () => {
	return useQuery({
		queryKey: ["brands"],
		queryFn: brandApi.getBrands,
	});
};

export const useBrandDetails = (slug) => {
	return useQuery({
		queryKey: ["brand", slug],
		queryFn: () => brandApi.getBrandBySlug(slug),
		enabled: !!slug,
	});
};

