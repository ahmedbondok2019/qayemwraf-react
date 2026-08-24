import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Search, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { useProducts } from "@/hooks/queries/useProducts";
import LocalizedLink from "@/components/ui/LocalizedLink";

/**
 * SearchBar Component
 * Includes Dropdown for Suggestions & Popular Searches
 */

const CATEGORIES = {
	en: [
		{ value: "all", label: "All Categories" },
		{ value: "devices", label: "Medical Devices" },
		{ value: "consumables", label: "Consumables" },
		{ value: "homecare", label: "Home Care" },
	],
	ar: [
		{ value: "all", label: "كل الأقسام" },
		{ value: "devices", label: "الأجهزة الطبية" },
		{ value: "consumables", label: "المستلزمات" },
		{ value: "homecare", label: "الرعاية المنزلية" },
	],
};

const POPULAR_SEARCHES = {
	en: ["Blood Pressure Monitor", "Stethoscope", "Wheelchair", "Digital Thermometer"],
	ar: ["جهاز قياس ضغط الدم", "سماعة طبيب", "كرسي متحرك", "مقياس حرارة رقمي"]
};

export const SearchBar = ({ className }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const navigate = useNavigate();
	
	const [category, setCategory] = useState("all");
	const [query, setQuery] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const wrapperRef = useRef(null);

	const categories = CATEGORIES[language] || CATEGORIES.en;
	const popularSearches = POPULAR_SEARCHES[language] || POPULAR_SEARCHES.en;

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setIsFocused(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const [debouncedQuery, setDebouncedQuery] = useState("");

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedQuery(query), 300);
		return () => clearTimeout(timer);
	}, [query]);

	const { data: searchResponse } = useProducts(
		{ search: debouncedQuery, limit: 5 },
		{ enabled: debouncedQuery.trim().length >= 2 }
	);
	
	const apiProducts = searchResponse?.data?.data || searchResponse?.data || [];
	const suggestions = debouncedQuery.length >= 2 ? apiProducts : [];

	const handleSubmit = (e) => {
		e.preventDefault();
		if (query.trim()) {
			navigate(`/${language}/products?search=${encodeURIComponent(query.trim())}`);
			setIsFocused(false);
		}
	};

	const handleSuggestionClick = (title) => {
		setQuery(title);
		navigate(`/${language}/products?search=${encodeURIComponent(title)}`);
		setIsFocused(false);
	};

	return (
		<div ref={wrapperRef} className={cn("relative w-full max-w-3xl", className)}>
			<form
				onSubmit={handleSubmit}
				className={cn(
					"flex items-stretch w-full h-[54px] rounded-full overflow-hidden relative z-50",
					"border border-slate-200 dark:border-border/80 focus-within:border-primary focus-within:shadow-[0_0_0_4px_rgba(var(--primary-rgb),0.1)]",
					"bg-slate-50 dark:bg-surface-2 hover:bg-white dark:hover:bg-surface-3 shadow-sm transition-all duration-300"
				)}
				role="search"
				aria-label={isRtl ? "البحث عن المنتجات" : "Search products"}
			>
				{/* Search Input (Left) */}
				<input
					type="search"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => setIsFocused(true)}
					placeholder={
						isRtl
							? "ابحث عن الأدوية، الأجهزة، الماركات..."
							: "Search for medicines, devices, brands..."
					}
					className="flex-1 bg-transparent text-[15px] text-text placeholder:text-text-muted px-5 outline-none min-w-0"
					aria-label={isRtl ? "حقل البحث" : "Search field"}
				/>



				{/* Search Button (Far Right) */}
				<button
					type="submit"
					className="flex items-center justify-center w-16 bg-primary hover:bg-primary-hover active:bg-primary-active text-white transition-colors duration-200 shrink-0 cursor-pointer"
					aria-label={isRtl ? "بحث" : "Search"}
				>
					<Icon name="Search" size={22} strokeWidth={2.5} />
				</button>
			</form>

			{/* Dropdown overlay */}
			{isFocused && (
				<div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-surface border border-border/50 rounded-2xl shadow-xl shadow-black/5 overflow-hidden z-40 animate-in fade-in slide-in-from-top-2">
					
					{!query.trim() ? (
						<div className="p-4">
							<div className="flex items-center gap-2 mb-3 text-text-secondary text-sm font-bold px-2">
								<TrendingUp className="w-4 h-4" />
								{isRtl ? "عمليات البحث الشائعة" : "Popular Searches"}
							</div>
							<div className="flex flex-wrap gap-2">
								{popularSearches.map((term, idx) => (
									<button 
										key={idx}
										onClick={() => handleSuggestionClick(term)}
										className="px-4 py-2 bg-surface-2 hover:bg-primary/5 hover:text-primary rounded-xl text-sm font-medium transition-colors"
									>
										{term}
									</button>
								))}
							</div>
						</div>
					) : suggestions.length > 0 ? (
						<div className="flex flex-col">
							{suggestions.map((prod) => (
								<LocalizedLink 
									key={prod.id}
									to={`/products/${prod.id}`}
									onClick={() => setIsFocused(false)}
									className="flex items-center gap-3 p-3 hover:bg-surface-2 transition-colors text-start border-b border-border/30 last:border-0 group"
								>
									<img src={prod.primary_image || prod.image || "https://placehold.co/100x100"} alt="" className="w-10 h-10 rounded-lg object-cover" />
									<div className="flex flex-col flex-1">
										<span className="font-bold text-sm text-text group-hover:text-primary transition-colors line-clamp-1">{prod.title || prod.name}</span>
										<span className="text-xs text-text-muted font-bold">{prod.category}</span>
									</div>
									<ChevronRight className={cn("w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-all", isRtl && "rotate-180")} />
								</LocalizedLink>
							))}
							<button 
								onClick={handleSubmit}
								className="p-3 text-center text-sm font-bold text-primary hover:bg-primary/5 transition-colors"
							>
								{isRtl ? `عرض كل نتائج "${query}"` : `View all results for "${query}"`}
							</button>
						</div>
					) : query.length >= 2 ? (
						<div className="p-6 text-center text-text-secondary flex flex-col items-center gap-2">
							<Search className="w-8 h-8 opacity-20" />
							<span className="font-bold">{isRtl ? "لم يتم العثور على نتائج" : "No results found"}</span>
							<span className="text-sm">{isRtl ? "جرب البحث بكلمات مختلفة" : "Try searching with different keywords"}</span>
						</div>
					) : null}

				</div>
			)}
		</div>
	);
};

export default SearchBar;
