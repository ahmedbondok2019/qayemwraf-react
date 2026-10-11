import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { cn } from "@/lib/utils";
import {
	Tag,
	Zap,
	Clock,
	Layers,
	ArrowRight,
	ArrowLeft,
	CheckCircle2,
	Truck,
	Sparkles,
} from "lucide-react";
import { offerCardVariants, badgeVariants } from "./offer-card.variants";

/**
 * Resolves destination link based on offer object properties
 */
export const resolveOfferLink = (offer) => {
	if (!offer) return "/products";

	const targetCategorySlug =
		offer.category?.slug ||
		offer.category_slug ||
		(offer.category?.link && isNaN(Number(offer.category.link))
			? offer.category.link
			: null);

	if (targetCategorySlug && isNaN(Number(targetCategorySlug))) {
		return `/category/${targetCategorySlug}`;
	}

	if (offer.link_type === "category" && (offer.category_id || offer.category?.id)) {
		return `/category/${offer.category_id || offer.category?.id}`;
	}

	if (offer.link_type === "product" && (offer.product_id || offer.link_id)) {
		return `/products/${offer.product_id || offer.link_id}`;
	}

	if (offer.link && !offer.link.startsWith("http")) {
		return offer.link.startsWith("/") ? offer.link : `/${offer.link}`;
	}

	if (offer.url && !offer.url.startsWith("http")) {
		return offer.url.startsWith("/") ? offer.url : `/${offer.url}`;
	}

	if (offer.slug && isNaN(Number(offer.slug))) {
		return `/category/${offer.slug}`;
	}

	if (offer.category_id || offer.category?.id) {
		return `/category/${offer.category_id || offer.category?.id}`;
	}

	return "/products";
};

/**
 * Safe text resolver helper for multi-lingual objects or strings
 */
const resolveSafeText = (value, lang) => {
	if (!value) return "";
	if (typeof value === "string") return value;
	if (typeof value === "number") return String(value);
	if (typeof value === "object") {
		return value[lang] || value.ar || value.en || Object.values(value)[0] || "";
	}
	return String(value);
};

/**
 * OfferCard Component
 * Displays a promotional offer card adhering to design tokens, CVA, RTL/LTR, and Light/Dark modes.
 *
 * @param {Object} props
 * @param {Object} props.offer - The offer data object conforming to API schema
 * @param {string} [props.variant] - CVA variant ("default" | "featured" | "minimal")
 * @param {string} [props.size] - CVA size ("default" | "compact")
 * @param {string} [props.className] - Additional CSS classes
 */
export const OfferCard = ({
	offer,
	variant = "default",
	size = "default",
	className,
}) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

	if (!offer) return null;

	const titleText =
		resolveSafeText(offer.title, language) ||
		resolveSafeText(offer.name, language) ||
		(isRtl ? "عرض خاص مميز" : "Exclusive Offer");

	const rawDesc = resolveSafeText(offer.description, language);
	const descText =
		rawDesc ||
		(isRtl
			? "تصفح أفضل وحدات وحلول أرفف التخزين المعدنية المشمولة بالعرض بأسعار خاصة."
			: "Browse the best metal storage shelving units included in this deal at special prices.");

	const imageUrl = offer.image || offer.category?.image || "";
	const categoryTitle =
		resolveSafeText(offer.category?.title, language) ||
		resolveSafeText(offer.category?.name, language);

	const isFlashSale = Boolean(offer.filters?.flash_sale);
	const targetLink = resolveOfferLink(offer);

	return (
		<article className="h-full">
			<LocalizedLink
				to={targetLink}
				aria-label={titleText}
				className={cn(offerCardVariants({ variant, size }), className)}
			>
				{/* Image Header Showcase */}
				<div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 dark:bg-slate-900/80 flex items-center justify-center p-2 border-b border-border/40">
					{/* Ambient glow matching the flyer image */}
					{imageUrl && (
						<div
							className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-15 scale-125 pointer-events-none transition-opacity duration-300 group-hover:opacity-25"
							style={{ backgroundImage: `url(${imageUrl})` }}
							aria-hidden="true"
						/>
					)}

					{/* Offer Poster Image */}
					{imageUrl ? (
						<img
							src={imageUrl}
							alt={titleText}
							loading="lazy"
							className="relative z-10 w-full h-full rounded-2xl drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-105"
						/>
					) : (
						<div className="relative z-10 flex flex-col items-center justify-center text-text-muted gap-2">
							<Tag className="w-12 h-12 stroke-1" />
							<span className="text-xs">{isRtl ? "عرض ترويجي" : "Promo Offer"}</span>
						</div>
					)}

					{/* Top Badges */}
					<div className="absolute top-3.5 start-3.5 z-20 flex flex-col gap-1.5 items-start">
						{isFlashSale ? (
							<span className={cn(badgeVariants({ type: "flash" }))}>
								<Zap className="w-3.5 h-3.5 fill-current" />
								<span>{isRtl ? "عرض فلاش 🔥" : "Flash Deal ⚡"}</span>
							</span>
						) : (
							<span className={cn(badgeVariants({ type: "special" }))}>
								<Tag className="w-3.5 h-3.5" />
								<span>{isRtl ? "عرض خاص" : "Special Offer"}</span>
							</span>
						)}
					</div>

					<div className="absolute top-3.5 end-3.5 z-20">
						<span className={cn(badgeVariants({ type: "neutral" }))}>
							<Clock className="w-3 h-3 text-primary" />
							<span>{isRtl ? "لفترة محدودة" : "Limited Time"}</span>
						</span>
					</div>
				</div>

				{/* Card Body */}
				<div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4 bg-surface">
					<div className="flex flex-col gap-2.5">
						{/* Category & Status Bar */}
						<div className="flex items-center justify-between gap-2">
							{categoryTitle ? (
								<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-primary bg-primary/10 border border-primary/20">
									<Layers className="w-3 h-3" />
									<span className="line-clamp-1">{categoryTitle}</span>
								</span>
							) : (
								<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-text-secondary bg-surface-2 dark:bg-slate-800">
									<Sparkles className="w-3 h-3 text-primary" />
									<span>{isRtl ? "قايم ورف" : "Qayem & Raf"}</span>
								</span>
							)}

							{isFlashSale && (
								<span className="text-[11px] font-bold text-danger flex items-center gap-1">
									<Zap className="w-3 h-3 fill-danger" />
									<span>{isRtl ? "خصم استثنائي" : "Extra Discount"}</span>
								</span>
							)}
						</div>

						{/* Offer Title */}
						<h3 className="text-base sm:text-lg font-bold text-text group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug">
							{titleText}
						</h3>

						{/* Description */}
						<p className="text-xs sm:text-sm text-text-secondary line-clamp-2 leading-relaxed">
							{descText}
						</p>

						{/* Quality & Value Proposition Chips */}
						<div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-text-muted">
							<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-2 dark:bg-slate-800 border border-border/50">
								<CheckCircle2 className="w-3 h-3 text-emerald-500" />
								<span>{isRtl ? "حمولة معتمدة" : "Certified Load"}</span>
							</span>
							<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-2 dark:bg-slate-800 border border-border/50">
								<Truck className="w-3 h-3 text-primary" />
								<span>{isRtl ? "شحن فوري" : "Fast Shipping"}</span>
							</span>
						</div>
					</div>

					{/* CTA Button */}
					<div className="pt-3 border-t border-border/60 flex items-center justify-between gap-3 mt-auto">
						<span className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-primary text-primary-foreground group-hover:bg-primary-hover shadow-sm transition-all duration-300">
							<span>{isRtl ? "استفد من العرض وتصفح المنتجات" : "Explore Deal & Products"}</span>
							<ArrowIcon className="w-4 h-4 transition-transform duration-300 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
						</span>
					</div>
				</div>
			</LocalizedLink>
		</article>
	);
};

export default OfferCard;
