import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { collectionsData } from "./collections.data";

export const MedicalCollections = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<Section bg="surface" spacing="lg">
			<Container>
				{/* Section Header */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
					<div className="max-w-2xl">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-heading mb-2 sm:mb-4 tracking-tight">
							{isRtl ? "المجموعات الطبية" : "Medical Collections"}
						</h2>
						<p className="text-sm sm:text-base lg:text-lg text-text-secondary">
							{isRtl
								? "استكشف مجموعاتنا المصنفة بعناية لتلبية كافة احتياجاتك الصحية بضغطة زر."
								: "Explore our carefully curated collections designed to meet all your healthcare needs."}
						</p>
					</div>
					<LocalizedLink
						to="/collections"
						className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-hover transition-colors group"
					>
						{isRtl ? "عرض كل المجموعات" : "View All Collections"}
						<ArrowUpRight className={cn("w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1", isRtl && "group-hover:-translate-x-1")} />
					</LocalizedLink>
				</div>

				{/* Bento Grid */}
				<div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[160px] sm:auto-rows-[200px] md:auto-rows-[220px] gap-3 sm:gap-4 md:gap-6">
					{collectionsData.map((collection, index) => {
						const isLarge = collection.size === "large";

						return (
							<LocalizedLink
								key={collection.id}
								to={collection.link}
								className={cn(
									"group relative rounded-2xl overflow-hidden block shadow-sm hover:shadow-xl transition-all duration-500",
									isLarge ? "md:col-span-2 md:row-span-2" : "col-span-1 row-span-1"
								)}
							>
								{/* Image Background */}
								<img
									src={collection.image}
									alt={collection.title[language]}
									className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
								/>

								{/* Gradient Overlay */}
								<div className={cn(
									"absolute inset-0 bg-gradient-to-t transition-opacity duration-300",
									isLarge ? "from-slate-900/90 via-slate-900/20 to-transparent" : "from-slate-900/80 to-transparent"
								)} />

								{/* Content */}
								<div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
									<div className="flex items-center justify-between gap-4">
										<div className="flex flex-col">
											<h3 className={cn(
												"font-bold text-white tracking-wide transition-colors",
												isLarge ? "text-2xl md:text-3xl mb-2" : "text-lg md:text-xl",
												!isLarge && "group-hover:text-primary-100"
											)}>
												{collection.title[language]}
											</h3>
											{isLarge && collection.subtitle && (
												<p className="text-slate-200 text-sm md:text-base max-w-sm">
													{collection.subtitle[language]}
												</p>
											)}
										</div>

										{/* Elegant Arrow Button that slides in on hover */}
										<div className={cn(
											"w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 transition-all duration-300 group-hover:bg-primary group-hover:border-primary",
											isRtl ? "group-hover:-translate-x-2" : "group-hover:translate-x-2"
										)}>
											<ArrowUpRight className={cn("w-5 h-5 text-white", isRtl && "scale-x-[-1]")} />
										</div>
									</div>
								</div>
							</LocalizedLink>
						);
					})}
				</div>
			</Container>
		</Section>
	);
};

export default MedicalCollections;
