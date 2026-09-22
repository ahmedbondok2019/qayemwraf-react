import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const mapBlogData = (apiBlog) => {
	if (!apiBlog) return null;

	const resolveI18n = (val, fallback) => {
		if (val && typeof val === 'object') return val;
		return { ar: val || fallback || "", en: val || fallback || "" };
	};

	const catTitle = apiBlog.category?.title || apiBlog.category?.name || (typeof apiBlog.category === 'string' ? apiBlog.category : "عام");
	const categoryObj = {
		id: String(apiBlog.category?.id || "cat-0"),
		title: resolveI18n(catTitle, "عام")
	};

	// Description often contains HTML from API
	const contentHtml = apiBlog.description || "";
	
	// Strip HTML tags for the excerpt if needed, or just use meta_description
	const plainExcerpt = apiBlog.meta_description ? apiBlog.meta_description.replace(/<[^>]+>/g, '') : contentHtml.replace(/<[^>]+>/g, '').substring(0, 150) + "...";

	const authorName = apiBlog.author_name || apiBlog.Author || "Admin";

	return {
		id: apiBlog.id,
		slug: apiBlog.slug || String(apiBlog.id),
		title: resolveI18n(apiBlog.title || apiBlog.name, ""),
		category: categoryObj,
		excerpt: resolveI18n(apiBlog.excerpt || plainExcerpt, ""),
		content: resolveI18n(apiBlog.content || contentHtml, ""),
		image: apiBlog.image || apiBlog.primary_image || "",
		author: {
			name: resolveI18n(authorName, "Admin"),
			avatar: "https://ui-avatars.com/api/?name=Admin&background=random"
		},
		publishedAt: apiBlog.created_at || apiBlog.published_at || new Date().toISOString().split('T')[0],
		readTime: { en: "5 min read", ar: "5 دقائق قراءة" },
		_apiOriginal: apiBlog
	};
};

export const useBlogs = () => {
	return useQuery({
		queryKey: ["blogs"],
		queryFn: async () => {
			const res = await api.get(API_ENDPOINTS.BLOGS);
			const list = res?.data?.data || res?.data || res;
			if (Array.isArray(list) && list.length > 0) {
				return list.map(mapBlogData).filter(Boolean);
			}
			return [];
		},
	});
};

export const useBlogBySlug = (slug) => {
	return useQuery({
		queryKey: ["blog", slug],
		queryFn: async () => {
			const res = await api.get(`${API_ENDPOINTS.BLOGS}/${slug}`);
			const post = res?.data?.data || res?.data || res;
			if (post && post.id) {
				return mapBlogData(post);
			}
			return null;
		},
		enabled: !!slug
	});
};

export default useBlogs;
