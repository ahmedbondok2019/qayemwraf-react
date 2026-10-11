import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { PageHero } from "@/components/ui/PageHero";
import { useOffers } from "@/hooks/queries/useOffers";
import ErrorState from "@/pages/Products/components/States/ErrorState";
import LoadingState from "@/pages/Products/components/States/LoadingState";
import {
	Percent,
	Tag,
	ChevronLeft,
	ChevronRight,
	ArrowLeft,
	ArrowRight,
	Zap,
	Sparkles,
	Clock,
	ShoppingBag,
} from "lucide-react";
import SEO from "@/components/common/SEO";
import { OfferCard } from "@/components/ui/OfferCard";

/* ──────────────────────────────────────────────────────────
   Accent colour palette per offer index
──────────────────────────────────────────────────────────── */
const PALETTES = [
	{
		gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
		accent: "#E0B03B",
		accentRgb: "224,176,59",
		tagBg: "rgba(224,176,59,0.18)",
		tagBorder: "rgba(224,176,59,0.45)",
		tagText: "#E0B03B",
		btnBg: "#E0B03B",
		btnText: "#0F172A",
	},
	{
		gradient: "linear-gradient(135deg, #0a0e27 0%, #1a237e 50%, #0d1b2a 100%)",
		accent: "#60a5fa",
		accentRgb: "96,165,250",
		tagBg: "rgba(96,165,250,0.18)",
		tagBorder: "rgba(96,165,250,0.45)",
		tagText: "#60a5fa",
		btnBg: "#60a5fa",
		btnText: "#0F172A",
	},
	{
		gradient: "linear-gradient(135deg, #1a0a2e 0%, #4a1942 50%, #0a0f1a 100%)",
		accent: "#f472b6",
		accentRgb: "244,114,182",
		tagBg: "rgba(244,114,182,0.18)",
		tagBorder: "rgba(244,114,182,0.45)",
		tagText: "#f472b6",
		btnBg: "#f472b6",
		btnText: "#0F172A",
	},
	{
		gradient: "linear-gradient(135deg, #062017 0%, #134e2a 50%, #0a1f15 100%)",
		accent: "#34d399",
		accentRgb: "52,211,153",
		tagBg: "rgba(52,211,153,0.18)",
		tagBorder: "rgba(52,211,153,0.45)",
		tagText: "#34d399",
		btnBg: "#34d399",
		btnText: "#0F172A",
	},
];

/* ──────────────────────────────────────────────────────────
   Single horizontal offer banner
──────────────────────────────────────────────────────────── */
const OfferBanner = ({ offer, index, isRtl }) => {
	const palette = PALETTES[index % PALETTES.length];
	const isFlash = Boolean(offer.filters?.flash_sale);

	const offerTitle = offer.title || offer.name || "";
	const offerDesc =
		offer.description || offer.category?.description || "";
	const offerImage = offer.image || offer.category?.image || "";

	// Resolve link
	let to = "/products";
	if (offer.link_type === "category" && (offer.category_id || offer.category_slug)) {
		to = `/category/${offer.category_id || offer.category_slug}`;
	} else if (offer.link_type === "product" && (offer.product_id || offer.link_id)) {
		to = `/products/${offer.product_id || offer.link_id}`;
	} else if (offer.link) {
		to = offer.link;
	} else if (offer.url) {
		to = offer.url;
	}

	return (
		<LocalizedLink
			to={to}
			aria-label={offerTitle}
			className="group relative flex w-full overflow-hidden cursor-pointer select-none"
			style={{
				background: palette.gradient,
				borderRadius: "var(--radius-banner, 24px)",
				minHeight: "260px",
				boxShadow: `0 2px 0 rgba(255,255,255,0.06) inset, 0 12px 48px -10px rgba(${palette.accentRgb},0.25)`,
				transition: "box-shadow 0.4s ease, transform 0.3s ease",
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.boxShadow = `0 2px 0 rgba(255,255,255,0.08) inset, 0 20px 60px -10px rgba(${palette.accentRgb},0.45)`;
				e.currentTarget.style.transform = "translateY(-3px)";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.boxShadow = `0 2px 0 rgba(255,255,255,0.06) inset, 0 12px 48px -10px rgba(${palette.accentRgb},0.25)`;
				e.currentTarget.style.transform = "translateY(0)";
			}}
		>
			{/* dot grid pattern */}
			<div
				className="absolute inset-0 pointer-events-none opacity-[0.035]"
				style={{
					backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
					backgroundSize: "26px 26px",
				}}
			/>

			{/* glow orbs */}
			<div
				className="absolute -top-20 pointer-events-none"
				style={{
					[isRtl ? "left" : "right"]: "-40px",
					width: "280px",
					height: "280px",
					borderRadius: "50%",
					background: `radial-gradient(circle, rgba(${palette.accentRgb},0.22) 0%, transparent 70%)`,
					transition: "opacity 0.5s ease",
				}}
			/>
			<div
				className="absolute -bottom-20 pointer-events-none"
				style={{
					[isRtl ? "right" : "left"]: "-30px",
					width: "200px",
					height: "200px",
					borderRadius: "50%",
					background: `radial-gradient(circle, rgba(${palette.accentRgb},0.12) 0%, transparent 70%)`,
				}}
			/>

			{/* stripe accent bar — top edge */}
			<div
				className="absolute top-0 inset-x-0 h-[3px] pointer-events-none"
				style={{
					background: `linear-gradient(${isRtl ? "to left" : "to right"}, transparent, ${palette.accent}80, transparent)`,
				}}
			/>

			{/* ── Image panel ── */}
			{offerImage && (
				<div
					className="absolute inset-y-0 pointer-events-none overflow-hidden"
					style={{
						[isRtl ? "left" : "right"]: 0,
						width: "44%",
					}}
				>
					{/* fade toward text */}
					<div
						className="absolute inset-0 z-10 pointer-events-none"
						style={{
							background: isRtl
								? `linear-gradient(to left, transparent 0%, transparent 45%, rgba(0,0,0,0.85) 100%)`
								: `linear-gradient(to right, transparent 0%, transparent 45%, rgba(0,0,0,0.85) 100%)`,
						}}
					/>
					<img
						src={offerImage}
						alt={offerTitle}
						className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.07]"
						style={{ opacity: 0.92 }}
						loading="lazy"
					/>
				</div>
			)}

			{/* ── Text Content ── */}
			<div
				className="relative z-20 flex flex-col justify-between"
				style={{
					padding: "clamp(20px, 4vw, 40px) clamp(20px, 5vw, 48px)",
					width: offerImage ? "58%" : "100%",
				}}
			>
				{/* badges row */}
				<div className="flex flex-wrap gap-2 mb-4">
					{isFlash && (
						<span
							className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold"
							style={{
								background: "rgba(239,68,68,0.18)",
								border: "1px solid rgba(239,68,68,0.45)",
								color: "#f87171",
								animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
							}}
						>
							<Zap className="w-3 h-3 fill-current" />
							{isRtl ? "عرض فلاش" : "Flash Deal"}
						</span>
					)}

					<span
						className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
						style={{
							background: palette.tagBg,
							border: `1px solid ${palette.tagBorder}`,
							color: palette.tagText,
						}}
					>
						<Tag className="w-3 h-3" />
						{isRtl ? "عرض حصري" : "Exclusive Offer"}
					</span>

					<span
						className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
						style={{
							background: "rgba(255,255,255,0.08)",
							border: "1px solid rgba(255,255,255,0.14)",
							color: "rgba(255,255,255,0.75)",
						}}
					>
						<Clock className="w-3 h-3" />
						{isRtl ? "لفترة محدودة" : "Limited Time"}
					</span>
				</div>

				{/* title */}
				<h2
					className="font-extrabold leading-tight mb-3"
					style={{
						color: "#ffffff",
						fontSize: "clamp(18px, 2.4vw, 30px)",
						maxWidth: "26ch",
						textShadow: "0 2px 12px rgba(0,0,0,0.5)",
					}}
				>
					{offerTitle}
				</h2>

				{/* description */}
				<p
					className="leading-relaxed mb-5 sm:mb-7 line-clamp-2"
					style={{
						color: "rgba(255,255,255,0.58)",
						fontSize: "clamp(13px, 1.4vw, 15px)",
						maxWidth: "38ch",
					}}
				>
					{offerDesc
						? offerDesc
						: isRtl
						? "تصفح أحدث وحدات التخزين المشمولة بهذا العرض بأسعار خاصة."
						: "Browse the latest storage units in this deal at special prices."}
				</p>

				{/* CTA */}
				<div>
					<span
						className="inline-flex items-center gap-2 font-bold rounded-full transition-all duration-300 group-hover:scale-105"
						style={{
							background: palette.btnBg,
							color: palette.btnText,
							padding: "10px 22px",
							fontSize: "clamp(12px, 1.3vw, 14px)",
							boxShadow: `0 4px 20px -4px rgba(${palette.accentRgb},0.5)`,
						}}
					>
						<ShoppingBag className="w-4 h-4" />
						{isRtl ? "تصفح العرض" : "Shop the Deal"}
						{isRtl ? (
							<ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
						) : (
							<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
						)}
					</span>
				</div>
			</div>

			{/* hover border pulse */}
			<div
				className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
				style={{
					boxShadow: `inset 0 0 0 1.5px ${palette.accent}55`,
				}}
			/>
		</LocalizedLink>
	);
};

/* ──────────────────────────────────────────────────────────
   Loading skeleton
──────────────────────────────────────────────────────────── */
const BannerSkeleton = () => (
	<div className="flex flex-col gap-6">
		{[...Array(2)].map((_, i) => (
			<div
				key={i}
				className="w-full animate-pulse bg-slate-200 dark:bg-slate-800"
				style={{
					minHeight: "260px",
					borderRadius: "var(--radius-banner, 24px)",
				}}
			/>
		))}
	</div>
);

/* ──────────────────────────────────────────────────────────
   Empty state
──────────────────────────────────────────────────────────── */
const OffersEmpty = ({ isRtl }) => (
	<div className="flex flex-col items-center justify-center py-24 text-center">
		<div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
			<Percent className="w-10 h-10 text-primary/50 stroke-1" />
		</div>
		<h3 className="text-xl font-bold text-text mb-2">
			{isRtl ? "لا توجد عروض نشطة حالياً" : "No active offers at the moment"}
		</h3>
		<p className="text-sm text-text-secondary max-w-sm">
			{isRtl
				? "يرجى التحقق مرة أخرى قريباً للاطلاع على أحدث الخصومات."
				: "Please check back soon for our latest exclusive deals."}
		</p>
	</div>
);

/* ──────────────────────────────────────────────────────────
   Page
──────────────────────────────────────────────────────────── */
const Offers = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const { data: responseData, isLoading, error } = useOffers();

	const offers =
		responseData?.data || (Array.isArray(responseData) ? responseData : []);

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Offers & Deals", ar: "عروض وتخفيضات" } },
	];

	const pageTitle = isRtl
		? "عروض وتخفيضات أرفف التخزين والمخازن | قايم ورف"
		: "Storage Racks Offers & Deals | Qayem & Raf";

	const pageDescription = isRtl
		? "اكتشف أقوى عروض وتخفيضات وحدات رفوف التخزين المعدنية من قايم ورف."
		: "Discover the best offers and discounts on storage racks from Qayem & Raf.";

	if (isLoading) return <LoadingState />;

	if (error) {
		return (
			<div className="flex flex-col w-full min-h-screen bg-background pb-10 px-4">
				<ErrorState
					message={
						error?.message ||
						(isRtl ? "حدث خطأ أثناء تحميل العروض." : "Failed to load offers.")
					}
					onRetry={() => window.location.reload()}
				/>
			</div>
		);
	}

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-20">
			<SEO
				title={pageTitle}
				description={pageDescription}
				keywords={
					isRtl
						? "عروض, تخفيضات, خصومات أرفف, وحدات أرفف, قايم ورف"
						: "offers, storage rack deals, discounts, qayem and raf"
				}
				canonical={`https://qayemwraf.com/${language}/offers`}
			/>

			<PageHero
				title={{ en: "Offers & Deals", ar: "عروض وتخفيضات 🏷️" }}
				subtitle={{
					en: "Explore our latest exclusive offers and special discounts on storage solutions.",
					ar: "اكتشف أحدث العروض الحصرية والتخفيضات المميزة على وحدات وحلول التخزين.",
				}}
				count={offers.length}
				countLabel={{ en: "Offers", ar: "عروض" }}
				breadcrumbs={breadcrumbItems}
			/>

			<Container className="mt-10 sm:mt-12">
				{offers.length === 0 ? (
					<OffersEmpty isRtl={isRtl} />
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
						{offers.map((offer, index) => (
							<OfferCard
								key={offer.id || index}
								offer={offer}
								variant={index === 0 ? "featured" : "default"}
							/>
						))}
					</div>
				)}
			</Container>
		</div>
	);
};

export default Offers;
