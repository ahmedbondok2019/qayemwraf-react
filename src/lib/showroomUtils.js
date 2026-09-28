/**
 * Safely extracts iframe src attribute or returns input URL
 * Handles raw URLs or embedded <iframe src="..." /> strings
 */
export const extractIframeSrc = (input, fallbackUrl) => {
	if (!input || typeof input !== "string") return fallbackUrl;
	const trimmed = input.trim();
	if (trimmed.startsWith("<iframe") || trimmed.includes("src=")) {
		const match = trimmed.match(/src=["']([^"']+)["']/i);
		if (match && match[1]) return match[1];
	}
	return trimmed || fallbackUrl;
};

/**
 * Resolves showroom information and working hours from settings payload
 * with full multilingual support (Arabic & English) and fallback defaults.
 *
 * @param {Object} settings - Data from /settings API
 * @param {string} language - Current language ("ar" | "en")
 * @returns {Object} Extracted showroom metadata
 */
export const resolveShowroomData = (settings, language = "ar") => {
	const isRtl = language === "ar";
	const showroom = settings?.showroom || {};
	const trans = showroom?.translations || settings?.translations?.showroom || {};

	// Helper to extract localized string from various backend structures
	const getField = (key, fallbackAr, fallbackEn) => {
		// 1. Translations as object with field keys: { tag: { ar: '...', en: '...' } }
		if (trans && typeof trans === "object" && !Array.isArray(trans)) {
			if (trans[key]) {
				if (typeof trans[key] === "object") {
					const val = trans[key][language] || trans[key].ar || trans[key].en;
					if (val && typeof val === "string" && val.trim()) return val;
				} else if (typeof trans[key] === "string" && trans[key].trim()) {
					return trans[key];
				}
			}
			// 1.b. Translations as object with locale keys: { ar: { tag: '...' }, en: { tag: '...' } }
			if (trans[language] && typeof trans[language] === "object" && trans[language][key]) {
				const val = trans[language][key];
				if (val && typeof val === "string" && val.trim()) return val;
			}
		}

		// 1.c. Translations as array: [{ locale: 'ar', tag: '...' }, ...]
		if (Array.isArray(trans)) {
			const found = trans.find((t) => t?.locale === language || t?.lang === language);
			if (found && found[key]) {
				const val = found[key];
				if (typeof val === "string" && val.trim()) return val;
			}
		}

		// 2. Direct showroom property: showroom[key]
		const directVal = showroom?.[key];
		if (directVal) {
			if (typeof directVal === "object") {
				const resolved = directVal[language] || directVal.ar || directVal.en;
				if (resolved && typeof resolved === "string" && resolved.trim()) return resolved;
			} else if (typeof directVal === "string" && directVal.trim()) {
				return directVal;
			}
		}

		// 3. Root settings level: settings[key]
		const topVal = settings?.[key];
		if (topVal) {
			if (typeof topVal === "object") {
				const resolved = topVal[language] || topVal.ar || topVal.en;
				if (resolved && typeof resolved === "string" && resolved.trim()) return resolved;
			} else if (typeof topVal === "string" && topVal.trim()) {
				return topVal;
			}
		}

		// 4. Default fallback
		return isRtl ? fallbackAr : fallbackEn;
	};

	const tag = getField("tag", "موقع المعرض والمبيعات", "Showroom & Sales Location");
	const title = getField("title", "تفضل بزيارتنا في المعرض", "Visit Our Showroom");

	// Address resolution
	let address = getField("address", "", "");
	if (!address) {
		const rawAddr = settings?.showroom_address || settings?.address;
		if (rawAddr) {
			if (typeof rawAddr === "object") {
				address = rawAddr[language] || rawAddr.ar || rawAddr.en || "";
			} else if (typeof rawAddr === "string") {
				address = rawAddr;
			}
		}
	}
	if (!address) {
		address = isRtl
			? "35 عمارات التوفيقية، شرق مدينة نصر (امتداد مصطفى النحاس - قرب النادي الأهلي)، القاهرة."
			: "35 Al-Tawfiqia Buildings, East Nasr City (Mustafa El-Nahas Ext - near Al-Ahly Club), Cairo, Egypt.";
	}

	const workingHours = getField("working_hours", "مواعيد العمل: يومياً من 9:00 ص إلى 10:00 م", "Working Hours: Daily 9:00 AM - 10:00 PM");
	const features = getField("features", "معاينة وفحص كافة أنواع الأرفف والمشغولات", "Inspect all rack samples & metal works in person");
	const mapButtonText = getField("map_button_text", "فتح الموقع على Google Maps", "Open in Google Maps");

	const mapUrl = showroom?.map_url || settings?.map_url || settings?.google_map_url || "https://maps.google.com/?q=30.0561,31.3532";

	const defaultMapIframe =
		"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.6425110378036!2d31.3532!3d30.0561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAzJzIyLjAiTiAzMcKwMjEnMTEuNSJF!5e0!3m2!1sen!2seg!4v1620000000000!5m2!1sen!2seg";

	const rawMapIframe = showroom?.map_iframe || settings?.map_iframe || settings?.google_map_iframe || defaultMapIframe;
	const mapIframe = extractIframeSrc(rawMapIframe, defaultMapIframe);

	return {
		tag,
		title,
		address,
		workingHours,
		features,
		mapButtonText,
		mapUrl,
		mapIframe,
	};
};

export default resolveShowroomData;
