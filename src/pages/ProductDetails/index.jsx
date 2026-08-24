import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useLanguage } from "@/app/providers/I18nProvider";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { addToCart } from "@/features/cart/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "@/features/wishlist/wishlistSlice";
import { toast } from "sonner";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductActions from "./components/ProductActions";
import ProductMeta from "./components/ProductMeta";
import ProductTabs from "./components/ProductTabs";
import MobileBottomBar from "./components/MobileBottomBar";
import RelatedProducts from "./components/RelatedProducts";
import RecentlyViewed from "@/components/products/RecentlyViewed";
import LoadingState from "../Products/components/States/LoadingState";
import ErrorState from "../Products/components/States/ErrorState";
import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";
import { useProducts } from "@/hooks/queries/useProducts";

const ProductDetails = () => {
	const { slug } = useParams();
	const navigate = useNavigate();
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const [product, setProduct] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	// Product Interaction State
	const [quantity, setQuantity] = useState(1);
	const dispatch = useAppDispatch();
	const isWishlisted = useAppSelector(selectIsWishlisted(product?.id || ""));

	// Fetch related products dynamically from the current product's category
	const categoryId = product?.categories?.[0]?.id;
	const { data: catResponse } = useProducts(
		{ category_id: categoryId },
		{ enabled: !!categoryId }
	);

	useEffect(() => {
		const fetchProductDetails = async () => {
			setIsLoading(true);
			setError(null);
			try {
				// Fetch product using the slug (or ID) from URL
				const response = await api.get(`${API_ENDPOINTS.PRODUCTS}/${slug}`);
				if (response && response.success) {
					const data = response.data;
					
					// Map API data to the format expected by components
					const priceVal = data.price || 0;
					const currentPrice = data.final_price || data.special_price || data.sale_price || priceVal;
					const originalPrice = priceVal > currentPrice ? priceVal : null;
					const discountVal = data.discount_percentage || (originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0);
					
					const images = [];
					if (data.primary_image || data.image) {
						images.push(data.primary_image || data.image);
					}
					if (data.images && data.images.length > 0) {
						data.images.forEach(img => {
							if (img.image && !images.includes(img.image)) {
								images.push(img.image);
							}
						});
					} else if (data.gallery && data.gallery.length > 0) {
						data.gallery.forEach(img => {
							if (img.image && !images.includes(img.image)) {
								images.push(img.image);
							}
						});
					}
					// Fallback if no images
					if (images.length === 0) images.push("https://placehold.co/800x800?text=No+Image");

					const badges = [];
					if (data.has_flash_sale) {
						badges.push({ type: "sale", label: { en: "Flash Sale", ar: "عرض فلاش" } });
					} else if (data.discount_percentage > 0) {
						badges.push({ type: "sale", label: { en: `${data.discount_percentage}% OFF`, ar: `خصم ${data.discount_percentage}%` } });
					}

					const mappedProduct = {
						id: `prod-${data.id}`,
						_realId: data.id,
						title: { ar: data.name || data.title || "", en: data.name || data.title || "" },
						description: { ar: data.description || "", en: data.description || "" },
						price: { current: currentPrice, original: originalPrice, discount: discountVal },
						images: images,
						categories: [{ 
							id: String(data.category_id || ""), 
							label: { en: data.category || "", ar: data.category || "" } 
						}],
						stock: { 
							quantity: (data.quantity === -1 || data.ignore_quantity) ? 20 : (data.quantity || 0),
							sku: data.sku || data.item_code || null
						},
						brand: { name: data.brand || data.store_name || "EG Medical" },
						shortDescription: { ar: data.meta_description || "", en: data.meta_description || "" },
						reviews: { rating: data.rating || 0, count: data.rate_count || 0 },
						reviewsList: data.product_rates || [],
						badges,
						specifications: data.specifications || data.attributes || [], // If API provides specs, map them here
						_apiOriginal: data
					};

					setProduct(mappedProduct);
				} else {
					setError(isRtl ? "لم يتم العثور على المنتج" : "Product not found");
				}
			} catch (err) {
				setError(err?.message || (isRtl ? "حدث خطأ أثناء تحميل بيانات المنتج" : "Failed to load product details"));
			} finally {
				setIsLoading(false);
			}
		};

		if (slug) {
			fetchProductDetails();
		}
	}, [slug, isRtl]);

	const handleAddToCart = () => {
		if (!product?.stock?.quantity || product.stock.quantity <= 0) return;
		dispatch(addToCart({ product, quantity }));
		toast.success(isRtl ? "تم إضافة المنتج للسلة بنجاح" : "Product added to cart successfully");
	};

	const handleBuyNow = () => {
		if (!product?.stock?.quantity || product.stock.quantity <= 0) return;
		dispatch(addToCart({ product, quantity }));
		toast.success(isRtl ? "تم إضافة المنتج للسلة بنجاح" : "Product added to cart successfully");
		navigate(`/${language}/checkout`);
	};

	const handleToggleWishlist = () => {
		if (!product) return;
		dispatch(toggleWishlist(product));
		if (!isWishlisted) {
			toast.success(isRtl ? "تم الإضافة إلى المفضلة" : "Added to Wishlist");
		} else {
			toast.info(isRtl ? "تم الإزالة من المفضلة" : "Removed from Wishlist");
		}
	};

	if (isLoading) {
		return <LoadingState />;
	}

	if (error || !product) {
		return (
			<div className="flex flex-col w-full min-h-screen bg-background pb-10 px-4">
				<ErrorState message={error || "Product not found"} onRetry={() => window.location.reload()} />
			</div>
		);
	}

	// Related products fetched dynamically from API
	const apiRelatedProducts = catResponse?.data?.data || catResponse?.data || [];
	const relatedProducts = apiRelatedProducts
		.filter(p => String(p.id) !== String(product?._realId))
		.slice(0, 8)
		.map(apiProd => {
			const priceVal = apiProd.price || 0;
			const currentPrice = apiProd.final_price || apiProd.special_price || apiProd.sale_price || priceVal;
			const originalPrice = priceVal > currentPrice ? priceVal : null;
			const discountVal = apiProd.discount_percentage || (originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0);
			return {
				id: `prod-${apiProd.id}`,
				title: { ar: apiProd.title || apiProd.name || "", en: apiProd.title || apiProd.name || "" },
				category: { ar: apiProd.category || "", en: apiProd.category || "", id: String(apiProd.category_id || "") },
				brand: apiProd.brand || "",
				image: apiProd.primary_image || apiProd.image || "",
				price: { current: currentPrice, original: originalPrice, discount: discountVal },
				reviews: { rating: apiProd.rating || 0, count: apiProd.rate_count || 0 },
				stock: { quantity: apiProd.quantity || 0 },
				badges: [],
				link: apiProd.product_link || `/products/${apiProd.id}`,
				_apiOriginal: apiProd
			};
		});

	// Breadcrumb mapping
	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Products", ar: "المنتجات" }, link: "/products" },
		{ label: product.categories?.[0]?.label || { en: "Category", ar: "القسم" }, link: `/category/${product.categories?.[0]?.id}` },
		{ label: product.title }
	];

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-10">


			<Container className="pt-4 sm:pt-6">
				{/* Top Section: Gallery & Info */}
				<div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">

					{/* Left Column: Gallery & Tabs (Scrolls normally) */}
					<div className="w-full lg:w-1/2 shrink-0 flex flex-col gap-8">
						<ProductGallery images={product.images} />

						{/* Desktop: Move Tabs inside left column so right column can stick alongside it */}
						<div className="hidden lg:block mt-2">
							<ProductTabs
								productId={product._realId}
								description={product.description}
								specifications={product.specifications}
								reviews={product.reviewsList}
							/>
						</div>
					</div>

					{/* Right Column: Info & Actions (Sticky Desktop Buy Box) */}
					<div className="w-full lg:w-1/2 flex flex-col lg:sticky lg:top-24 pb-8 z-10">
						<ProductInfo product={product} />

						<div className="mt-6">
							<ProductActions
								price={product.price}
								quantity={quantity}
								setQuantity={setQuantity}
								maxQuantity={product.stock?.quantity}
								onAddToCart={handleAddToCart}
								onBuyNow={handleBuyNow}
								isWishlisted={isWishlisted}
								onToggleWishlist={handleToggleWishlist}
							/>
						</div>

						<div className="mt-6">
							<ProductMeta sku={product.stock?.sku} categories={product.categories} />
						</div>
					</div>
				</div>

				{/* Mobile: Tabs below everything else */}
				<div className="lg:hidden mt-8">
					<ProductTabs
						productId={product._realId}
						description={product.description}
						specifications={product.specifications}
						reviews={product.reviewsList}
					/>
				</div>

				{/* Bottom Section: Related Products */}
				<div className="mt-16">
					<RelatedProducts products={relatedProducts} />
				</div>
			</Container>

			{/* Recently Viewed Section (Full width background) */}
			<div className="mt-16">
				<RecentlyViewed />
			</div>

			{/* Mobile Bottom Buy Bar */}
			<MobileBottomBar
				price={product.price}
				onAddToCart={handleAddToCart}
				disabled={!product.stock?.quantity}
				showThreshold={600}
			/>
		</div>
	);
};

export default ProductDetails;
