import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

/**
 * Maps the raw Backend API Project item to standard UI format.
 * Supports the official response structure:
 * {
 *   id, title, description, image, video, link, sort_order, created_at
 * }
 */
export const mapBackendProject = (apiProj) => {
	if (!apiProj) return null;

	const resolveI18n = (val, fallback = "") => {
		if (!val) return { ar: fallback, en: fallback };
		if (typeof val === "object") return val;
		return { ar: String(val), en: String(val) };
	};

	const targetSlug = apiProj.slug || String(apiProj.id);
	const primaryImage =
		apiProj.image ||
		apiProj.primary_image ||
		apiProj.img ||
		"https://placehold.co/800x800?text=Project";

	const gallery =
		Array.isArray(apiProj.gallery) && apiProj.gallery.length > 0
			? apiProj.gallery.map((g) => (typeof g === "string" ? g : g.image || g.url || primaryImage))
			: [primaryImage];

	const createdDate = apiProj.created_at
		? apiProj.created_at.split("T")[0]
		: "2026";
	const year = createdDate.includes("-") ? createdDate.split("-")[0] : createdDate;

	return {
		id: apiProj.id,
		slug: targetSlug,
		title: resolveI18n(apiProj.title, apiProj.name || "مشروع تجهيز مستودع"),
		description: resolveI18n(apiProj.description, ""),
		shortDescription: resolveI18n(apiProj.description, ""),
		overview: resolveI18n(apiProj.overview || apiProj.description, ""),
		primary_image: primaryImage,
		image: primaryImage,
		gallery: gallery,
		video: apiProj.video || null,
		link: apiProj.link || null,
		sort_order: apiProj.sort_order ?? 0,
		completionDate: createdDate,
		year: year,
		category: apiProj.category
			? {
					id: apiProj.category.id || "industrial",
					title: resolveI18n(
						apiProj.category.name || apiProj.category.title,
						"تجهيز مستودعات وأرفف معدنية"
					)
			  }
			: {
					id: "industrial",
					title: { ar: "تجهيز مستودعات وأرفف معدنية", en: "Warehouse & Shelving Fitouts" }
			  },
		client: resolveI18n(apiProj.client, "مصنع قائم ورف للتخزين"),
		location: resolveI18n(apiProj.location, "جمهورية مصر العربية"),
		area: resolveI18n(apiProj.area, ""),
		loadCapacity: resolveI18n(apiProj.loadCapacity || apiProj.capacity, ""),
		duration: resolveI18n(apiProj.duration, ""),
		rackHeight: resolveI18n(apiProj.rackHeight, ""),
		status: resolveI18n(apiProj.status, "مكتمل بنجاح"),
		challenge: resolveI18n(apiProj.challenge, ""),
		solution: resolveI18n(apiProj.solution, ""),
		features: apiProj.features || [],
		specifications: apiProj.specifications || [],
		_apiOriginal: apiProj
	};
};

export const fallbackProjects = [
	{
		id: 1,
		slug: "1",
		title: "تجهيز مستودعات ومخازن كبرى بالرفوف المعدنية (#1)",
		description:
			"تم تنفيذ المشروع وتوريد وتركيب الرفوف المعدنية بأعلى معايير الجودة والمتانة من مصنع قائم ورف، لتحقيق أقصى استغلال للمساحات التخزينية وسهولة التحميل والتفريغ.",
		image: "https://admin.qayemwraf.com/storage/uploads/projects/project_6aaef778356d0_0.webp",
		video: null,
		link: null,
		sort_order: 0,
		created_at: "2026-09-19"
	},
	{
		id: 2,
		slug: "2",
		title: "مشروع تجهيز عنابر تخزين بمقاسات خاصة",
		description:
			"تصميم وتركيب أرفف أحمال ثقيلة مخصصة لمستودعات الأجهزة والمعدات الصناعية.",
		image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
		video: null,
		link: null,
		sort_order: 1,
		created_at: "2026-08-15"
	},
	{
		id: 3,
		slug: "3",
		title: "تركيب وحدات تخزين وأرفف للأحمال الثقيلة",
		description:
			"توريد وتركيب أرفف باليتات متعددة المستويات لتخزين السلع والمنتجات بكفاءة.",
		image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1200",
		video: null,
		link: null,
		sort_order: 2,
		created_at: "2026-07-20"
	},
	{
		id: 4,
		slug: "4",
		title: "تجهيز مساحات تخزين لوجستية للمصانع",
		description:
			"منظومة تخزين متكاملة تضمن سهولة حركة الرافعات والمناولة داخل الممرات.",
		image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=1200",
		video: null,
		link: null,
		sort_order: 3,
		created_at: "2026-06-10"
	},
	{
		id: 5,
		slug: "5",
		title: "مشروع وحدات مخازن أرشيفية متطورة",
		description:
			"أنظمة أرفف أرشيف ومستندات معدنية مجهزة بدهانات مقاومة للصدأ والتآكل.",
		image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=1200",
		video: null,
		link: null,
		sort_order: 4,
		created_at: "2026-05-04"
	},
	{
		id: 6,
		slug: "6",
		title: "تأسيس أنظمة أرفف ذكية للمصانع والشركات",
		description:
			"تجهيز خطوط تخزين رأسية مع حواجز صدمات لحماية الهياكل المعدنية.",
		image: "https://images.unsplash.com/photo-1508873696983-2df5703bc30f?auto=format&fit=crop&q=80&w=1200",
		video: null,
		link: null,
		sort_order: 5,
		created_at: "2026-04-18"
	},
	{
		id: 7,
		slug: "7",
		title: "تنفيذ وتجهيز أرفف ومكاتب معدنية للمستودعات",
		description:
			"حلول متكاملة للمساحات الإدارية والتخزينية داخل المستودعات الحديثة.",
		image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200",
		video: null,
		link: null,
		sort_order: 6,
		created_at: "2026-03-22"
	},
	{
		id: 8,
		slug: "8",
		title: "تركيب ستاندات وأرفف عرض للمحلات والشركات",
		description:
			"أرفف تجارية وعرض جندولا متينة ومصممة بأعلى معايير التحمل والجاذبية.",
		image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
		video: null,
		link: null,
		sort_order: 7,
		created_at: "2026-02-14"
	}
].map(mapBackendProject);

export const useProjects = (filters = {}) => {
	return useQuery({
		queryKey: ["projects", filters],
		queryFn: async () => {
			try {
				const res = await api.get(API_ENDPOINTS.PROJECTS || "/projects", { params: filters });
				const isSuccess =
					res &&
					(res.success === true ||
						res.status === true ||
						res.code === "200" ||
						Array.isArray(res) ||
						res.data);

				if (isSuccess) {
					const dataPayload = res.data || res;
					const apiProjects = Array.isArray(dataPayload)
						? dataPayload
						: Array.isArray(dataPayload?.data)
						? dataPayload.data
						: [];

					if (apiProjects.length > 0) {
						return apiProjects.map(mapBackendProject);
					}
				}
			} catch (error) {
				console.error("Failed to fetch projects from API, falling back:", error);
			}

			return fallbackProjects;
		}
	});
};

export const useProjectDetails = (slug) => {
	return useQuery({
		queryKey: ["projectDetails", slug],
		queryFn: async () => {
			if (!slug) return null;
			try {
				const endpoint = `${API_ENDPOINTS.PROJECTS || "/projects"}/${slug}`;
				const res = await api.get(endpoint);
				const isSuccess =
					res &&
					(res.success === true ||
						res.status === true ||
						res.code === "200" ||
						res.data);

				if (isSuccess) {
					const dataPayload = res.data || res;
					const rawData = dataPayload?.data || dataPayload;
					if (rawData && typeof rawData === "object" && !Array.isArray(rawData)) {
						return mapBackendProject(rawData);
					}
				}
			} catch (error) {
				console.error("Failed to fetch project details from API, falling back:", error);
			}

			const found = fallbackProjects.find(
				(p) => String(p.slug) === String(slug) || String(p.id) === String(slug)
			);
			if (found) return found;

			return fallbackProjects[0] || null;
		},
		enabled: !!slug
	});
};

export const useRelatedProjects = (currentSlug, categoryId) => {
	return useQuery({
		queryKey: ["relatedProjects", currentSlug, categoryId],
		queryFn: async () => {
			const all = fallbackProjects;
			const filtered = all.filter((p) => String(p.slug) !== String(currentSlug) && String(p.id) !== String(currentSlug));
			return filtered.slice(0, 4);
		}
	});
};

export default useProjects;
