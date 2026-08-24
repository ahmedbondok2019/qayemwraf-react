import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Trash2, Heart, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import QuantitySelector from "../../ProductDetails/components/QuantitySelector";

export const CartItem = ({ item, onUpdateQuantity, onRemove, onSaveForLater }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const product = item.product;

	const isOutOfStock = product?.stock?.quantity === 0;
	const hasDiscount = product?.price?.original > product?.price?.current;
	
	const productSlug = product?.slug || item.productId;

	return (
		<div className={cn(
			"flex flex-col sm:flex-row gap-4 p-4 bg-surface rounded-2xl border transition-colors",
			isOutOfStock ? "border-danger/30 bg-danger/5" : "border-border/50 hover:border-border"
		)}>
			{/* Product Image */}
			<Link to={`/products/${productSlug}`} className="shrink-0">
				<div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl border border-border/50 overflow-hidden bg-white">
					<img 
						src={product?.images?.[0] || product?.image || "https://placehold.co/400x400?text=EG+Medical"} 
						alt={product?.title?.[language] || product?.title || product?.name || "Product"} 
						className={cn("w-full h-full object-cover", isOutOfStock && "opacity-50 grayscale")}
					/>
				</div>
			</Link>

			{/* Product Details */}
			<div className="flex-1 flex flex-col justify-between min-w-0">
				<div className="flex flex-col gap-1">
					<div className="flex items-start justify-between gap-4">
						<Link to={`/products/${productSlug}`} className="hover:text-primary transition-colors min-w-0">
							<h3 className="font-bold text-text text-base sm:text-lg leading-tight truncate-2-lines">
								{product?.title?.[language] || product?.title || product?.name}
							</h3>
						</Link>
						
						{/* Mobile Price (Hidden on Desktop, shown below title) */}
						<div className="sm:hidden flex flex-col items-end shrink-0">
							<span className="font-extrabold text-primary text-lg">
								{item.unitPrice} {isRtl ? "ج.م" : "EGP"}
							</span>
							{hasDiscount && (
								<span className="text-xs text-text-muted line-through">
									{product.price.original} {isRtl ? "ج.م" : "EGP"}
								</span>
							)}
						</div>
					</div>

					{item.selectedVariant && (
						<span className="text-sm text-text-secondary mt-1">
							{item.selectedVariant[language]}
						</span>
					)}

					{isOutOfStock && (
						<div className="flex items-center gap-1.5 text-danger text-sm font-bold mt-2">
							<AlertCircle className="w-4 h-4" />
							{isRtl ? "هذا المنتج غير متوفر حالياً" : "This item is currently out of stock"}
						</div>
					)}
				</div>

				{/* Actions & Quantity */}
				<div className="flex items-center justify-between mt-4">
					<div className="flex items-center gap-2 sm:gap-4">
						<button 
							onClick={() => onRemove(item.productId, item.selectedVariant)}
							className="flex items-center gap-1.5 text-sm font-bold text-text-secondary hover:text-danger transition-colors p-2 -ml-2 rounded-lg hover:bg-danger/10"
						>
							<Trash2 className="w-4 h-4" />
							<span className="hidden sm:inline">{isRtl ? "حذف" : "Remove"}</span>
						</button>
						<div className="w-px h-4 bg-border/60 hidden sm:block" />
						<button 
							onClick={() => onSaveForLater(product, item.selectedVariant)}
							className="flex items-center gap-1.5 text-sm font-bold text-text-secondary hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10"
						>
							<Heart className="w-4 h-4" />
							<span className="hidden sm:inline">{isRtl ? "حفظ لوقت لاحق" : "Save for Later"}</span>
						</button>
					</div>

					{!isOutOfStock && (
						<div className="scale-90 origin-right sm:scale-100 sm:origin-center">
							<QuantitySelector 
								quantity={item.quantity} 
								setQuantity={(q) => onUpdateQuantity(item.productId, q, item.selectedVariant)} 
								maxQuantity={product?.stock?.quantity}
							/>
						</div>
					)}
				</div>
			</div>

			{/* Desktop Price */}
			<div className="hidden sm:flex flex-col items-end shrink-0 pl-4 border-l border-border/50 min-w-[120px]">
				<span className="font-extrabold text-primary text-xl">
					{item.subtotal} {isRtl ? "ج.م" : "EGP"}
				</span>
				{hasDiscount && (
					<span className="text-sm text-text-muted line-through mt-1">
						{product.price.original * item.quantity} {isRtl ? "ج.م" : "EGP"}
					</span>
				)}
				<span className="text-xs text-text-secondary mt-2">
					{item.quantity} × {item.unitPrice}
				</span>
			</div>
		</div>
	);
};

export default CartItem;
