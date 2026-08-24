import React from "react";
import { Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";

export const BlogCard = ({ blog }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const title = blog.title?.[language] || blog.title || "";
	const excerpt = blog.description?.[language] || blog.description || blog.excerpt?.[language] || blog.excerpt || "";
	const categoryName = blog.category?.title?.[language] || blog.category?.title || "";
	const authorName = blog.author?.name?.[language] || blog.author?.name || "";
	const readTime = blog.readTime?.[language] || blog.readTime || "";

	return (
		<LocalizedLink
			to={`/blogs/${blog.slug}`}
			className="group flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
		>
			{/* Image Area */}
			<div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
				<img
					src={blog.image}
					alt={title}
					className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
					loading="lazy"
				/>
				{categoryName && (
					<span className="absolute top-4 ltr:left-4 rtl:right-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/95 text-white shadow-sm">
						{categoryName}
					</span>
				)}
			</div>

			{/* Content Area */}
			<div className="flex flex-col flex-1 p-5 sm:p-6">
				{/* Metadata */}
				<div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
					<div className="flex items-center gap-1.5">
						<Calendar className="w-3.5 h-3.5 text-orange-500" />
						<time dateTime={blog.publishedAt}>{blog.publishedAt}</time>
					</div>
					{readTime && (
						<div className="flex items-center gap-1.5">
							<Clock className="w-3.5 h-3.5 text-orange-500" />
							<span>{readTime}</span>
						</div>
					)}
				</div>

				{/* Title & Excerpt */}
				<h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-2">
					{title}
				</h3>
				
				<p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed flex-1 mb-4">
					{excerpt}
				</p>

				<hr className="border-slate-100 dark:border-slate-800 my-4" />

				{/* Footer Info */}
				<div className="flex items-center justify-between gap-3 mt-auto">
					{/* Author info */}
					<div className="flex items-center gap-2.5">
						{blog.author?.avatar && (
							<img
								src={blog.author.avatar}
								alt={authorName}
								className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-500/20"
							/>
						)}
						<span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
							{authorName}
						</span>
					</div>

					{/* Read More link-styled span */}
					<span
						className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-orange-500 transition-colors duration-200"
					>
						{isRtl ? "اقرأ المزيد" : "Read More"}
						{isRtl ? (
							<ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
						) : (
							<ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
						)}
					</span>
				</div>
			</div>
		</LocalizedLink>
	);
};

export default BlogCard;
