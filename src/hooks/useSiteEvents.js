import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
	initGlobalWhatsAppTracker,
	trackPageView,
} from "@/lib/siteEvents";

/**
 * useSiteEvents
 *
 * Initializes GA4 event tracking for the React SPA:
 * 1. Starts the global WhatsApp click interceptor (once, on mount)
 * 2. Fires a page_view event on every route change
 */
const useSiteEvents = () => {
	const location = useLocation();

	// One-time initialization: attach the global WhatsApp tracker
	useEffect(() => {
		initGlobalWhatsAppTracker();
	}, []);

	// Track page view on every navigation
	useEffect(() => {
		const path = location.pathname + location.search;
		trackPageView(path, document.title);
	}, [location.pathname, location.search]);
};

export default useSiteEvents;
