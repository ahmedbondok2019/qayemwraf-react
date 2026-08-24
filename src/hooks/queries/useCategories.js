import { useQuery } from "@tanstack/react-query";
import categoryApi from "@/features/categories/api/categoryApi";

export const useCategories = () => {
	return useQuery({
		queryKey: ["categories"],
		queryFn: categoryApi.getCategories,
	});
};

export const useCategoryDetails = (slug) => {
	return useQuery({
		queryKey: ["category", slug],
		queryFn: () => categoryApi.getCategoryBySlug(slug),
		enabled: !!slug,
	});
};

