import React from "react";
import Container from "@/components/ui/Container";

/**
 * Reusable layout for Product Listing Pages (PLP) like Category, Brand, Search, Offers.
 * Handles the responsive two-column layout (Sidebar + Grid).
 */
export const ProductsLayout = ({
	sidebar,
	mobileSidebar, // The sidebar rendered in a drawer/modal for mobile
	toolbar,
	activeFilters,
	children,
	bottomContent // E.g. recently viewed
}) => {
	return (
		<Container>
			{/* Toolbar (Sort, View Mode, Count) */}
			{toolbar && <div className="w-full">{toolbar}</div>}
			
			{/* Active Filters Row */}
			{activeFilters && <div className="w-full mb-6">{activeFilters}</div>}

			{/* Main Layout (Sidebar + Grid) */}
			<div className="flex gap-8 items-start w-full relative">
				
				{/* Desktop Sidebar - Sticky */}
				{sidebar && (
					<aside className="hidden lg:block sticky top-24 self-start w-[280px] shrink-0 z-10">
						{sidebar}
					</aside>
				)}

				{/* Mobile Sidebar Mount Point */}
				{mobileSidebar && (
					<div className="lg:hidden">
						{mobileSidebar}
					</div>
				)}

				{/* Main Content (Grid, Pagination, States) */}
				<main className="w-full flex-grow min-w-0 flex flex-col">
					{children}
				</main>
				
			</div>

			{/* Bottom Content */}
			{bottomContent && (
				<div className="w-full mt-12">
					{bottomContent}
				</div>
			)}
		</Container>
	);
};

export default ProductsLayout;
