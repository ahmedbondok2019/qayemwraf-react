import React from "react";
import QuantitySelector from "./QuantitySelector";
import AddToCartBar from "./AddToCartBar";

import PriceBox from "./PriceBox";

export const ProductActions = ({ 
	price,
	quantity, 
	setQuantity, 
	maxQuantity, 
	onAddToCart, 
	onBuyNow,
	isWishlisted, 
	onToggleWishlist 
}) => {
	const outOfStock = !maxQuantity || maxQuantity < 1;

	return (
		<div className="flex flex-col gap-5 mt-2 bg-surface rounded-2xl border border-border shadow-sm p-4 sm:p-5">
			
			{/* Price & Quantity Section */}
			<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-border/60">
				<PriceBox price={price} className="p-0 border-0 shadow-none bg-transparent" />
				
				{/* Quantity Selection */}
				{!outOfStock && (
					<QuantitySelector 
						quantity={quantity} 
						setQuantity={setQuantity} 
						maxQuantity={maxQuantity} 
					/>
				)}
			</div>

			{/* Add to Cart, Buy Now, Wishlist */}
			<AddToCartBar 
				onAddToCart={onAddToCart}
				onBuyNow={onBuyNow}
				isWishlisted={isWishlisted}
				onToggleWishlist={onToggleWishlist}
				disabled={outOfStock}
			/>
		</div>
	);
};

export default ProductActions;
