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

export const useProjects = (filters = {}) => {
	return useQuery({
		queryKey: ["projects", filters],
		queryFn: async () => {
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

			return [];
		}
	});
};

export const useProjectDetails = (slug) => {
	return useQuery({
		queryKey: ["projectDetails", slug],
		queryFn: async () => {
			if (!slug) return null;
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

			return null;
		},
		enabled: !!slug
	});
};

export const useRelatedProjects = (currentSlug) => {
	return useQuery({
		queryKey: ["relatedProjects", currentSlug],
		queryFn: async () => {
			try {
				const res = await api.get(API_ENDPOINTS.PROJECTS || "/projects");
				const isSuccess = res && (res.success === true || res.status === true || res.data);
				if (isSuccess) {
					const dataPayload = res.data || res;
					const all = Array.isArray(dataPayload)
						? dataPayload
						: Array.isArray(dataPayload?.data)
						? dataPayload.data
						: [];
					if (all.length > 0) {
						const mapped = all.map(mapBackendProject);
						return mapped.filter((p) => String(p.slug) !== String(currentSlug) && String(p.id) !== String(currentSlug)).slice(0, 4);
					}
				}
			} catch {
				// ignore
			}
			return [];
		}
	});
};

export default useProjects;
