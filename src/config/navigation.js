export const navigationLinks = [
	{
		id: "home",
		name: { en: "Home", ar: "الرئيسية" },
		path: "/"
	},
	{
		id: "products",
		name: { en: "All Products", ar: "كل المنتجات" },
		path: "/products"
	},
	{
		id: "categories",
		name: { en: "All Categories", ar: "كل الأقسام" },
		path: "/categories"
	},
	{
		id: "projects",
		name: { en: "Our Projects", ar: "سابقة الأعمال" },
		path: "/projects",
		badge: { en: "Portfolio", ar: "مشاريعنا" },
		badgeVariant: "primary"
	},
	{ 
		id: "best-sellers",
		name: { en: "Best Sellers", ar: "الأكثر مبيعاً" }, 
		path: "/best-sellers",
		badge: { en: "Top", ar: "مميز" },
		badgeVariant: "success"
	},
	{ 
		id: "flash-deals",
		name: { en: "Flash Deals", ar: "عروض خاطفة" }, 
		path: "/flash-deals",
		badge: { en: "HOT", ar: "🔥 عروض" },
		badgeVariant: "danger"
	},
	{ 
		id: "blogs",
		name: { en: "Blog", ar: "المدونة" }, 
		path: "/blogs"
	},
	{ 
		id: "about",
		name: { en: "About Us", ar: "من نحن" }, 
		path: "/about" 
	},
	{ 
		id: "contact",
		name: { en: "Contact Us", ar: "تواصل معنا" }, 
		path: "/contact" 
	}
];

export default navigationLinks;
