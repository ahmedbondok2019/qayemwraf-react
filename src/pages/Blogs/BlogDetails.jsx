import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import LocalizedLink from "@/components/ui/LocalizedLink";
import BlogCard from "@/components/ui/BlogCard";
import { Calendar, Clock, ChevronRight, ChevronLeft } from "lucide-react";
import { useBlogBySlug, useBlogs } from "@/hooks/queries/useBlogs";

export const BlogDetails = () => {
	const { slug } = useParams();
	const { language } = useLanguage();
	const isRtl = language === "ar";

	// Fetch current blog and all blogs (for related)
	const { data: blog, isLoading, error } = useBlogBySlug(slug);
	const { data: allBlogs = [] } = useBlogs();

	// Process related blogs: same category or newest, excluding current
	const relatedBlogs = useMemo(() => {
		if (!blog) return [];
		return allBlogs
			.filter(item => item.slug !== slug)
			.filter(item => item.category?.id === blog.category?.id || 1)
			.slice(0, 3);
	}, [allBlogs, blog, slug]);

	if (isLoading) {
		return (
			<div className="min-h-screen bg-background py-16 animate-pulse">
				<Container>
					<div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded mb-8" />
					<div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded mb-4" />
					<div className="h-12 w-2/3 bg-slate-200 dark:bg-slate-800 rounded mb-6" />
					<div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-8" />
					<div className="aspect-[21/9] w-full bg-slate-200 dark:bg-slate-800 rounded-2xl mb-12" />
					<div className="space-y-4 max-w-3xl mx-auto">
						<div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
						<div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
						<div className="h-4 w-4/5 bg-slate-200 dark:bg-slate-800 rounded" />
					</div>
				</Container>
			</div>
		);
	}

	if (error || !blog) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-background px-4">
				<span className="text-danger font-bold text-lg mb-2">
					{isRtl ? "لم يتم العثور على المقال" : "Article not found"}
				</span>
				<span className="text-text-secondary text-sm mb-6">
					{isRtl ? "قد يكون المقال تم حذفه أو أن الرابط غير صحيح." : "The article might have been removed or the URL is incorrect."}
				</span>
				<LocalizedLink to="/blogs" className="px-5 py-2.5 bg-primary text-white font-semibold rounded-xl shadow hover:bg-primary-hover transition-colors">
					{isRtl ? "العودة للمدونة" : "Back to Blog"}
				</LocalizedLink>
			</div>
		);
	}

	const title = blog.title?.[language] || blog.title || "";
	const excerpt = blog.excerpt?.[language] || blog.excerpt || "";
	const content = blog.content?.[language] || blog.content || "";
	const categoryName = blog.category?.title?.[language] || blog.category?.title || "";
	const authorName = blog.author?.name?.[language] || blog.author?.name || "";
	const readTime = blog.readTime?.[language] || blog.readTime || "";

	return (
		<div className="min-h-screen bg-background pb-20">
			{/* Breadcrumbs Navigation */}
			<div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-4">
				<Container>
					<nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
						<LocalizedLink to="/" className="hover:text-primary transition-colors">
							{isRtl ? "الرئيسية" : "Home"}
						</LocalizedLink>
						{isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
						<LocalizedLink to="/blogs" className="hover:text-primary transition-colors">
							{isRtl ? "المدونة الطبية" : "Blog"}
						</LocalizedLink>
						{isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
						<span className="text-slate-800 dark:text-white font-bold line-clamp-1 max-w-[200px] sm:max-w-xs">
							{title}
						</span>
					</nav>
				</Container>
			</div>

			<article className="py-10 sm:py-16">
				<Container>
					{/* Header section */}
					<header className="max-w-4xl mx-auto mb-10 text-center sm:text-start">
						{categoryName && (
							<span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary mb-4">
								{categoryName}
							</span>
						)}
						<h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
							{title}
						</h1>

						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-y border-slate-100 dark:border-slate-850">
							{/* Author info */}
							<div className="flex items-center justify-center sm:justify-start gap-3">
								{blog.author?.avatar && (
									<img
										src={blog.author.avatar}
										alt={authorName}
										className="w-12 h-12 rounded-full object-cover ring-4 ring-primary/5"
									/>
								)}
								<div className="text-start">
									<div className="text-sm font-bold text-slate-800 dark:text-white">
										{authorName}
									</div>
									<div className="text-xs text-slate-500 dark:text-slate-400">
										{isRtl ? "مستشار طبي ومحرر محتوى" : "Medical Advisor & Editor"}
									</div>
								</div>
							</div>

							{/* Meta Dates */}
							<div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
								<div className="flex items-center gap-1.5">
									<Calendar className="w-4 h-4 text-primary" />
									<time dateTime={blog.publishedAt}>{blog.publishedAt}</time>
								</div>
								{readTime && (
									<div className="flex items-center gap-1.5">
										<Clock className="w-4 h-4 text-primary" />
										<span>{readTime}</span>
									</div>
								)}
							</div>
						</div>
					</header>

					{/* Banner Image */}
					<div className="max-w-5xl mx-auto mb-12 sm:mb-16 aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-sm">
						<img
							src={blog.image}
							alt={title}
							className="object-cover w-full h-full"
						/>
					</div>

					{/* Post Excerpt */}
					{excerpt && (
						<div className="max-w-3xl mx-auto mb-8 sm:mb-10 text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed border-l-4 rtl:border-l-0 rtl:border-r-4 border-primary pl-4 rtl:pl-0 rtl:pr-4">
							{excerpt}
						</div>
					)}

					{/* Content body */}
					<div
						className="max-w-3xl mx-auto prose dark:prose-invert prose-slate dark:prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-h3:text-lg sm:prose-h3:text-xl prose-a:text-primary dark:prose-a:text-primary"
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				</Container>
			</article>

			{/* Related posts section */}
			{relatedBlogs.length > 0 && (
				<section className="bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-16 sm:py-20 mt-10">
					<Container>
						<h2 className="text-xl sm:text-h2 font-bold text-slate-900 dark:text-white mb-8 text-center sm:text-start">
							{isRtl ? "مقالات قد تهمك أيضاً" : "Related Articles You May Like"}
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
							{relatedBlogs.map((item) => (
								<BlogCard key={item.id} blog={item} />
							))}
						</div>
					</Container>
				</section>
			)}
		</div>
	);
};

export default BlogDetails;
