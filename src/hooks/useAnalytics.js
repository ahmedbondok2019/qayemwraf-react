import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
	initGlobalWhatsAppTracker,
	trackPageView,
} from "@/lib/analytics";

/**
 * useAnalytics
 *
 * Initializes GA4 tracking for a React SPA:
 * 1. Starts the global WhatsApp click interceptor (once, on mount)
 * 2. Fires a page_view event on every route change
 *
 * Mount this hook inside AppLayout (or any persistent layout component
 * that is rendered on every page).
 */
const useAnalytics = () => {
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

export default useAnalytics;
