import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Award, ShieldCheck, Tag, Headphones, Truck } from "lucide-react";

export const TrustBar = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const features = [
		{
			id: "experience",
			icon: Award,
			title: { en: "Long Experience", ar: "خبرة طويلة" },
			desc: { en: "More than 15 years", ar: "أكثر من 15 سنة" }
		},
		{
			id: "quality",
			icon: ShieldCheck,
			title: { en: "Guaranteed Quality", ar: "جودة مضمونة" },
			desc: { en: "International standards", ar: "معايير عالمية" }
		},
		{
			id: "prices",
			icon: Tag,
			title: { en: "Competitive Prices", ar: "أسعار تنافسية" },
			desc: { en: "Best value", ar: "أفضل قيمة" }
		},
		{
			id: "support",
			icon: Headphones,
			title: { en: "Technical Support", ar: "دعم فني" },
			desc: { en: "After-sales service", ar: "خدمة ما بعد البيع" }
		},
		{
			id: "delivery",
			icon: Truck,
			title: { en: "Fast Delivery", ar: "توصيل سريع" },
			desc: { en: "To all governorates", ar: "لكل المحافظات" }
		}
	];

	return (
		<Section spacing="none" className="py-6 sm:py-8 lg:py-4">
			<Container>
				<div className="bg-[#021d49] text-white rounded-3xl p-6 sm:p-8 lg:py-4 lg:px-10 shadow-md">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4 items-center justify-items-center">
						{features.map((feat) => {
							const Icon = feat.icon;
							return (
								<div
									key={feat.id}
									className="flex items-center gap-4 sm:gap-5 w-full max-w-[260px] sm:max-w-none mx-auto justify-start md:justify-center sm:last:col-span-2 sm:last:justify-center md:last:col-span-1"
									dir={isRtl ? "rtl" : "ltr"}
								>
									{/* Icon on the right for RTL, left for LTR */}
									<div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
										<Icon className="w-6 h-6 sm:w-7 sm:h-7" />
									</div>
									<div className="flex flex-col text-start">
										<span className="text-sm sm:text-base font-bold leading-tight">
											{feat.title[language]}
										</span>
										<span className="text-xs sm:text-sm text-white/70 font-medium mt-1">
											{feat.desc[language]}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default TrustBar;
