import React, { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlobalDrawers from "@/components/layout/GlobalDrawers";
import GlobalModals from "@/components/layout/GlobalModals";
import Toaster from "@/components/layout/Toaster";
import { useAppDispatch } from "@/app/store/hooks";
import { fetchCart } from "@/features/cart/cartSlice";
import { fetchWishlist } from "@/features/wishlist/wishlistSlice";

export const AppLayout = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchCart());
		dispatch(fetchWishlist());
	}, [dispatch]);

	return (
		<div className="min-h-screen flex flex-col bg-background text-text transition-colors duration-normal">
			<ScrollRestoration />
			<Header />
			<main className="flex-grow">
				<Outlet />
			</main>
			<Footer />
			<GlobalDrawers />
			<GlobalModals />
			<Toaster />
		</div>
	);
};

export default AppLayout;
