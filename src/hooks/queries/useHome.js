import { useQuery } from "@tanstack/react-query";
import homeApi from "@/features/home/api/homeApi";
import { useLanguage } from "@/app/providers/I18nProvider";

export const useHome = () => {
	const { language } = useLanguage();

	return useQuery({
		queryKey: ["home", language],
		queryFn: homeApi.getHomeData,
	});
};

export default useHome;
