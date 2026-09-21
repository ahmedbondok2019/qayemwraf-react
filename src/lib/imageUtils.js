/**
 * Image Utilities and Resilient Fallbacks
 */

export const FALLBACK_IMAGES = {
	PRODUCT: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600",
	PROJECT: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
	CATEGORY: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=600",
	ABOUT_1: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
	ABOUT_2: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=800",
	ABOUT_3: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800",
};

/**
 * Normalizes and fixes image URLs coming from API.
 * Converts frontend domain to admin domain if needed and handles relative paths.
 */
export const resolveImageUrl = (url, fallback = FALLBACK_IMAGES.PRODUCT) => {
	if (!url || typeof url !== "string" || url.trim() === "") {
		return fallback;
	}

	const trimmed = url.trim();

	// If it contains placehold.co with EG Medical, replace with high quality fallback
	if (trimmed.includes("placehold.co") && (trimmed.includes("EG+Medical") || trimmed.includes("eg-medical"))) {
		return fallback;
	}

	// Intercept legacy bookstore dummy images or missing about images that return 422 from backend
	if (
		trimmed.includes("_fixed") ||
		trimmed.includes("book1") ||
		trimmed.includes("book2") ||
		trimmed.includes("book3") ||
		trimmed.includes("book4") ||
		trimmed.includes("website/images/about") ||
		trimmed.includes("warehouse_equipment") ||
		trimmed.includes("durability_steel") ||
		trimmed.includes("engineering_studies")
	) {
		return fallback;
	}

	// Fix domain mismatch: if API returns https://qayemwraf.com/ replace with https://admin.qayemwraf.com/
	if (trimmed.startsWith("https://qayemwraf.com/") || trimmed.startsWith("http://qayemwraf.com/")) {
		return trimmed.replace(/^https?:\/\/qayemwraf\.com\//, "https://admin.qayemwraf.com/");
	}

	// Fix old egimedical domain if present
	if (trimmed.includes("egimedical.com")) {
		return fallback;
	}

	// If relative path
	if (trimmed.startsWith("/storage/") || trimmed.startsWith("storage/")) {
		const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
		return `https://admin.qayemwraf.com${path}`;
	}

	if (trimmed.startsWith("/website/") || trimmed.startsWith("website/")) {
		const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
		return `https://admin.qayemwraf.com${path}`;
	}

	return trimmed;
};

export default resolveImageUrl;
