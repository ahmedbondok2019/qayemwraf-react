export const GA_MEASUREMENT_ID = "G-E6GPE8CKF7";

/**
 * Safely calls window.gtag if available
 */
export const gtag = (...args) => {
	if (typeof window !== "undefined" && typeof window.gtag === "function") {
		window.gtag(...args);
	} else if (typeof window !== "undefined") {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push(args);
	}
};

/**
 * Tracks a SPA page view in GA4
 */
export const trackPageView = (path, title) => {
	const currentPath = path || window.location.pathname + window.location.search;
	const currentTitle = title || document.title;

	gtag("event", "page_view", {
		page_path: currentPath,
		page_title: currentTitle,
		page_location: window.location.href,
		send_to: GA_MEASUREMENT_ID,
	});
};

/**
 * Tracks a custom GA4 event
 */
export const trackEvent = (eventName, params = {}) => {
	gtag("event", eventName, {
		...params,
		send_to: GA_MEASUREMENT_ID,
	});
};

/**
 * Tracks WhatsApp button clicks for Google Ads & GA4 conversions
 * @param {string} location - e.g. "floating_button", "cta_section", "contact_page", "footer", "project_sidebar", "header"
 * @param {Object} extra - additional parameters (e.g. { url: "...", phone: "201154813836" })
 */
export const trackWhatsAppClick = (location = "general", extra = {}) => {
	const linkUrl = extra.url || "https://wa.me/201154813836";

	const params = {
		event_category: "Engagement",
		event_label: `WhatsApp - ${location}`,
		button_location: location,
		link_url: linkUrl,
		phone_number: "201154813836",
		...extra,
	};

	// 1. Custom event for Google Analytics & Google Ads
	trackEvent("whatsapp_click", params);

	// 2. Standard Google Lead & Contact Events (Recognized natively as Conversions in Google Ads)
	trackEvent("generate_lead", {
		currency: "EGP",
		value: 1,
		lead_type: "whatsapp",
		button_location: location,
		link_url: linkUrl,
	});

	trackEvent("contact", {
		method: "whatsapp",
		button_location: location,
		link_url: linkUrl,
	});
};

/**
 * Global click listener to automatically intercept any WhatsApp links
 */
export const initGlobalWhatsAppTracker = () => {
	if (typeof window === "undefined" || window.__ga_whatsapp_tracker_initialized) return;
	window.__ga_whatsapp_tracker_initialized = true;

	document.addEventListener(
		"click",
		(event) => {
			const target = event.target.closest("a, button");
			if (!target) return;

			const href = target.getAttribute("href") || "";
			const isWhatsApp =
				href.includes("wa.me") ||
				href.includes("whatsapp.com") ||
				href.startsWith("whatsapp:") ||
				target.dataset.analyticsAction === "whatsapp";

			if (isWhatsApp) {
				// Avoid double-tracking within 500ms
				if (target.__ga_tracked) return;
				target.__ga_tracked = true;
				setTimeout(() => {
					target.__ga_tracked = false;
				}, 500);

				const inferredLocation =
					target.dataset.analyticsLocation ||
					(target.closest("footer")
						? "footer"
						: target.closest("header")
						? "header"
						: target.closest(".floating-contact") || target.closest("aside")
						? "floating_button"
						: "general");

				trackWhatsAppClick(inferredLocation, { url: href });
			}
		},
		{ capture: true, passive: true }
	);
};

export default {
	GA_MEASUREMENT_ID,
	gtag,
	trackPageView,
	trackEvent,
	trackWhatsAppClick,
	initGlobalWhatsAppTracker,
};
