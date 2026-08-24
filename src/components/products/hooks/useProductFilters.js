import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";

/**
 * useProductFilters
 * Synchronizes product listing state (filters, sort, pagination, view mode) with the URL.
 * Handles parsing, stringifying, and default fallbacks.
 */
export const useProductFilters = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	// --- Helpers ---
	const getArrayParam = (key) => {
		const val = searchParams.get(key);
		return val ? val.split(",") : [];
	};

	const getNumberParam = (key, fallback) => {
		const val = searchParams.get(key);
		return val ? Number(val) : fallback;
	};

	const getStringParam = (key, fallback) => {
		return searchParams.get(key) || fallback;
	};

	// --- Current State Parsed from URL ---
	const state = useMemo(() => ({
		// View & Sort
		viewMode: getStringParam("view", "grid-4"),
		sortOption: getStringParam("sort", "featured"),
		currentPage: getNumberParam("page", 1),
		
		// Filters
		availability: getArrayParam("availability"),
		brands: getArrayParam("brands"),
		categories: getArrayParam("categories"),
		rating: getNumberParam("rating", null),
		price: (() => {
			const p = getStringParam("price");
			if (p) {
				const [min, max] = p.split("-").map(Number);
				if (!isNaN(min) && !isNaN(max)) return [min, max];
			}
			return [0, 10000];
		})(),
		search: getStringParam("q", ""),
		filterMode: getStringParam("filter", null),
	}), [searchParams]);

	// --- Updaters ---
	const updateParams = useCallback((newParams) => {
		setSearchParams(prev => {
			const next = new URLSearchParams(prev);
			Object.entries(newParams).forEach(([key, value]) => {
				if (value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
					next.delete(key);
				} else if (key === "price" && Array.isArray(value)) {
					next.set(key, `${value[0]}-${value[1]}`);
				} else if (Array.isArray(value)) {
					next.set(key, value.join(","));
				} else {
					next.set(key, String(value));
				}
			});
			// Reset to page 1 on any filter change unless we explicitly update page
			if (!newParams.page && (
				newParams.availability || newParams.brands || newParams.categories || 
				newParams.rating || newParams.price || newParams.q || newParams.sort
			)) {
				next.delete("page");
			}
			return next;
		}, { replace: true });
	}, [setSearchParams]);

	// Specific handler for arrays (checkboxes)
	const toggleArrayItem = useCallback((key, item) => {
		const current = getArrayParam(key);
		const exists = current.includes(item);
		const next = exists ? current.filter(i => i !== item) : [...current, item];
		updateParams({ [key]: next });
	}, [getArrayParam, updateParams]);

	// Specific handler for clear all
	const clearAllFilters = useCallback(() => {
		setSearchParams(prev => {
			const next = new URLSearchParams(prev);
			['availability', 'brands', 'categories', 'rating', 'price', 'q', 'page'].forEach(k => next.delete(k));
			return next;
		}, { replace: true });
	}, [setSearchParams]);

	return {
		state,
		updateParams,
		toggleArrayItem,
		clearAllFilters,
	};
};

export default useProductFilters;
