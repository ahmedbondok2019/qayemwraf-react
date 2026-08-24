import { useQuery } from "@tanstack/react-query";
import productApi from "@/features/products/api/productApi";

export const useSearchResults = (query) => {
	return useQuery({
		queryKey: ["search-results", query],
		queryFn: () => productApi.searchProducts(query),
		enabled: !!query,
	});
};

export default useSearchResults;

