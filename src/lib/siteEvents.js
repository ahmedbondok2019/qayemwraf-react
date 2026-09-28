export const GA_MEASUREMENT_ID = "G-E6GPE8CKF7";
export const DEFAULT_WHATSAPP_NUMBER = "201154813836";

/**
 * Normalizes any phone number into an international Egyptian WhatsApp format (e.g. 201154813836)
 */
export const normalizeWhatsAppNumber = (rawPhone = DEFAULT_WHATSAPP_NUMBER) => {
	if (!rawPhone) return DEFAULT_WHATSAPP_NUMBER;
	let clean = String(rawPhone).replace(/\D/g, "");
	if (!clean) return DEFAULT_WHATSAPP_NUMBER;

	if (clean.startsWith("01")) {
		clean = "2" + clean;
	} else if (!clean.startsWith("20") && clean.length === 10 && clean.startsWith("1")) {
		clean = "20" + clean;
	} else if (clean.length === 11 && clean.startsWith("0")) {
		clean = "2" + clean.slice(1);
	}

	return clean.startsWith("20") ? clean : DEFAULT_WHATSAPP_NUMBER;
};

/**
 * Generates a clean WhatsApp URL containing wa.me/201154813836
 */
export const getWhatsAppUrl = (rawPhone = DEFAULT_WHATSAPP_NUMBER, message = "") => {
	const phone = normalizeWhatsAppNumber(rawPhone);
	const base = `https://wa.me/${phone}`;
	return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/**
 * Safely calls window.gtag if available and syncs dataLayer
 * Protected against ad blockers and sandbox environments
 */
export const gtag = (...args) => {
	try {
		if (typeof window !== "undefined") {
			if (typeof window.gtag === "function") {
				window.gtag(...args);
			} else {
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push(args);
			}
		}
	} catch {
		// Silent catch to prevent adblockers from breaking runtime
	}
};

let lastTrackedPath = "";

/**
 * Tracks a SPA page view in GA4 (deduplicated against React StrictMode & multiple listeners)
 */
export const trackPageView = (path, title) => {
	try {
		if (typeof window === "undefined") return;
		const currentPath = path || window.location.pathname + window.location.search;
		if (currentPath === lastTrackedPath) return;
		lastTrackedPath = currentPath;

		const currentTitle = title || document.title;

		gtag("event", "page_view", {
			page_path: currentPath,
			page_title: currentTitle,
			page_location: window.location.href,
			send_to: GA_MEASUREMENT_ID,
		});
	} catch {
		// Silent catch
	}
};

/**
 * Tracks a custom GA4 event with beacon transport to guarantee delivery on navigation
 */
export const trackEvent = (eventName, params = {}) => {
	try {
		gtag("event", eventName, {
			transport_type: "beacon",
			send_to: GA_MEASUREMENT_ID,
			...params,
		});
	} catch {
		// Silent catch
	}
};

/**
 * Tracks WhatsApp button clicks for Google Ads & GA4 conversions
 * Event name: "whatsapp_click"
 * Measurement ID: "G-E6GPE8CKF7"
 * @param {string} location - e.g. "floating_button", "cta_section", "contact_page", "footer", "project_sidebar"
 * @param {Object} extra - additional parameters (e.g. { url: "...", phone: "201154813836" })
 */
export const trackWhatsAppClick = (location = "general", extra = {}) => {
	try {
		const phone = normalizeWhatsAppNumber(extra.phone || DEFAULT_WHATSAPP_NUMBER);
		const linkUrl = extra.url || getWhatsAppUrl(phone);

		const eventParams = {
			event_category: "Contact",
			event_label: `WhatsApp - ${location}`,
			button_location: location,
			link_url: linkUrl,
			link_domain: "wa.me",
			phone_number: phone,
			value: 1,
			currency: "EGP",
			transport_type: "beacon",
			send_to: GA_MEASUREMENT_ID,
			...extra,
		};

		// 1. Primary GA4 Event: whatsapp_click (For GA4 & Google Ads Conversion)
		trackEvent("whatsapp_click", eventParams);

		// 2. Push event object to dataLayer for Google Tag Manager (GTM)
		if (typeof window !== "undefined") {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
				event: "whatsapp_click",
				...eventParams,
			});
		}

		// 3. Google Standard Conversion events (recognized natively by Google Ads when linked)
		trackEvent("generate_lead", {
			currency: "EGP",
			value: 1,
			lead_type: "whatsapp",
			button_location: location,
			link_url: linkUrl,
			transport_type: "beacon",
		});

		trackEvent("contact", {
			method: "whatsapp",
			button_location: location,
			link_url: linkUrl,
			transport_type: "beacon",
		});
	} catch {
		// Silent catch
	}
};

/**
 * Global click listener to automatically intercept any WhatsApp links (wa.me/201154813836)
 */
export const initGlobalWhatsAppTracker = () => {
	try {
		if (typeof window === "undefined" || window.__ga_whatsapp_tracker_initialized) return;
		window.__ga_whatsapp_tracker_initialized = true;

		document.addEventListener(
			"click",
			(event) => {
				try {
					const target = event.target && event.target.closest ? event.target.closest("a, button") : null;
					if (!target) return;

					const href = target.href || target.getAttribute("href") || "";
					const isWhatsApp =
						href.includes("wa.me/201154813836") ||
						href.includes("wa.me") ||
						href.includes("whatsapp.com") ||
						href.startsWith("whatsapp:") ||
						target.dataset.analyticsAction === "whatsapp";

					if (isWhatsApp) {
						// Prevent duplicate triggers within 800ms
						if (target.__ga_tracked) return;
						target.__ga_tracked = true;
						setTimeout(() => {
							target.__ga_tracked = false;
						}, 800);

						const inferredLocation =
							target.dataset.analyticsLocation ||
							(target.closest("footer")
								? "footer"
								: target.closest("header")
								? "header"
								: target.closest("aside")
								? "floating_button"
								: target.closest(".cta-section")
								? "cta_section"
								: "general");

						trackWhatsAppClick(inferredLocation, { url: href, phone: DEFAULT_WHATSAPP_NUMBER });
					}
				} catch {
					// Silent catch
				}
			},
			{ capture: true, passive: true }
		);
	} catch {
		// Silent catch
	}
};

export default {
	GA_MEASUREMENT_ID,
	DEFAULT_WHATSAPP_NUMBER,
	normalizeWhatsAppNumber,
	getWhatsAppUrl,
	gtag,
	trackPageView,
	trackEvent,
	trackWhatsAppClick,
	initGlobalWhatsAppTracker,
};
