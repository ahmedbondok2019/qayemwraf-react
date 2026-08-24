import React from "react";
import ProductCard from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/app/providers/I18nProvider";

/**
 * ProductGrid Component
 * Renders products based on the active view mode (grid variants or list).
 */
export const ProductsGrid = ({ products, viewMode }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	if (!products || products.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-center">
				<div className="w-20 h-20 bg-surface-2 rounded-full flex items-center justify-center mb-4">
					<svg className="w-10 h-10 text-text-secondary opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
					</svg>
				</div>
				<h3 className="text-xl font-bold text-text mb-2">
					{isRtl ? "لم يتم العثور على منتجات" : "No Products Found"}
				</h3>
				<p className="text-text-secondary max-w-sm">
					{isRtl ? "جرب تغيير فلاتر البحث أو تصفح أقسام أخرى" : "Try adjusting your filters or browse other categories."}
				</p>
			</div>
		);
	}

	// Layout mapping
	const gridClasses = {
		"grid-2": "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6",
		"grid-3": "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6",
		"grid-4": "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6",
		"grid-5": "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6",
		"list": "flex flex-col gap-4"
	};

	return (
		<div className={cn("w-full transition-all duration-300", gridClasses[viewMode] || gridClasses["grid-4"])}>
			{products.map((product) => (
				<ProductCard 
					key={product.id} 
					product={product} 
					layout={viewMode === "list" ? "horizontal" : "vertical"} 
				/>
			))}
		</div>
	);
};

export default ProductsGrid;
