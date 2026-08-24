import React from "react";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Heart } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard/ProductCard";
import EmptyWishlistState from "./components/EmptyWishlistState";
import { useAppSelector } from "@/app/store/hooks";
import { selectWishlistItems } from "@/features/wishlist/wishlistSlice";

const Wishlist = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const wishlistItems = useAppSelector(selectWishlistItems);

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Profile", ar: "حسابي" }, link: "/profile" },
		{ label: { en: "Wishlist", ar: "المفضلة" } }
	];

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			{/* Header / Title Area */}
			<div className="bg-surface border-b border-border/60 py-8 mb-8 relative z-10">
				<Container>
					<Breadcrumb items={breadcrumbItems} className="mb-4" />
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
							<Heart className="w-6 h-6" strokeWidth={2.5} />
						</div>
						<h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight">
							{isRtl ? "المفضلة" : "My Wishlist"}
						</h1>
						{wishlistItems.length > 0 && (
							<span className="px-3 py-1 bg-surface-2 rounded-full text-sm font-bold text-text-secondary mt-1">
								{wishlistItems.length} {isRtl ? "منتجات" : "items"}
							</span>
						)}
					</div>
				</Container>
			</div>

			<Container>
				{wishlistItems.length === 0 ? (
					<EmptyWishlistState />
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{wishlistItems.map(product => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				)}
			</Container>
		</div>
	);
};

export default Wishlist;
