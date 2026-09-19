import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export const ProjectFilters = ({
	categories = [],
	activeCategory = "all",
	onSelectCategory,
	searchQuery = "",
	onSearchChange,
	totalResults = 0
}) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="flex flex-col gap-6 w-full mb-8">
			{/* Search & Filter Bar */}
			<div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
				{/* Category Pills Slider / Buttons */}
				<div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none no-scrollbar flex-1">
					{categories.map((cat) => {
						const isSelected = activeCategory === cat.id;
						const catTitle =
							typeof cat.title === "object"
								? cat.title[language] || cat.title.ar || cat.title.en
								: cat.title;

						return (
							<button
								key={cat.id}
								type="button"
								onClick={() => onSelectCategory(cat.id)}
								className={cn(
									"px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 border",
									isSelected
										? "bg-primary text-white border-primary shadow-md shadow-primary/25 scale-102"
										: "bg-surface hover:bg-surface-2 text-text-secondary hover:text-text border-border hover:border-primary/40"
								)}
							>
								{catTitle}
							</button>
						);
					})}
				</div>

				{/* Search Input Box */}
				<div className="relative w-full md:w-72 lg:w-80 shrink-0">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-text-muted">
						<Search className="w-4 h-4" />
					</div>
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						placeholder={isRtl ? "بحث في المشاريع..." : "Search projects..."}
						className={cn(
							"w-full h-11 ps-9.5 pe-9 rounded-full bg-surface border border-border text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all",
							searchQuery && "pe-9"
						)}
					/>
					{searchQuery && (
						<button
							type="button"
							onClick={() => onSearchChange("")}
							className="absolute inset-y-0 end-0 flex items-center pe-3 text-text-muted hover:text-text transition-colors"
							aria-label="Clear search"
						>
							<X className="w-4 h-4" />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProjectFilters;
