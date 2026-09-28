import { useQuery } from "@tanstack/react-query";
import brandApi from "@/features/brands/api/brandApi";
import { useLanguage } from "@/app/providers/I18nProvider";

export const useBrands = () => {
	const { language } = useLanguage();

	return useQuery({
		queryKey: ["brands", language],
		queryFn: brandApi.getBrands,
	});
};

export const useBrandDetails = (slug) => {
	const { language } = useLanguage();

	return useQuery({
		queryKey: ["brand", slug, language],
		queryFn: () => brandApi.getBrandBySlug(slug),
		enabled: !!slug,
	});
};
