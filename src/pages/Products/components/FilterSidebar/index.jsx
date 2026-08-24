import React, { createContext, useContext, useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { cn } from "@/lib/utils";

// Import sub-components
import { FilterSection } from "./FilterSection";
import { CheckboxGroup } from "./CheckboxGroup";
import { RadioGroup } from "./RadioGroup";
import { PriceSlider } from "./PriceSlider";
import { RatingSelector } from "./RatingSelector";
import { BrandList } from "./BrandList";
import { CategoryTree } from "./CategoryTree";
import { Availability } from "./Availability";
import { FilterFooter } from "./FilterFooter";

// Create context for any shared state (like mobile drawer open state) if needed deeply
const FilterContext = createContext();

export const FilterSidebar = ({ children, isOpen, onClose }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Lock body scroll when mobile drawer is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => { document.body.style.overflow = 'unset'; };
	}, [isOpen]);

	return (
		<FilterContext.Provider value={{}}>
			{/* Mobile Overlay */}
			{isOpen && (
				<div 
					className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] lg:hidden transition-opacity"
					onClick={onClose}
					aria-hidden="true"
				/>
			)}

			{/* Sidebar Container */}
			<aside className={cn(
				// Mobile positioning (Drawer)
				"fixed top-0 bottom-0 w-[300px] max-w-[85vw] bg-background z-[101] shadow-2xl transition-transform duration-300 ease-out lg:hidden flex flex-col",
				isRtl ? "right-0 translate-x-full" : "left-0 -translate-x-full",
				isOpen && "translate-x-0",
				// Desktop positioning (Static Column)
				"lg:static lg:w-72 lg:shrink-0 lg:shadow-none lg:translate-x-0 lg:flex lg:z-0 lg:bg-transparent"
			)}>
				{/* Mobile Header */}
				<div className="flex lg:hidden items-center justify-between p-4 border-b border-border/60 bg-surface">
					<div className="flex items-center gap-2 text-text font-bold text-lg">
						<Filter className="w-5 h-5 text-primary" />
						{isRtl ? "الفلاتر" : "Filters"}
					</div>
					<button 
						onClick={onClose}
						className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-2 text-text-secondary hover:text-text transition-colors"
					>
						<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Desktop Header */}
				<div className="hidden lg:flex items-center gap-2 mb-6 text-text font-extrabold text-xl">
					<Filter className="w-5 h-5 text-primary" />
					{isRtl ? "تصفية النتائج" : "Filter Results"}
				</div>

				{/* Scrollable Content */}
				<div className="flex-1 overflow-y-auto no-scrollbar p-4 lg:p-0">
					{children}
				</div>
			</aside>
		</FilterContext.Provider>
	);
};

// Attach sub-components for the Compound Component pattern
FilterSidebar.Section = FilterSection;
FilterSidebar.Checkbox = CheckboxGroup;
FilterSidebar.Radio = RadioGroup;
FilterSidebar.Price = PriceSlider;
FilterSidebar.Rating = RatingSelector;
FilterSidebar.Brands = BrandList;
FilterSidebar.Categories = CategoryTree;
FilterSidebar.Availability = Availability;
FilterSidebar.Footer = FilterFooter;

export default FilterSidebar;
