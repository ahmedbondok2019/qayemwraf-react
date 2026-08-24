import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { motion } from "framer-motion";

import HeroSlider from "./HeroSlider";
import Container from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const defaultFeatures = [
	{
		icon: "Truck",
		title: { ar: "توصيل سريع", en: "Fast Delivery" },
		subtitle: { ar: "لكل المحافظات", en: "To all governorates" }
	},
	{
		icon: "ShieldCheck",
		title: { ar: "جودة عالية", en: "High Quality" },
		subtitle: { ar: "معايير عالمية", en: "International standards" }
	},
	{
		icon: "Settings",
		title: { ar: "دعم فني", en: "Technical Support" },
		subtitle: { ar: "خدمة ما بعد البيع", en: "After-sales service" }
	}
];

export const Hero = ({ sliders = [], isLoading }) => {
	const { language } = useLanguage();
	const [activeIndex, setActiveIndex] = useState(0);

	// Bind API data to the slider layout exactly as it is
	const slidesToDisplay = (sliders || []).map((apiSlide, index) => {

		// Build dynamic link from API fields
		let actionLink = "/shop";
		if (apiSlide.link) {
			actionLink = apiSlide.link;
		} else if (apiSlide.category_id) {
			actionLink = `/category/${apiSlide.category_id}`;
		} else if (apiSlide.link_id && apiSlide.link_type === "category") {
			actionLink = `/category/${apiSlide.link_id}`;
		} else if (apiSlide.link_id && apiSlide.link_type === "product") {
			actionLink = `/product/${apiSlide.link_id}`;
		}

		const defaultDescription = language === "ar"
			? "تصنيع وتوفير أحدث الأجهزة والمستلزمات الطبية للمستشفيات والعيادات والأفراد بجودة ألمانية ومعايير عالمية."
			: "Manufacturing and providing the latest medical devices and equipment for hospitals and clinics with international standards.";

		return {
			id: apiSlide.id || index,
			title: apiSlide.title || "",
			subtitle: apiSlide.description || defaultDescription,
			image: apiSlide.image || "",
			background: apiSlide.background || "bg-[#F4F7FC]",
			features: apiSlide.features || defaultFeatures,
			buttons: {
				primary: {
					en: "Shop Now",
					ar: "تسوق الآن",
					link: actionLink,
				},
				secondary: {
					en: "Browse Categories",
					ar: "تصفح الأقسام",
					link: "/categories",
				}
			}
		};
	});

	// Calm motion variants for text
	const textVariants = {
		hidden: { opacity: 0, y: 15 },
		visible: (custom) => ({
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.35,
				ease: "easeOut",
				delay: custom * 0.1,
			},
		}),
		exit: { opacity: 0, transition: { duration: 0.2 } },
	};

	// Calm motion variants for images
	const imageVariants = {
		hidden: { opacity: 0, x: 20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.4,
				ease: "easeOut",
				delay: 0.2,
			},
		},
		exit: { opacity: 0, transition: { duration: 0.2 } },
	};

	//

	if (isLoading && (!sliders || sliders.length === 0)) {
		return <Section spacing="none" className="pt-4 sm:pt-6 pb-8 sm:pb-12"><Container><div className="min-h-[340px] bg-slate-100 animate-pulse w-full rounded-[32px]"></div></Container></Section>;
	}

	return (
		<Section spacing="none" className="pt-4 sm:pt-6 pb-8 sm:pb-12 md:pb-16">
			<Container>
				<div className="relative rounded-[32px] overflow-hidden shadow-sm">
					<HeroSlider onSlideChange={setActiveIndex}>
						{slidesToDisplay.map((slide, index) => {
							const isActive = index === activeIndex;

							return (
								<div
									key={slide.id || index}
									className="relative flex-[0_0_100%] min-w-0 select-none"
								>
									{/*Full Background Image */}
									{slide.image ? (
										<img
											src={slide.image}
											alt={slide.title || "Hero Slider"}
											className="w-full h-auto object-contain block"
											loading={index === 0 ? "eager" : "lazy"}
										/>
									) : (
										<div className={`w-full aspect-[2.5/1] ${slide.background || "bg-[#0a2342]"}`} />
									)}
								</div>
							);
						})}
					</HeroSlider>
				</div>
			</Container>
		</Section>
	);
};

export default Hero;
