export const homepageConfig = [
	{ id: "hero", type: "hero" },
	{ id: "category-pills", type: "categoryPills" },
	// { id: "trust-bar", type: "trustBar" },

	{
		id: "flash-deals",
		type: "productSection",
		variant: "offer",
		bg: "background",
		title: { en: "Flash Deals", ar: "عروض فلاش ⚡" },
		viewAllLink: "/flash-deals"
	},
	// { id: "promo", type: "promo" },
	{
		id: "latest-products",
		type: "productGallery",
		variant: "gallery",
		bg: "background",
		title: { en: "Discover Our Featured Products", ar: "اكتشف منتجاتنا المميزة" },
		subtitle: { en: "A curated selection of heavy-duty metal shelving and modern storage systems", ar: "تشكيلة مختارة من أقوى أنظمة الأرفف وحلول التخزين المتطورة" },
		viewAllLink: "/products"
	},
	// { id: "offer-banners", type: "offerBanners" },
	{
		id: "best-sellers",
		type: "productSection",
		variant: "default",
		bg: "background",
		title: { en: "Best Sellers", ar: "الأكثر مبيعاً" },
		viewAllLink: "/best-sellers"
	},
	{ id: "blog-section", type: "blogSection" },
	{
		id: "b2b-catalog",
		type: "cta",
		title: { en: "Download the Complete Storage Catalog", ar: "حمّل كتالوج حلول التخزين الكامل" },
		description: { en: "Browse our extensive portfolio of metal shelving and storage solutions. Perfect for warehouses, commercial institutions, and heavy-duty applications.", ar: "استعرض سابقة أعمالنا ومجموعتنا الواسعة من حلول التخزين والأرفف المعدنية. مثالي للمستودعات، والمؤسسات التجارية، والأحمال الثقيلة." },
		buttonText: { en: "Download PDF Catalog", ar: "تحميل الكتالوج بصيغة PDF" },
		buttonLink: "#",
		icon: "DownloadCloud"
	}
];
