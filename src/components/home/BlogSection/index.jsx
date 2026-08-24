import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import LocalizedLink from "@/components/ui/LocalizedLink";
import BlogCard from "@/components/ui/BlogCard";
import { useBlogs } from "@/hooks/queries/useBlogs";

export const BlogSection = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const { data: blogs = [], isLoading } = useBlogs();

	if (isLoading) {
		return (
			<Section bg="surface" spacing="md">
				<Container>
					<div className="flex justify-between items-end mb-8">
						<div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
						<div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{[...Array(4)].map((_, i) => (
							<div key={i} className="h-96 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
						))}
					</div>
				</Container>
			</Section>
		);
	}

	if (blogs.length === 0) {
		return null;
	}

	// Slice exactly the first 4 blogs
	const displayedBlogs = blogs.slice(0, 4);

	return (
		<Section bg="surface" spacing="md">
			<Container>
				{/* Section Header */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-10">
					<div className="flex flex-col gap-2">
						<h2 className="text-xl sm:text-h2 font-bold text-slate-900 dark:text-white leading-tight">
							{isRtl ? "آخر الأخبار والمقالات الطبية" : "Latest News & Medical Articles"}
						</h2>
						<p className="text-sm sm:text-body text-slate-500 dark:text-slate-400">
							{isRtl ? "دليلك الشامل ومصادرك الطبية الموثوقة للعناية بالمرضى وتجهيز العيادات" : "Your guide and trusted medical resources for patient care and clinic equipment."}
						</p>
					</div>

					<LocalizedLink
						to="/blogs"
						className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
					>
						{isRtl ? "عرض كل المقالات" : "View All Articles"}
						{isRtl ? (
							<ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
						) : (
							<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
						)}
					</LocalizedLink>
				</div>

				{/* Single-row Grid of 4 Blog Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{displayedBlogs.map((blog) => (
						<BlogCard key={blog.id} blog={blog} />
					))}
				</div>
			</Container>
		</Section>
	);
};

export default BlogSection;
