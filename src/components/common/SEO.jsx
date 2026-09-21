import React, { useEffect } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";

/**
 * Enhanced SEO Component
 * Manages Dynamic Document Titles, Meta Tags, Open Graph, Twitter Cards, and JSON-LD Structured Data
 */
export const SEO = ({
	title,
	description,
	keywords,
	image = "/android-chrome-512x512.png",
	canonical,
	type = "website",
	schema = null,
	noindex = false,
}) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	// Default localized branding titles and descriptions
	const brandName = isRtl ? "قايم ورف" : "Qayem & Raf";
	const defaultSuffix = isRtl
		? "قايم ورف للمشغولات المعدنية وحلول التخزين | أرفف مخازن ومستودعات"
		: "Qayem & Raf | Metal Storage Solutions & Industrial Racking";

	const pageTitle = title
		? `${title} | ${isRtl ? "قايم ورف لحلول التخزين" : "Qayem & Raf"}`
		: defaultSuffix;

	const defaultDescription = isRtl
		? "قايم ورف للمشغولات المعدنية وحلول التخزين - تصميم وتصنيع وتوريد أحدث وحدات رفوف التخزين الذكية، أرفف المستودعات والمخازن، أرفف المحلات والسوبرماركت بأعلى جودة وأفضل الأسعار في مصر."
		: "Qayem & Raf - Leading manufacturer and supplier of heavy-duty industrial storage racks, warehouse shelving, supermarket racks, and custom metal works in Egypt.";

	const metaDescription = description || defaultDescription;

	const defaultKeywords = isRtl
		? "وحدة رفوف تخزين, ارفف تخزين, ارفف مخازن, ارفف مستودعات, ارفف محلات, ارفف سوبرماركت, استاندات تخزين, وحدات تخزين صاج, ارفف احمال ثقيلة, تجهيز مخازن, مشغولات معدنية, قايم ورف, قايم و رف, مصر"
		: "storage racking unit, storage shelves, warehouse racking, industrial shelving, supermarket racks, heavy duty racks, metal shelving, storage solutions, metal fabrication, Qayem and Raf, Egypt";

	const metaKeywords = keywords || defaultKeywords;

	// Absolute image URL
	const absoluteImageUrl = image?.startsWith("http")
		? image
		: `https://qayemwraf.com${image.startsWith("/") ? image : `/${image}`}`;

	// Canonical URL
	const currentUrl = typeof window !== "undefined" ? window.location.href : "https://qayemwraf.com";
	const canonicalUrl = canonical || currentUrl;

	// DOM Head synchronization for client-side navigation
	useEffect(() => {
		// Update document.title
		document.title = pageTitle;

		// Helper to update or create meta tag
		const setMetaTag = (attrName, attrValue, content) => {
			if (!content) return;
			let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
			if (!el) {
				el = document.createElement("meta");
				el.setAttribute(attrName, attrValue);
				document.head.appendChild(el);
			}
			el.setAttribute("content", content);
		};

		// Helper to update link tag (like canonical)
		const setLinkTag = (rel, href) => {
			if (!href) return;
			let el = document.querySelector(`link[rel="${rel}"]`);
			if (!el) {
				el = document.createElement("link");
				el.setAttribute("rel", rel);
				document.head.appendChild(el);
			}
			el.setAttribute("href", href);
		};

		// Primary Meta
		setMetaTag("name", "description", metaDescription);
		setMetaTag("name", "keywords", metaKeywords);
		setMetaTag("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
		setLinkTag("canonical", canonicalUrl);

		// Open Graph
		setMetaTag("property", "og:title", pageTitle);
		setMetaTag("property", "og:description", metaDescription);
		setMetaTag("property", "og:image", absoluteImageUrl);
		setMetaTag("property", "og:url", canonicalUrl);
		setMetaTag("property", "og:type", type);
		setMetaTag("property", "og:site_name", isRtl ? "قايم ورف للمشغولات المعدنية وحلول التخزين" : "Qayem & Raf");

		// Twitter
		setMetaTag("name", "twitter:title", pageTitle);
		setMetaTag("name", "twitter:description", metaDescription);
		setMetaTag("name", "twitter:image", absoluteImageUrl);

		// Schema script injection
		let schemaEl = document.getElementById("dynamic-seo-schema");
		if (schema) {
			if (!schemaEl) {
				schemaEl = document.createElement("script");
				schemaEl.id = "dynamic-seo-schema";
				schemaEl.type = "application/ld+json";
				document.head.appendChild(schemaEl);
			}
			schemaEl.textContent = JSON.stringify(schema);
		} else if (schemaEl) {
			schemaEl.remove();
		}
	}, [pageTitle, metaDescription, metaKeywords, absoluteImageUrl, canonicalUrl, type, schema, noindex, isRtl]);

	return (
		<React.Fragment>
			{/* React 19 Document Metadata Hoisting */}
			<title>{pageTitle}</title>
			<meta name="description" content={metaDescription} />
			<meta name="keywords" content={metaKeywords} />
			<meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
			<link rel="canonical" href={canonicalUrl} />

			{/* Open Graph */}
			<meta property="og:title" content={pageTitle} />
			<meta property="og:description" content={metaDescription} />
			<meta property="og:image" content={absoluteImageUrl} />
			<meta property="og:url" content={canonicalUrl} />
			<meta property="og:type" content={type} />
			<meta property="og:site_name" content={isRtl ? "قايم ورف للمشغولات المعدنية وحلول التخزين" : "Qayem & Raf"} />

			{/* Twitter */}
			<meta name="twitter:title" content={pageTitle} />
			<meta name="twitter:description" content={metaDescription} />
			<meta name="twitter:image" content={absoluteImageUrl} />

			{schema && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
				/>
			)}
		</React.Fragment>
	);
};

export default SEO;
