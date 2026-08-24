import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Section } from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categoriesData = [
	{
		id: "hospital-equipment",
		title: { en: "Hospital Equipment", ar: "معدات المستشفيات" },
		desc: { en: "Operating room, ICU, and ward furniture", ar: "تجهيزات غرف العمليات والعناية المركزة" },
		image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop",
		link: "/category/hospital-equipment"
	},
	{
		id: "home-care",
		title: { en: "Home Care", ar: "الرعاية المنزلية" },
		desc: { en: "Beds, oxygen concentrators, and aids", ar: "أسرة طبية، مولدات أكسجين ومستلزمات" },
		image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=800&auto=format&fit=crop",
		link: "/category/home-care"
	},
	{
		id: "patient-monitoring",
		title: { en: "Patient Monitoring", ar: "مراقبة العلامات الحيوية" },
		desc: { en: "ECG, multipara monitors, pulse oximeters", ar: "أجهزة رسم القلب وشاشات متابعة المريض" },
		image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop",
		link: "/category/patient-monitoring"
	},
	{
		id: "diagnostics",
		title: { en: "Diagnostics", ar: "أجهزة التشخيص" },
		desc: { en: "Ultrasound, X-ray, and lab analyzers", ar: "أجهزة السونار، الأشعة، والتحاليل" },
		image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
		link: "/category/diagnostics"
	},
	{
		id: "orthopedic",
		title: { en: "Orthopedic", ar: "العظام والحركة" },
		desc: { en: "Braces, supports, and mobility aids", ar: "دعامات، جبائر ومستلزمات العظام" },
		image: "https://images.unsplash.com/photo-1598006830588-b5706ee92e46?q=80&w=800&auto=format&fit=crop",
		link: "/category/orthopedic"
	},
	{
		id: "rehabilitation",
		title: { en: "Rehabilitation", ar: "العلاج الطبيعي والتأهيل" },
		desc: { en: "Physiotherapy equipment & wheelchairs", ar: "أجهزة العلاج الطبيعي والكراسي المتحركة" },
		image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
		link: "/category/rehabilitation"
	}
];

export const ShopByCategory = ({ categories = [], isLoading }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			align: "start",
			direction: isRtl ? "rtl" : "ltr",
			skipSnaps: false,
		},
		[Autoplay({ delay: 3500, stopOnInteraction: false })]
	);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const categoriesToDisplay = categories && categories.length > 0 ? categories : categoriesData;

	if (isLoading && (!categories || categories.length === 0)) {
		return <Section bg="surface" spacing="lg"><div className="h-[280px] w-full bg-slate-100 animate-pulse rounded-2xl"></div></Section>;
	}

	return (
		<Section bg="surface" spacing="lg" className="overflow-hidden">
			<Container>
				{/* Section Header */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
					<div>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-heading mb-2 sm:mb-3 tracking-tight">
							{isRtl ? "تسوق حسب القسم الرئيسي" : "Featured Categories"}
						</h2>
						<p className="text-text-secondary text-sm sm:text-base lg:text-lg">
							{isRtl ? "الأقسام الطبية الشاملة المعتمدة لتسهيل تصفحك" : "Comprehensive certified medical categories for easy navigation"}
						</p>
					</div>

					{/* Navigation Controls */}
					<div className="flex items-center gap-3">
						<button
							onClick={scrollPrev}
							className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface border border-border text-text hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all duration-300 shadow-sm"
							aria-label="Previous slide"
						>
							{isRtl ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
						</button>
						<button
							onClick={scrollNext}
							className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface border border-border text-text hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all duration-300 shadow-sm"
							aria-label="Next slide"
						>
							{isRtl ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
						</button>
					</div>
				</div>

				{/* Carousel strictly aligned inside Container */}
				<div className="w-full relative" dir={isRtl ? "rtl" : "ltr"}>
					<div className="overflow-hidden py-2" ref={emblaRef}>
						<div className="flex touch-pan-y -ml-4 rtl:-mr-4 rtl:ml-0">
							{categoriesToDisplay.map((cat, index) => {
								const getLocalized = (field) => {
									if (!field) return "";
									if (typeof field === "string") return field;
									return field[language] || field.en || field.ar || "";
								};

								const title = getLocalized(cat.title) || getLocalized(cat.name);
								const desc = getLocalized(cat.desc);
								const linkUrl = (cat.link && typeof cat.link === 'string' && cat.link.startsWith('/')) 
									? cat.link 
									: `/category/${cat.id || cat.link}`;

								return (
									<div
										key={cat.id || index}
										className="flex-[0_0_75%] sm:flex-[0_0_48%] md:flex-[0_0_36%] lg:flex-[0_0_31%] min-w-0 pl-4 rtl:pr-4 rtl:pl-0"
									>
										<LocalizedLink
											to={linkUrl}
											className="group relative rounded-2xl overflow-hidden block shadow-sm hover:shadow-xl transition-all duration-500 h-[220px] sm:h-[260px] md:h-[280px]"
										>
											{/* Background Image */}
											<img
												src={cat.image}
												alt={title}
												className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
											/>

											{/* Gradient Overlay for Readability */}
											<div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent transition-opacity duration-300 group-hover:from-slate-950/95" />

											{/* Card Content Overlay */}
											<div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
												<div className="flex items-end justify-between gap-4">
													<div>
														<h3 className="text-xl font-extrabold text-white mb-1.5 tracking-wide group-hover:text-primary-light transition-colors">
															{title}
														</h3>
														{desc && (
															<p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
																{desc}
															</p>
														)}
													</div>

													{/* Interactive Arrow Button */}
													<div className={cn(
														"w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 transition-all duration-300 group-hover:bg-primary group-hover:border-primary",
														isRtl ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
													)}>
														<ArrowUpRight className={cn("w-4 h-4 text-white", isRtl && "scale-x-[-1]")} />
													</div>
												</div>
											</div>
										</LocalizedLink>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default ShopByCategory;

