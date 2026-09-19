import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export const ProjectsPagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	if (totalPages <= 1) return null;

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			onPageChange(page);
			window.scrollTo({ top: 300, behavior: "smooth" });
		}
	};

	// Generate page numbers with ellipsis
	const getPageNumbers = () => {
		const pages = [];
		const maxVisible = 5;

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			if (currentPage <= 3) {
				pages.push(1, 2, 3, 4, "ellipsis", totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
			} else {
				pages.push(1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages);
			}
		}
		return pages;
	};

	return (
		<div className="flex items-center justify-center gap-2 mt-14 sm:mt-16">
			{/* Prev Button */}
			<button
				type="button"
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="w-10 sm:w-11 h-10 sm:h-11 flex items-center justify-center rounded-2xl border border-border/80 bg-surface dark:bg-slate-900 text-text-secondary hover:bg-surface-2 hover:border-primary/50 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
				aria-label={isRtl ? "الصفحة السابقة" : "Previous Page"}
			>
				{isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
			</button>

			{/* Page Numbers */}
			<div className="flex items-center gap-1.5 sm:gap-2">
				{getPageNumbers().map((page, index) => {
					if (page === "ellipsis") {
						return (
							<div
								key={`ellipsis-${index}`}
								className="w-8 sm:w-10 h-10 flex items-center justify-center text-text-muted"
							>
								<MoreHorizontal className="w-4 h-4" />
							</div>
						);
					}

					const isActive = currentPage === page;

					return (
						<button
							key={`page-${page}`}
							type="button"
							onClick={() => handlePageChange(page)}
							className={cn(
								"w-10 sm:w-11 h-10 sm:h-11 flex items-center justify-center rounded-2xl font-bold text-sm transition-all cursor-pointer shadow-xs",
								isActive
									? "bg-primary text-white shadow-md shadow-primary/25 scale-105"
									: "bg-surface dark:bg-slate-900 border border-border/80 text-text-secondary hover:bg-surface-2 hover:border-primary/50 hover:text-primary"
							)}
						>
							{page}
						</button>
					);
				})}
			</div>

			{/* Next Button */}
			<button
				type="button"
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="w-10 sm:w-11 h-10 sm:h-11 flex items-center justify-center rounded-2xl border border-border/80 bg-surface dark:bg-slate-900 text-text-secondary hover:bg-surface-2 hover:border-primary/50 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
				aria-label={isRtl ? "الصفحة التالية" : "Next Page"}
			>
				{isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
			</button>
		</div>
	);
};

export default ProjectsPagination;
