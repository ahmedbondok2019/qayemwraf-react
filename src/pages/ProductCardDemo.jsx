import React from "react";
import AppLayout from "@/layouts/AppLayout";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ProductCard from "@/components/ui/ProductCard";
import ProductCardSkeleton from "@/components/ui/ProductCard/ProductCardSkeleton";
import { PRODUCT_CARD_VARIANTS, PRODUCT_STATES } from "@/components/ui/ProductCard";

const mockBaseProduct = {
	id: "demo-1",
	title: { en: "OMRON M2 Basic Blood Pressure Monitor", ar: "جهاز قياس ضغط الدم أومرون M2 الأساسي" },
	category: { en: "Medical Devices", ar: "أجهزة طبية", id: "cat-1" },
	brand: "OMRON",
	image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=400&h=400",
	price: { current: 35.00, original: 45.00 },
	reviews: { rating: 4.8, count: 236 },
	stock: { quantity: 15 },
	badges: [
		{ type: "new", label: { en: "New", ar: "جديد" } }
	]
};

const ProductCardDemo = () => {
	return (
		<AppLayout>
			<Section bg="muted" spacing="md" className="min-h-screen">
				<Container>
					<div className="flex flex-col gap-12">
						<div>
							<h1 className="text-3xl font-bold mb-2">Product Card System Demo</h1>
							<p className="text-text-secondary">Comprehensive visual test suite for all Card states and variants.</p>
						</div>

						{/* 1. Core States */}
						<div>
							<h2 className="text-xl font-bold mb-6 pb-2 border-b border-border">1. Core States (Stock & Availability)</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
								{/* Default */}
								<div className="flex flex-col gap-2">
									<span className="text-sm font-bold text-text-muted">In Stock (Default)</span>
									<ProductCard product={{...mockBaseProduct}} />
								</div>
								
								{/* Limited Stock */}
								<div className="flex flex-col gap-2">
									<span className="text-sm font-bold text-text-muted">Limited Stock (5 items)</span>
									<ProductCard product={{...mockBaseProduct, stock: { quantity: 3 }}} />
								</div>

								{/* Out of Stock */}
								<div className="flex flex-col gap-2">
									<span className="text-sm font-bold text-text-muted">Out of Stock</span>
									<ProductCard product={{...mockBaseProduct, stock: { quantity: 0 }}} />
								</div>

								{/* Skeleton */}
								<div className="flex flex-col gap-2">
									<span className="text-sm font-bold text-text-muted">Loading Skeleton</span>
									<ProductCardSkeleton />
								</div>
							</div>
						</div>

						{/* 2. Badges & Promos */}
						<div>
							<h2 className="text-xl font-bold mb-6 pb-2 border-b border-border">2. Badges & Promos</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
								{/* Best Seller */}
								<div className="flex flex-col gap-2">
									<span className="text-sm font-bold text-text-muted">Best Seller</span>
									<ProductCard product={{
										...mockBaseProduct,
										badges: [{ type: "bestseller", label: { en: "Best Seller", ar: "الأكثر مبيعاً" } }]
									}} />
								</div>
								
								{/* Discounted */}
								<div className="flex flex-col gap-2">
									<span className="text-sm font-bold text-text-muted">Heavy Discount</span>
									<ProductCard product={{
										...mockBaseProduct,
										price: { current: 120, original: 250 },
										badges: []
									}} />
								</div>

								{/* Multiple Badges */}
								<div className="flex flex-col gap-2">
									<span className="text-sm font-bold text-text-muted">Multi Badges</span>
									<ProductCard product={{
										...mockBaseProduct,
										badges: [
											{ type: "new", label: { en: "New", ar: "جديد" } },
											{ type: "bestseller", label: { en: "Top Choice", ar: "خيار مميز" } }
										]
									}} />
								</div>
							</div>
						</div>

						{/* 3. Layout Variants */}
						<div>
							<h2 className="text-xl font-bold mb-6 pb-2 border-b border-border">3. Structural Variants</h2>
							<div className="flex flex-col gap-6">
								{/* Compact */}
								<div className="flex flex-col gap-2 w-full max-w-xs">
									<span className="text-sm font-bold text-text-muted">Compact Variant (Wishlist/Sidebar)</span>
									<ProductCard product={mockBaseProduct} variant={PRODUCT_CARD_VARIANTS.COMPACT} />
								</div>
								
								{/* Horizontal */}
								<div className="flex flex-col gap-2 w-full max-w-2xl">
									<span className="text-sm font-bold text-text-muted">Horizontal Variant (List View)</span>
									<ProductCard product={mockBaseProduct} variant={PRODUCT_CARD_VARIANTS.HORIZONTAL} />
								</div>
							</div>
						</div>

					</div>
				</Container>
			</Section>
		</AppLayout>
	);
};

export default ProductCardDemo;
