import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
	{ id: "featured", label: { en: "Featured", ar: "مميز" } },
	{ id: "newest", label: { en: "Newest", ar: "الأحدث" } },
	{ id: "price-asc", label: { en: "Price ↑", ar: "السعر ↑" } },
	{ id: "price-desc", label: { en: "Price ↓", ar: "السعر ↓" } },
	{ id: "rating", label: { en: "Best Rated", ar: "الأعلى تقييماً" } },
	{ id: "bestselling", label: { en: "Best Selling", ar: "الأكثر مبيعاً" } },
];

export const ProductsToolbar = ({ 
	totalItems, 
	itemsPerPage, 
	currentPage, 
	viewMode, 
	onViewModeChange,
	sortOption,
	onSortChange,
	onOpenFilter
}) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [isSortOpen, setIsSortOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Close dropdown on click outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsSortOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Calculate shown items range
	const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	const activeSortLabel = SORT_OPTIONS.find(opt => opt.id === sortOption)?.label[language] || SORT_OPTIONS[0].label[language];

	return (
		<div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 py-6 mb-8 border-b border-border/60">
			{/* Result Count - Premium Layout */}
			<div className="flex flex-col gap-1 w-full lg:w-auto text-start">
				<h2 className="text-xl sm:text-2xl font-bold text-text">
					{isRtl ? `${totalItems} منتج طبي` : `${totalItems} Medical Products`}
				</h2>
				<span className="text-sm font-medium text-text-secondary">
					{isRtl 
						? `عرض ${startItem} - ${endItem} من ${totalItems} منتج`
						: `Showing ${startItem} - ${endItem} of ${totalItems} products`
					}
				</span>
			</div>

			<div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
				
				{/* Custom Sort Dropdown */}
				<div className="relative flex items-center gap-2 flex-1 sm:flex-none w-full sm:w-auto" ref={dropdownRef}>
					<span className="text-sm font-semibold text-text-secondary hidden md:inline-block shrink-0 uppercase tracking-wide">
						{isRtl ? "ترتيب حسب:" : "Sort By"}
					</span>
					
					{/* Mobile Filter Button (shows only on lg and below) */}
					{onOpenFilter && (
						<button
							onClick={onOpenFilter}
							className="lg:hidden flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-surface border border-border/80 text-sm font-semibold hover:border-primary/50 hover:bg-surface-2 transition-all flex-1 sm:flex-none"
						>
							<svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
							</svg>
							<span>{isRtl ? "الفلاتر" : "Filters"}</span>
						</button>
					)}

					<button
						onClick={() => setIsSortOpen(!isSortOpen)}
						className="flex items-center gap-3 h-11 px-4 rounded-xl bg-surface border border-border/80 text-sm font-bold hover:border-primary/50 hover:bg-surface-2 transition-all min-w-[160px] sm:min-w-[180px] justify-between flex-1 sm:flex-none"
					>
						<span className="truncate text-text">{activeSortLabel}</span>
						<ChevronDown className={cn("w-4 h-4 text-text-secondary transition-transform duration-200", isSortOpen && "rotate-180")} />
					</button>

					{/* Dropdown Menu */}
					{isSortOpen && (
						<div className={cn(
							"absolute top-full mt-2 w-full sm:w-[220px] bg-surface rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border py-2 z-50 overflow-hidden",
							isRtl ? "left-0" : "right-0"
						)}>
							{SORT_OPTIONS.map((option) => (
								<button
									key={option.id}
									onClick={() => {
										onSortChange(option.id);
										setIsSortOpen(false);
									}}
									className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-start hover:bg-surface-2 transition-colors group"
								>
									<span className={cn(
										"transition-colors",
										sortOption === option.id ? "font-bold text-primary" : "text-text font-medium group-hover:text-primary"
									)}>
										{option.label[language]}
									</span>
									{sortOption === option.id && (
										<Check className="w-4 h-4 text-primary" />
									)}
								</button>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductsToolbar;
