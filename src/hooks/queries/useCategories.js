import { useQuery } from "@tanstack/react-query";
import categoryApi from "@/features/categories/api/categoryApi";
import { useLanguage } from "@/app/providers/I18nProvider";

export const useCategories = () => {
	const { language } = useLanguage();

	return useQuery({
		queryKey: ["categories", language],
		queryFn: categoryApi.getCategories,
	});
};

export const useCategoryDetails = (slug) => {
	const { language } = useLanguage();

	return useQuery({
		queryKey: ["category", slug, language],
		queryFn: () => categoryApi.getCategoryBySlug(slug),
		enabled: !!slug,
	});
};

export default useCategories;
