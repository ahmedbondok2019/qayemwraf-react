import React, { useState } from "react";
import { Search } from "lucide-react";
import { CheckboxGroup } from "./CheckboxGroup";
import { useLanguage } from "@/app/providers/I18nProvider";

/**
 * BrandList Component
 * Specialized filter for brands with an optional search bar if the list is long.
 */
export const BrandList = ({ brands = [], selectedBrands = [], onChange }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [searchQuery, setSearchQuery] = useState("");

	const filteredBrands = brands.filter(brand => 
		(brand.label?.[language] || brand.label?.en || "").toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="flex flex-col gap-3">
			{brands.length > 5 && (
				<div className="relative">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						<Search className="w-4 h-4 text-text-muted" />
					</div>
					<input 
						type="text" 
						placeholder={isRtl ? "ابحث عن علامة تجارية..." : "Search brands..."}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full bg-surface-2 border border-border/60 text-text text-sm rounded-lg focus:ring-primary focus:border-primary block ps-9 p-2.5"
					/>
				</div>
			)}
			
			<div className="flex flex-col max-h-[200px] overflow-y-auto no-scrollbar pe-1">
				{filteredBrands.length > 0 ? (
					filteredBrands.map(brand => (
						<CheckboxGroup 
							key={brand.id}
							label={brand.label?.[language] || brand.label?.en}
							value={brand.id}
							count={brand.count}
							checked={selectedBrands.includes(brand.id)}
							onChange={onChange}
						/>
					))
				) : (
					<span className="text-sm text-text-muted italic py-2">
						{isRtl ? "لا توجد علامات تجارية مطابقة." : "No brands found."}
					</span>
				)}
			</div>
		</div>
	);
};

export default BrandList;
