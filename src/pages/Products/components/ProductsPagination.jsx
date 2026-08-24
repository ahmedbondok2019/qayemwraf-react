import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export const ProductsPagination = ({ currentPage, totalPages, onPageChange }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	if (totalPages <= 1) return null;

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			onPageChange(page);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};


	// Generate page numbers to display
	const getPageNumbers = () => {
		const pages = [];
		const maxVisible = 5; // e.g. 1 2 3 ... 10

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
		<div className="flex items-center justify-center gap-2 mt-12 mb-8">
			{/* Prev Button */}
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="w-10 h-10 flex items-center justify-center rounded-xl border border-border/80 bg-surface text-text-secondary hover:bg-surface-2 hover:border-primary/50 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
				aria-label="Previous Page"
			>
				{isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
			</button>

			{/* Page Numbers */}
			<div className="flex items-center gap-1.5">
				{getPageNumbers().map((page, index) => {
					if (page === "ellipsis") {
						return (
							<div key={`ellipsis-${index}`} className="w-8 sm:w-10 h-10 flex items-center justify-center text-text-secondary">
								<MoreHorizontal className="w-5 h-5" />
							</div>
						);
					}

					return (
						<button
							key={`page-${page}`}
							onClick={() => handlePageChange(page)}
							className={cn(
								"w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all",
								currentPage === page 
									? "bg-primary text-white shadow-md shadow-primary/20" 
									: "bg-surface border border-border/80 text-text-secondary hover:bg-surface-2 hover:border-primary/50 hover:text-primary"
							)}
						>
							{page}
						</button>
					);
				})}
			</div>

			{/* Next Button */}
			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="w-10 h-10 flex items-center justify-center rounded-xl border border-border/80 bg-surface text-text-secondary hover:bg-surface-2 hover:border-primary/50 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
				aria-label="Next Page"
			>
				{isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
			</button>
		</div>
	);
};

export default ProductsPagination;
