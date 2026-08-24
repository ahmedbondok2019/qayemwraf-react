import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ShoppingCart, X, ArrowRight, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectCartItems, selectCartTotal, selectCartCount, removeFromCart } from "@/features/cart/cartSlice";

export const MiniCart = ({ isOpen, onClose }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const dispatch = useAppDispatch();
	
	const items = useAppSelector(selectCartItems);
	const totalItems = useAppSelector(selectCartCount);
	const total = useAppSelector(selectCartTotal);

	const handleRemove = (id, selectedVariant = null) => {
		dispatch(removeFromCart({ productId: id, selectedVariant }));
	};

	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<div 
				className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm transition-opacity" 
				onClick={onClose}
			/>

			{/* Drawer */}
			<div className={cn(
				"fixed top-0 bottom-0 z-[101] w-full sm:w-[400px] bg-surface shadow-2xl flex flex-col transition-transform duration-300",
				isRtl ? "left-0" : "right-0"
			)}>
				
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-border/60">
					<div className="flex items-center gap-2">
						<ShoppingCart className="w-5 h-5 text-text" />
						<h2 className="font-extrabold text-lg text-text">
							{isRtl ? "سلة المشتريات" : "Your Cart"}
						</h2>
						<span className="px-2 py-0.5 bg-surface-2 rounded-full text-xs font-bold text-text-secondary">
							{totalItems}
						</span>
					</div>
					<button 
						onClick={onClose}
						className="p-2 text-text-secondary hover:text-text hover:bg-surface-2 rounded-full transition-colors"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Content */}
				<div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
					{items.length === 0 ? (
						<div className="flex flex-col items-center justify-center h-full text-center text-text-secondary">
							<ShoppingCart className="w-16 h-16 opacity-20 mb-4" />
							<p className="font-bold">{isRtl ? "السلة فارغة" : "Your cart is empty"}</p>
						</div>
					) : (
						items.map(item => (
							<div key={`${item.productId}-${JSON.stringify(item.selectedVariant)}`} className="flex gap-4 p-3 bg-surface-2/30 border border-border/50 rounded-xl relative group">
								<img src={item.product.images?.[0] || item.product.image} alt={item.product.title?.[language]} className="w-20 h-20 rounded-lg object-cover bg-white" />
								<div className="flex flex-col flex-1 min-w-0 justify-center">
									<h4 className="font-bold text-sm text-text truncate-2-lines mb-1">{item.product.title?.[language]}</h4>
									<span className="text-xs text-text-secondary mb-2">{item.selectedVariant?.[language] || ""}</span>
									<div className="flex items-center justify-between">
										<span className="font-extrabold text-primary text-sm">{item.unitPrice} {isRtl ? "ج.م" : "EGP"}</span>
										<span className="text-xs font-bold text-text-secondary">Qty: {item.quantity}</span>
									</div>
								</div>
								
								{/* Remove Button */}
								<button 
									onClick={() => handleRemove(item.productId, item.selectedVariant)}
									className="absolute top-2 right-2 (ltr) left-2 (rtl) p-1.5 bg-surface rounded-full text-text-muted hover:text-danger hover:bg-danger/10 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
								>
									<Trash2 className="w-3 h-3" />
								</button>
							</div>
						))
					)}
				</div>

				{/* Footer */}
				{items.length > 0 && (
					<div className="p-4 border-t border-border/60 bg-surface shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
						<div className="flex justify-between items-center mb-4">
							<span className="font-bold text-text-secondary">{isRtl ? "المجموع الفرعي" : "Subtotal"}</span>
							<span className="font-extrabold text-text text-lg">{total} {isRtl ? "ج.م" : "EGP"}</span>
						</div>
						<div className="flex flex-col gap-2">
							<Link 
								to="/cart" 
								onClick={onClose}
								className="w-full py-3 rounded-xl border-2 border-primary text-primary font-bold text-center hover:bg-primary/5 transition-colors"
							>
								{isRtl ? "عرض السلة" : "View Cart"}
							</Link>
							<Link 
								to="/checkout"
								onClick={onClose}
								className="w-full py-3 rounded-xl bg-primary text-white font-bold text-center flex items-center justify-center gap-2 hover:bg-primary-hover shadow-lg shadow-primary/20 transition-colors"
							>
								{isRtl ? "إتمام الطلب" : "Checkout"}
								<ArrowRight className={cn("w-4 h-4", isRtl && "scale-x-[-1]")} />
							</Link>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default MiniCart;
