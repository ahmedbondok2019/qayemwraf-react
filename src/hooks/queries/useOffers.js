import { useQuery } from "@tanstack/react-query";
import productApi from "@/features/products/api/productApi";

export const useOffers = () => {
	return useQuery({
		queryKey: ["offers"],
		queryFn: productApi.getOffers,
	});
};

