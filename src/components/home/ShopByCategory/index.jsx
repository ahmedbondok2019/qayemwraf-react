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
		id: "warehouse-shelving",
		title: { en: "Warehouse Shelving", ar: "أرفف المخازن والمستودعات" },
		desc: { en: "Heavy duty pallet racking and high capacity storage", ar: "أنظمة باليت راك وأرفف أحمال ثقيلة للمستودعات" },
		image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
		link: "/category/warehouse-shelving"
	},
	{
		id: "retail-shelving",
		title: { en: "Supermarket & Store Racks", ar: "أرفف السوبرماركت والمحلات" },
		desc: { en: "Gondola island shelves, wall displays, and accessories", ar: "أرفف جزيرة وسطية، وحدات حائطية، واستاندات عرض" },
		image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop",
		link: "/category/retail-shelving"
	},
	{
		id: "medium-duty",
		title: { en: "Medium & Light Duty Shelving", ar: "أرفف أحمال متوسطة وخفيفة" },
		desc: { en: "Longspan and boltless steel shelves for manual picking", ar: "أرفف لونج سبان وصاج بدون مسامير لسهولة الترتيب" },
		image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=800&auto=format&fit=crop",
		link: "/category/medium-duty"
	},
	{
		id: "storage-cabinets",
		title: { en: "Metal Cabinets & Lockers", ar: "دواليب ولوكرات صاج" },
		desc: { en: "Industrial storage cabinets and staff lockers", ar: "دواليب صاج سميك ولوكرات حفظ أمانات وملفات" },
		image: "https://images.unsplash.com/photo-1584820927498-cafe8c1c969b?q=80&w=800&auto=format&fit=crop",
		link: "/category/storage-cabinets"
	},
	{
		id: "cantilever-racks",
		title: { en: "Cantilever Racks", ar: "أرفف كانتليفر للمواسير والأخشاب" },
		desc: { en: "Specialized storage for long and bulky industrial materials", ar: "حلول تخزين للأطوال والأنابيب والألواح الخشبية والمعدنية" },
		image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
		link: "/category/cantilever"
	},
	{
		id: "custom-metal",
		title: { en: "Custom Metal Fabrication", ar: "المشغولات المعدنية المخصصة" },
		desc: { en: "Workbenches, transport trolleys, and tailored steel fitouts", ar: "تروليات بضائع، طاولات تشغيل صاج، وتفصيل حسب الطلب" },
		image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
		link: "/category/custom-metal"
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
							{isRtl ? "أقسام وتصنيفات حلول التخزين والمشغولات المعدنية" : "Comprehensive storage solutions and metal fabrication categories"}
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

