import { useQuery } from "@tanstack/react-query";
import productApi from "@/features/products/api/productApi";
import { useLanguage } from "@/app/providers/I18nProvider";

export const useOffers = () => {
	const { language } = useLanguage();

	return useQuery({
		queryKey: ["offers", language],
		queryFn: productApi.getOffers,
	});
};

export default useOffers;
