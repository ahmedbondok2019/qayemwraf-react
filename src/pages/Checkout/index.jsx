import React, { useState } from "react";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Lock, MapPin, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppSelector } from "@/app/store/hooks";

import ShippingAddress from "./components/ShippingAddress";
import PaymentMethod from "./components/PaymentMethod";
import OrderSummary from "./components/OrderSummary";
import OrderSuccess from "./components/OrderSuccess";

import { usePlaceOrder } from "@/hooks/queries/useCheckoutSummary";
import { clearCart, selectCartItems } from "@/features/cart/cartSlice";

const Checkout = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const dispatch = useDispatch();

	const [currentStep, setCurrentStep] = useState(1);
	const [isSuccess, setIsSuccess] = useState(false);

	const items = useAppSelector(selectCartItems);

	// Checkout states to send to /checkout/store
	const [addressId, setAddressId] = useState(null);

	const placeOrderMutation = usePlaceOrder();

	if (isSuccess) {
		return (
			<div className="min-h-screen bg-background">
				<OrderSuccess />
			</div>
		);
	}

	if (!items || items.length === 0) {
		return <Navigate to="/cart" replace />;
	}

	const steps = [
		{ id: 1, title: { en: "Shipping Address", ar: "عنوان الشحن" }, icon: MapPin },
		{ id: 2, title: { en: "Payment", ar: "الدفع" }, icon: CreditCard }
	];

	const handleNext = (stepData) => {
		if (currentStep === 1 && stepData) {
			setAddressId(stepData.id);
		}

		if (currentStep < 2) {
			setCurrentStep(prev => prev + 1);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(prev => prev - 1);
		}
	};

	const handlePlaceOrder = async (selectedPaymentId) => {
		if (!addressId) {
			toast.error(isRtl ? "يرجى تحديد عنوان الشحن أولاً." : "Please select a shipping address first.");
			setCurrentStep(1);
			return;
		}

		try {
			await placeOrderMutation.mutateAsync({
				address_id: addressId,
				shipping_method: "standard", // default backend static shipping method fallback
				payment_method_id: selectedPaymentId,
			});
			// Clear local cart storage
			dispatch(clearCart());
			setIsSuccess(true);
			window.scrollTo({ top: 0 });
		} catch (err) {
			console.error("Order creation failed:", err);
			toast.error(isRtl ? "فشل تأكيد الطلب. الرجاء المحاولة مرة أخرى." : "Failed to place order. Please try again.");
		}
	};

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			
			{/* Simple Header for Checkout (Distraction Free) */}
			<div className="bg-surface border-b border-border/60 py-4 mb-8">
				<Container className="flex items-center justify-between">
					<h1 className="text-2xl font-extrabold text-text">
						{isRtl ? "إتمام الشراء" : "Checkout"}
					</h1>
					<div className="flex items-center gap-2 text-text-muted">
						<Lock className="w-4 h-4" />
						<span className="text-sm font-bold">{isRtl ? "آمن 100%" : "100% Secure"}</span>
					</div>
				</Container>
			</div>

			<Container>
				<div className="flex flex-col lg:flex-row gap-8 items-start relative">
					
					{/* Left Column: Steps */}
					<div className="w-full lg:w-[55%] xl:w-[58%] flex flex-col gap-6 shrink-0">
						
						{steps.map((step) => {
							const Icon = step.icon;
							const isActive = currentStep === step.id;
							const isCompleted = currentStep > step.id;

							return (
								<div 
									key={step.id} 
									className={cn(
										"bg-surface rounded-2xl border transition-all duration-300 overflow-hidden",
										isActive ? "border-primary shadow-sm" : "border-border/50 opacity-70"
									)}
								>
									{/* Step Header */}
									<button 
										onClick={() => isCompleted && setCurrentStep(step.id)}
										disabled={!isCompleted && !isActive}
										className={cn(
											"w-full flex items-center justify-between p-6",
											isCompleted && "cursor-pointer hover:bg-surface-2",
											!isCompleted && !isActive && "cursor-not-allowed"
										)}
									>
										<div className="flex items-center gap-4">
											<div className={cn(
												"w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors",
												isActive ? "bg-primary text-white" : 
												isCompleted ? "bg-success text-white" : "bg-surface-2 text-text-muted"
											)}>
												{isCompleted ? <Icon className="w-5 h-5" /> : step.id}
											</div>
											<h3 className={cn(
												"text-lg font-bold",
												isActive ? "text-text" : "text-text-secondary"
											)}>
												{step.title[language]}
											</h3>
										</div>
										
										{isCompleted && (
											<span className="text-sm font-bold text-primary px-4 py-1.5 bg-primary/10 rounded-lg">
												{isRtl ? "تعديل" : "Edit"}
											</span>
										)}
									</button>

									{/* Step Content */}
									<div className={cn(
										"grid transition-all duration-500 ease-in-out",
										isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
									)}>
										<div className="overflow-hidden">
											<div className="border-t border-border/50">
												{step.id === 1 && <ShippingAddress onNext={handleNext} />}
												{step.id === 2 && <PaymentMethod onNext={handlePlaceOrder} onBack={handleBack} isPending={placeOrderMutation.isPending} />}
											</div>
										</div>
									</div>
								</div>
							);
						})}

					</div>

					{/* Right Column: Order Summary */}
					<div className="w-full lg:w-[45%] xl:w-[42%] z-10 lg:sticky lg:top-8">
						<OrderSummary />
					</div>

				</div>
			</Container>
		</div>
	);
};

export default Checkout;
