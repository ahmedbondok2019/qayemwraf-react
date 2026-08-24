import React, { useState, useMemo } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import BlogCard from "@/components/ui/BlogCard";
import { Search } from "lucide-react";
import { useBlogs } from "@/hooks/queries/useBlogs";

export const Blogs = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");

	const { data: blogs = [], isLoading, error } = useBlogs();

	// Dynamically compute list of categories for filter tabs
	const categories = useMemo(() => {
		const cats = [{ id: "all", title: { en: "All Articles", ar: "كل المقالات" } }];
		const ids = new Set();
		blogs.forEach(blog => {
			if (blog.category && blog.category.id && !ids.has(blog.category.id)) {
				ids.add(blog.category.id);
				cats.push({
					id: blog.category.id,
					title: blog.category.title
				});
			}
		});
		return cats;
	}, [blogs]);

	// Filter blogs by search query and category
	const filteredBlogs = useMemo(() => {
		return blogs.filter(blog => {
			const titleText = (blog.title?.[language] || blog.title || "").toLowerCase();
			const excerptText = (blog.excerpt?.[language] || blog.excerpt || "").toLowerCase();
			const query = searchQuery.toLowerCase();
			
			const matchesSearch = titleText.includes(query) || excerptText.includes(query);
			const matchesCategory = selectedCategory === "all" || blog.category?.id === selectedCategory;

			return matchesSearch && matchesCategory;
		});
	}, [blogs, searchQuery, selectedCategory, language]);

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Medical Blog", ar: "المدونة الطبية" } }
	];

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			<PageHero
				title={{ en: "Medical Blog & Insights", ar: "المدونة الطبية والمعرفة" }}
				subtitle={{ en: "Read the latest guides, tips, and articles about medical equipment and care.", ar: "اقرأ أحدث الأدلة والنصائح والمقالات الطبية حول الرعاية المنزلية وتجهيزات العيادات." }}
				count={filteredBlogs.length}
				breadcrumbs={breadcrumbItems}
			/>

			<Container className="mt-8">
				{/* Search and Filters Bar */}
				<div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-10 pb-6 border-b border-slate-100 dark:border-slate-800">
					{/* Category Tabs */}
					<div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto py-2 no-scrollbar">
						{categories.map((cat) => {
							const isActive = selectedCategory === cat.id;
							return (
								<button
									key={cat.id}
									onClick={() => setSelectedCategory(cat.id)}
									className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
										isActive
											? "bg-primary text-white shadow-sm"
											: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
									}`}
								>
									{cat.title?.[language] || cat.title}
								</button>
							);
						})}
					</div>

					{/* Search Field */}
					<div className="relative w-full lg:w-80">
						<input
							type="text"
							placeholder={isRtl ? "ابحث عن مقال..." : "Search articles..."}
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-850 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
						/>
						<Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
					</div>
				</div>

				{/* Grid Area */}
				{isLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[...Array(6)].map((_, i) => (
							<div key={i} className="h-96 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
						))}
					</div>
				) : error ? (
					<div className="flex flex-col items-center justify-center py-20 text-center">
						<span className="text-danger font-bold text-lg mb-2">
							{isRtl ? "فشل تحميل المقالات" : "Failed to load articles"}
						</span>
						<span className="text-text-secondary text-sm">
							{error.message || (isRtl ? "يرجى المحاولة مرة أخرى لاحقاً" : "Please try again later")}
						</span>
					</div>
				) : filteredBlogs.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-20 text-center">
						<span className="text-text-secondary font-bold text-lg">
							{isRtl ? "لا توجد نتائج بحث مطابقة" : "No matching articles found"}
						</span>
						<button
							onClick={() => {
								setSearchQuery("");
								setSelectedCategory("all");
							}}
							className="mt-4 text-sm font-semibold text-primary hover:underline"
						>
							{isRtl ? "إعادة تعيين الفلاتر" : "Reset filters"}
						</button>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredBlogs.map((blog) => (
							<BlogCard key={blog.id} blog={blog} />
						))}
					</div>
				)}
			</Container>
		</div>
	);
};

export default Blogs;
