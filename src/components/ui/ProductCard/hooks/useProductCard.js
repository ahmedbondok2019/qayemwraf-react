import { useState, useCallback } from "react";
import { getStockState } from "../utils/product-card.helpers";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { addToCart } from "@/features/cart/cartSlice";
import { toggleWishlist, selectIsWishlisted } from "@/features/wishlist/wishlistSlice";
import { toast } from "sonner";
import { useLanguage } from "@/app/providers/I18nProvider";

/**
 * Hook to manage the internal state of a Product Card
 * Handles hover states, wishlist toggling, and quick actions
 */
export const useProductCard = (productData) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const dispatch = useAppDispatch();
	
	const [isHovered, setIsHovered] = useState(false);
	const [isAddingToCart, setIsAddingToCart] = useState(false);
	
	const isWishlisted = useAppSelector(selectIsWishlisted(productData?.id));

	const stockState = productData?.stock?.quantity !== undefined 
		? getStockState(productData.stock.quantity) 
		: "in-stock";
		
	const isOutOfStock = stockState === "out-of-stock";

	const handleMouseEnter = useCallback(() => setIsHovered(true), []);
	const handleMouseLeave = useCallback(() => setIsHovered(false), []);

	const handleToggleWishlist = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!productData) return;
		
		dispatch(toggleWishlist(productData));
		

		if (!isWishlisted) {
			toast.success(isRtl ? "تم الإضافة إلى المفضلة" : "Added to Wishlist");
		} else {
			toast.info(isRtl ? "تم الإزالة من المفضلة" : "Removed from Wishlist");
		}
	}, [dispatch, productData, isWishlisted, isRtl]);


	const handleAddToCart = useCallback(async (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (isOutOfStock || !productData) return;
		if (productData.stock?.quantity === undefined || productData.stock.quantity <= 0) {
			toast.error(isRtl ? "هذا المنتج غير متوفر حالياً" : "This product is out of stock");
			return;
		}
		
		setIsAddingToCart(true);
		
		// Simulate a short network delay for better UX
		await new Promise(resolve => setTimeout(resolve, 400));
		
		dispatch(addToCart({ product: productData, quantity: 1 }));
		
		setIsAddingToCart(false);
		toast.success(isRtl ? "تم إضافة المنتج للسلة بنجاح" : "Product added to cart successfully");
	}, [dispatch, isOutOfStock, productData, isRtl]);

	return {
		isHovered,
		isWishlisted,
		isAddingToCart,
		isOutOfStock,
		stockState,
		handleMouseEnter,
		handleMouseLeave,
		toggleWishlist: handleToggleWishlist,
		handleAddToCart
	};
};
