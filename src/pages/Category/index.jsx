import React, { useState, useEffect, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { PageHero } from "@/components/ui/PageHero";
import { useLanguage } from "@/app/providers/I18nProvider";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

// Layout & UI States
import ProductsLayout from "../Products/components/ProductsLayout";
import LoadingState from "../Products/components/States/LoadingState";
import EmptyState from "../Products/components/States/EmptyState";
import ErrorState from "../Products/components/States/ErrorState";

// Components
import ProductsToolbar from "../Products/components/ProductsToolbar";
import ProductsGrid from "../Products/components/ProductsGrid";
import ProductsPagination from "../Products/components/ProductsPagination";
import ActiveFilters from "../Products/components/ActiveFilters";
import FilterSidebar from "../Products/components/FilterSidebar";
import RecentlyViewed from "../Products/components/RecentlyViewed";

// Hooks
import useProductFilters from "@/components/products/hooks/useProductFilters";

// Mock Data (Removed)

const Category = ({ isOffersRoute = false }) => {
	const params = useParams();
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [totalItems, setTotalItems] = useState(0);
	const [categoryName, setCategoryName] = useState({ en: "", ar: "" });
	const [allCategories, setAllCategories] = useState([]);

	// Extract slug from route params (handles :slug and wildcard *)
	const rawSlug = params["*"]
		? params["*"].split('/').filter(Boolean).pop()
		: params.slug || "all-categories";

	// Custom Hook for URL State Sync
	const { state, updateParams, toggleArrayItem, clearAllFilters } = useProductFilters();
	const { viewMode, sortOption, currentPage, availability, categories, rating, price, filterMode } = state;

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const searchQuery = searchParams.get("search") || searchParams.get("q");

	// Fetch all categories once on mount so they always appear in the filter sidebar
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await api.get(API_ENDPOINTS.CATEGORIES);
				if (response && response.success) {
					setAllCategories(response.data || []);
				}
			} catch (err) {
				console.error("Failed to load global categories", err);
			}
		};
		fetchCategories();
	}, []);

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const endpoint = (isOffersRoute || filterMode === "offers") ? "/offers" : API_ENDPOINTS.PRODUCTS;
				const response = await api.get(endpoint, {
					params: {
						category_id: categories.length > 0 ? categories.join(",") : (rawSlug !== "all-categories" ? rawSlug : undefined),
						search: searchQuery || undefined,
						page: currentPage,
						sort: sortOption,
						min_price: price[0] > 0 ? price[0] : undefined,
						max_price: price[1] < 10000 ? price[1] : undefined,
						rating: rating || undefined,
						in_stock: availability.includes("instock") ? 1 : undefined,
					}
				});
				if (response && response.success) {
					const dataPayload = response.data;
					const apiProducts = Array.isArray(dataPayload) ? dataPayload : (dataPayload?.data || []);
					const mappedProducts = apiProducts.map(apiProd => {
						const priceVal = apiProd.price || 0;
						const currentPrice = apiProd.final_price || apiProd.special_price || apiProd.sale_price || priceVal;
						const originalPrice = priceVal > currentPrice ? priceVal : null;
						const badges = [];
						if (apiProd.has_flash_sale) {
							badges.push({ type: "sale", label: { en: "Flash Sale", ar: "عرض فلاش" } });
						} else if (apiProd.discount_percentage > 0) {
							badges.push({ type: "sale", label: { en: `${apiProd.discount_percentage}% OFF`, ar: `خصم ${apiProd.discount_percentage}%` } });
						}
						return {
							id: `prod-${apiProd.id}`,
							title: { ar: apiProd.title || apiProd.name || "", en: apiProd.title || apiProd.name || "" },
							category: { ar: apiProd.category || "", en: apiProd.category || "", id: String(apiProd.category_id || "") },
							categories: apiProd.categories || [],
							image: apiProd.primary_image || apiProd.image || apiProd.category?.image || "",
							price: { current: currentPrice, original: originalPrice },
							reviews: { rating: apiProd.rating || 0, count: apiProd.rate_count || 0 },
							stock: { quantity: apiProd.quantity || 0 },
							badges,
							link: apiProd.product_link || `/product/${apiProd.id}`,
							_apiOriginal: apiProd
						};
					});
					// Client-side filtering fallback to ensure the UI is 100% accurate
					let filtered = mappedProducts;
					
					// 1. Filter by category
					const activeCategories = categories.length > 0 ? categories : (rawSlug !== "all-categories" ? [rawSlug] : []);
					if (activeCategories.length > 0) {
						filtered = filtered.filter(p => {
							const prodCategoryIds = p.categories && p.categories.length > 0 
								? p.categories.map(c => String(c.id)) 
								: [String(p.category?.id || p._apiOriginal?.category_id || "")];
							return prodCategoryIds.some(id => activeCategories.includes(id));
						});
					}

					// 2. Filter by price
					if (price && (price[0] > 0 || price[1] < 10000)) {
						filtered = filtered.filter(p => {
							const currentPrice = p.price?.current || 0;
							return currentPrice >= price[0] && currentPrice <= price[1];
						});
					}

					// 3. Filter by rating
					if (rating) {
						filtered = filtered.filter(p => (p.reviews?.rating || 0) >= rating);
					}

					setProducts(filtered);
					
					const meta = dataPayload?.meta;
					if (meta && typeof meta.last_page === 'number') {
						setTotalPages(meta.last_page);
						setTotalItems(meta.total);
					} else {
						setTotalPages(Math.ceil(filtered.length / itemsPerPage) || 1);
						setTotalItems(filtered.length);
					}
					
					// Set real category name from the first product
					if (mappedProducts.length > 0) {
						setCategoryName(mappedProducts[0].category);
					}
				} else {
					setError(isRtl ? "حدث خطأ أثناء جلب المنتجات." : "Failed to load products.");
				}
			} catch (err) {
				setError(err?.message || (isRtl ? "حدث خطأ أثناء جلب المنتجات." : "Failed to load products."));
			} finally {
				setIsLoading(false);
			}
		};
		fetchProducts();
	}, [state, rawSlug, isRtl, searchQuery]);

	const itemsPerPage = 12;

	const isAllProducts = rawSlug === "all-categories";
	const isOffers = isOffersRoute || filterMode === "offers";
	
	const displayCategoryName = isOffers
		? (isRtl ? "التخفيضات والعروض" : "Offers & Sales")
		: (isAllProducts ? (isRtl ? "كل المنتجات" : "All Products") : (categoryName[language] || (isRtl ? "منتجات القسم" : "Category Products")));

	// Breadcrumb mapping
	const breadcrumbItems = isOffers ? [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Offers & Sales", ar: "التخفيضات والعروض" } }
	] : isAllProducts ? [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "All Products", ar: "كل المنتجات" } }
	] : [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Categories", ar: "الأقسام" }, link: "/categories" },
		{ label: { en: displayCategoryName, ar: displayCategoryName } }
	];

	// Use global categories from API for the filter, so they don't disappear when products are filtered
	const dynamicCategories = useMemo(() => {
		return allCategories.map(cat => ({
			id: String(cat.id),
			label: { en: cat.title || cat.name || "", ar: cat.name || cat.title || "" },
			count: null // Set to null to avoid misleading static counts, or use cat.products_count if accurate
		}));
	}, [allCategories]);

	const filterOptions = {
		categories: dynamicCategories
	};

	// Handlers for Filters
	const handleRemoveActiveFilter = (filterId, type) => {
		if (type === 'rating') {
			updateParams({ rating: null });
		} else if (type === 'price') {
			updateParams({ price: null });
		} else {
			toggleArrayItem(type, filterId);
		}
	};

	// Compute Active Filters Array for the ActiveFilters component
	const activeFiltersList = useMemo(() => {
		const list = [];
		categories.forEach(id => {
			list.push({ id, type: 'categories', label: filterOptions.categories.find(o => o.id === id)?.label || { en: id, ar: id } });
		});
		if (rating) {
			list.push({ id: `rating-${rating}`, type: 'rating', label: { en: `${rating} Stars & Up`, ar: `${rating} نجوم فأكثر` } });
		}
		if (price[0] > 0 || price[1] < 10000) {
			list.push({ id: `price-${price[0]}-${price[1]}`, type: 'price', label: { en: `${price[0]} - ${price[1]} EGP`, ar: `${price[0]} - ${price[1]} ج.م` } });
		}
		return list;
	}, [categories, rating, price]);

	// Render the sidebar component
	const renderSidebarContent = () => (
		<>
			<FilterSidebar.Section title={isRtl ? "السعر" : "Price"} activeCount={(price[0] > 0 || price[1] < 10000) ? 1 : 0}>
				<FilterSidebar.Price
					min={0} max={10000}
					value={price}
					onChange={(range) => updateParams({ price: range })}
				/>
			</FilterSidebar.Section>

			<FilterSidebar.Section title={isRtl ? "الأقسام" : "Categories"} activeCount={categories.length}>
				<FilterSidebar.Categories
					categories={filterOptions.categories}
					selectedCategories={categories}
					onChange={(val) => {
						const isSelected = categories.includes(val);
						updateParams({ categories: isSelected ? [] : [val] });
					}}
				/>
			</FilterSidebar.Section>

			<FilterSidebar.Section title={isRtl ? "التقييم" : "Rating"} activeCount={rating ? 1 : 0}>
				{[5, 4, 3, 2, 1].map(stars => (
					<FilterSidebar.Rating
						key={stars}
						stars={stars}
						selectedRating={rating}
						onChange={(val) => updateParams({ rating: val })}
					/>
				))}
			</FilterSidebar.Section>

			<FilterSidebar.Footer
				activeCount={activeFiltersList.length}
				onClear={clearAllFilters}
				onApply={() => setIsMobileFilterOpen(false)}
			/>
		</>
	);

	if (isLoading) return <LoadingState />;

	if (error) {
		return (
			<div className="flex flex-col w-full min-h-screen bg-background pb-10 px-4">
				<ErrorState message={error} onRetry={() => updateParams({ page: currentPage })} />
			</div>
		);
	}

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-10">
			{/* 1. Internal Hero */}
			<PageHero
				title={{ en: displayCategoryName, ar: displayCategoryName }}
				subtitle={
					isOffers
					? { en: "Discover our latest offers and exclusive deals on medical supplies.", ar: "اكتشف أحدث العروض والتخفيضات الحصرية على المستلزمات الطبية." }
					: isAllProducts 
					? { en: "Discover our complete catalog of certified medical equipment and supplies.", ar: "اكتشف الكتالوج الكامل للمعدات والمستلزمات الطبية المعتمدة." }
					: { en: "Explore our curated selection of high-quality products in this category.", ar: "استكشف تشكيلتنا المختارة من المنتجات عالية الجودة في هذا القسم." }
				}
				count={totalItems}
				breadcrumbs={breadcrumbItems}
			/>

			{/* 2. Main Layout Architecture */}
			<ProductsLayout
				sidebar={
					!isOffers && (
						<FilterSidebar isOpen={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)}>
							{renderSidebarContent()}
						</FilterSidebar>
					)
				}
				mobileSidebar={
					!isOffers && (
						<FilterSidebar isOpen={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)}>
							{renderSidebarContent()}
						</FilterSidebar>
					)
				}
				toolbar={
					<ProductsToolbar
						totalItems={totalItems}
						itemsPerPage={itemsPerPage}
						currentPage={currentPage}
						viewMode={viewMode}
						onViewModeChange={(mode) => updateParams({ view: mode })}
						sortOption={sortOption}
						onSortChange={(sort) => updateParams({ sort })}
						onOpenFilter={!isOffers ? () => setIsMobileFilterOpen(true) : undefined}
					/>
				}
				activeFilters={
					<ActiveFilters
						activeFilters={activeFiltersList}
						onRemoveFilter={handleRemoveActiveFilter}
						onClearAll={clearAllFilters}
					/>
				}
				bottomContent={
					<RecentlyViewed />
				}
			>
				{/* Main Grid Content */}
				{products.length === 0 ? (
					<EmptyState onClearFilters={clearAllFilters} />
				) : (
					<ProductsGrid products={products} viewMode={viewMode} />
				)}

				{/* Pagination */}
				{products.length > 0 && (
					<ProductsPagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={(page) => updateParams({ page })}
					/>
				)}
			</ProductsLayout>
		</div>
	);
};

export default Category;
