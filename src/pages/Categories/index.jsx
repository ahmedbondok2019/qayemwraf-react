import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { useCategories } from "@/hooks/queries/useCategories";
import { PageHero } from "@/components/ui/PageHero";
import { ChevronRight, ChevronLeft, LayoutGrid } from "lucide-react";
import ErrorState from "../Products/components/States/ErrorState";

const getLocalizedValue = (value) => {
	if (!value) return { en: "", ar: "" };
	if (typeof value === "object") {
		return {
			en: value.en || value.ar || "",
			ar: value.ar || value.en || ""
		};
	}
	return { en: value, ar: value };
};

const Categories = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const { data: responseData, isLoading, error } = useCategories();
	
	const categories = responseData?.data || (Array.isArray(responseData) ? responseData : []);

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "All Categories", ar: "كل الأقسام" } }
	];

	if (error) {
		return (
			<div className="flex flex-col w-full min-h-screen bg-background pb-10 px-4">
				<ErrorState message={error?.message || "Failed to load categories."} onRetry={() => window.location.reload()} />
			</div>
		);
	}

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			<PageHero
				title={{ en: "Medical Categories", ar: "الأقسام الطبية" }}
				subtitle={{ en: "Browse our comprehensive directory of medical equipment and supplies.", ar: "تصفح الدليل الشامل للمعدات والمستلزمات الطبية." }}
				count={categories.length}
				breadcrumbs={breadcrumbItems}
			/>

			<Container className="mt-12">
				{isLoading ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{[...Array(8)].map((_, i) => (
							<div key={i} className="h-48 bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse" />
						))}
					</div>
				) : categories.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-20 text-slate-500">
						<LayoutGrid className="w-16 h-16 mb-4 text-slate-300 dark:text-slate-700" />
						<p>{isRtl ? "لا توجد أقسام متاحة حالياً." : "No categories available at the moment."}</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{categories.map((category) => {
							const categoryTitle = getLocalizedValue(category.title || category.name);
							const subCats = category.sub_categories || [];
							const image = category.image || category.primary_image || null;

							return (
								<LocalizedLink
									key={category.id}
									to={`/category/${category.id}`}
									className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300"
								>
									{/* Image Section */}
									<div className="w-full h-48 bg-slate-50 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center">
										{image ? (
											<img 
												src={image} 
												alt={categoryTitle.en} 
												className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
											/>
										) : (
											<LayoutGrid className="w-12 h-12 text-slate-300 dark:text-slate-600 group-hover:scale-110 transition-transform duration-500" />
										)}
										<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</div>

									{/* Content Section */}
									<div className="p-6 flex flex-col flex-1">
										<h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-200 mb-2">
											{categoryTitle[language]}
										</h3>
										
										{subCats.length > 0 ? (
											<ul className="flex flex-col gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-6">
												{subCats.slice(0, 3).map(sub => (
													<li key={sub.id} className="flex items-center gap-2 truncate">
														<span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
														<span className="truncate">{getLocalizedValue(sub.title || sub.name)[language]}</span>
													</li>
												))}
												{subCats.length > 3 && (
													<li className="text-xs font-bold text-primary mt-1">
														{isRtl ? `+${subCats.length - 3} أقسام أخرى` : `+${subCats.length - 3} more`}
													</li>
												)}
											</ul>
										) : (
											<p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
												{isRtl ? "اكتشف مجموعة واسعة من أحدث الأجهزة." : "Discover a wide range of latest devices."}
											</p>
										)}

										{/* Action Button */}
										<div className="mt-auto flex items-center justify-between w-full pt-4 border-t border-slate-100 dark:border-slate-800">
											<span className="text-sm font-bold text-primary group-hover:text-primary-hover transition-colors">
												{isRtl ? "تصفح القسم" : "Browse Category"}
											</span>
											<div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
												{isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
											</div>
										</div>
									</div>
								</LocalizedLink>
							);
						})}
					</div>
				)}
			</Container>
		</div>
	);
};

export default Categories;
