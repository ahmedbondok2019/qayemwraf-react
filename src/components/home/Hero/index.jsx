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
	const [failedImages, setFailedImages] = useState({});

	const defaultDescription = language === "ar"
		? "تصميم وتصنيع وتوريد أحدث أنظمة ووحدات رفوف التخزين الذكية، أرفف المخازن والمستودعات والمشغولات المعدنية بأعلى معايير الجودة والمتانة."
		: "Design, manufacturing and supply of smart storage racking systems, warehouse shelves, and heavy-duty metal products with international standards.";

	const defaultSlides = [
		{
			id: 2,
			title: "وحدات أرفف قياسية للمحلات والشركات",
			description: defaultDescription,
			image: "https://admin.qayemwraf.com/storage/website/images/sliders/1790321193.webp",
			link: "/category/2"
		},
		{
			id: 1,
			title: "وحدات أرفف تخزين خفيفة ومتوسطة",
			description: defaultDescription,
			image: "https://admin.qayemwraf.com/storage/website/images/sliders/1790323233.webp",
			link: "/category/1"
		},
		{
			id: 3,
			title: "وحدات تخزين هيفي ديوتي للمخازن والمستودعات",
			description: defaultDescription,
			image: "https://admin.qayemwraf.com/storage/website/images/sliders/1790325200.jpg",
			link: "/category/5"
		},
		{
			id: 4,
			title: "راكات هيفي ديوتي حمولة طن و 2طن و3طن",
			description: defaultDescription,
			image: "https://admin.qayemwraf.com/storage/website/images/sliders/1790324735.jpg",
			link: "/category/5"
		}
	];

	const rawSliders = sliders && sliders.length > 0 ? sliders : defaultSlides;

	// Bind API data to the slider layout exactly as it is
	const slidesToDisplay = rawSliders.map((apiSlide, index) => {

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

	// Preload the first active slide image immediately to maximize LCP performance
	React.useEffect(() => {
		const firstImage = slidesToDisplay[0]?.image;
		if (firstImage) {
			const link = document.createElement("link");
			link.rel = "preload";
			link.as = "image";
			link.href = firstImage;
			link.setAttribute("fetchpriority", "high");
			document.head.appendChild(link);
			return () => {
				try {
					document.head.removeChild(link);
				} catch {
					// safe cleanup
				}
			};
		}
	}, [slidesToDisplay[0]?.image]);

	if (isLoading && (!sliders || sliders.length === 0)) {
		return (
			<section className="w-full p-0 m-0">
				<div className="w-full h-[60vh] sm:h-[75vh] md:h-[calc(100vh-130px)] min-h-[380px] bg-slate-100 dark:bg-slate-800 animate-pulse"></div>
			</section>
		);
	}

	return (
		<section className="w-full p-0 m-0 relative overflow-hidden">
			<div className="w-full relative overflow-hidden">
				<HeroSlider onSlideChange={setActiveIndex}>
					{slidesToDisplay.map((slide, index) => {
						return (
							<div
								key={slide.id || index}
								className="relative flex-[0_0_100%] min-w-0 select-none h-[60vh] sm:h-[75vh] md:h-[calc(100vh-130px)] min-h-[380px] overflow-hidden bg-slate-100 dark:bg-slate-800"
							>
								{/*Full Background Image */}
								{slide.image && !failedImages[slide.id || index] ? (
									<img
										src={slide.image}
										alt={slide.title || "قايم ورف لحلول التخزين"}
										className="w-full h-full object-cover block"
										loading={index === 0 ? "eager" : "lazy"}
										fetchPriority={index === 0 ? "high" : "auto"}
										decoding={index === 0 ? "sync" : "async"}
										onError={() => {
											setFailedImages((prev) => ({ ...prev, [slide.id || index]: true }));
										}}
									/>
								) : (
									<div className={`w-full h-full ${slide.background || "bg-[#0a2342]"} flex items-center justify-center`}>
										<div className="text-center p-6 text-white/80">
											<h3 className="text-2xl font-bold">{slide.title}</h3>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</HeroSlider>
			</div>
		</section>
	);
};

export default Hero;
