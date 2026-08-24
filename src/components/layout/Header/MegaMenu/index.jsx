import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCategories } from "@/hooks/queries/useCategories";
import { ChevronLeft, ChevronRight, Stethoscope } from "lucide-react";

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

export const MegaMenu = ({ isOpen, language, isRtl, onClose }) => {
	const { data: responseData, isLoading } = useCategories();
	const categories = responseData?.data || (Array.isArray(responseData) ? responseData : []);

	// The invisible overlay spans the entire fixed viewport to catch clicks outside the menu
	const invisibleOverlay = (
		<div className="fixed inset-0 z-40" onClick={onClose} />
	);

	if (isOpen && isLoading) {
		return (
			<AnimatePresence>
				{invisibleOverlay}
				<motion.div
					initial={{ opacity: 0, y: -5 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -5 }}
					className="absolute top-full left-0 mt-2 w-[400px] bg-white dark:bg-slate-950 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-50 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-12"
					onMouseLeave={onClose}
				>
					<div className="flex flex-col items-center gap-4 text-slate-500">
						<span className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
						<span className="font-bold text-sm">
							{language === "ar" ? "جاري تحميل الأقسام..." : "Loading categories..."}
						</span>
					</div>
				</motion.div>
			</AnimatePresence>
		);
	}

	if (isOpen && categories.length === 0) {
		return (
			<AnimatePresence>
				{invisibleOverlay}
				<motion.div
					initial={{ opacity: 0, y: -5 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -5 }}
					className="absolute top-full left-0 mt-2 w-[400px] bg-white dark:bg-slate-950 rounded-2xl shadow-2xl z-50 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-12"
					onMouseLeave={onClose}
				>
					<span className="text-slate-500 font-bold text-sm">
						{language === "ar" ? "لا توجد أقسام متاحة حالياً" : "No categories available"}
					</span>
				</motion.div>
			</AnimatePresence>
		);
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Invisible Fixed Backdrop for closing when clicking outside */}
					<div className="fixed inset-0 z-40" onClick={onClose} />

					{/* Mega Menu Container */}
					<motion.div
						initial={{ opacity: 0, y: -10, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -10, scale: 0.98 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className={cn(
							"absolute top-full mt-2 w-[1100px] max-w-[95vw] max-h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] z-50 border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col",
							isRtl ? "right-0" : "left-0"
						)}
						onMouseLeave={onClose}
					>
						{/* Header Strip */}
						<div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
							<span className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
								<Stethoscope className="w-4 h-4 text-primary" />
								{isRtl ? "استكشف الأقسام الطبية" : "Explore Medical Categories"}
							</span>
							<LocalizedLink 
								to="/categories" 
								onClick={onClose}
								className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 transition-colors"
							>
								{isRtl ? "عرض كل الأقسام" : "View All Categories"}
								{isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
							</LocalizedLink>
						</div>

						{/* Grid Layout for Categories */}
						<div className="w-full p-6 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-950">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
								{categories.map((category) => {
									const categoryTitle = getLocalizedValue(category.title || category.name);
									
									const subCats = category.sub_categories || [];
									let subtitle = "";
									if (subCats.length > 0) {
										subtitle = subCats.slice(0, 3).map(s => getLocalizedValue(s.title || s.name)[language]).join(' • ');
									} else {
										subtitle = language === "ar" 
											? "أحدث المعدات والأجهزة" 
											: "Latest equipment & devices";
									}

									return (
										<LocalizedLink
											key={category.id}
											to={`/category/${category.id}`}
											onClick={onClose}
											className="group flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all duration-300"
										>
											<div className="flex flex-col flex-1">
												<h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-200 mb-1">
													{categoryTitle[language]}
												</h3>
												<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
													{subtitle}
												</p>
											</div>
										</LocalizedLink>
									);
								})}
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default MegaMenu;
