import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
	const navigate = useNavigate();
	
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


	const handleAddToCart = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		navigate(`/${language}/contact`);
	}, [navigate, language]);

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
