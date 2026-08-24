import { Navigate } from "react-router-dom";
import { lazy } from "react";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import EmptyLayout from "@/layouts/EmptyLayout";
import LanguageGuard from "./LanguageGuard";
import RootRedirect from "./RootRedirect";

// App Pages
const Home = lazy(() => import("@/pages/Home"));
const ProductCardDemo = lazy(() => import("@/pages/ProductCardDemo"));
import About from "@/pages/About";
import Products from "@/pages/Products/index";
import ProductDetails from "@/pages/ProductDetails/index";
import Category from "@/pages/Category/index";
import Categories from "@/pages/Categories/index";
import Brands from "@/pages/Brands";
import Cart from "@/pages/Cart/index";
import Checkout from "@/pages/Checkout/index";
import Wishlist from "@/pages/Wishlist/index";
import Account from "@/pages/Account/index";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import BestSellers from "@/pages/BestSellers";
import Blogs from "@/pages/Blogs/index";
import BlogDetails from "@/pages/Blogs/BlogDetails";
import FlashDeals from "@/pages/FlashDeals";

// Auth Pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";

// Status / Empty Pages
import NotFound from "@/pages/NotFound";
import Maintenance from "@/pages/Maintenance";
import ResetPassword from "@/pages/ResetPassword";
import VerifyOtp from "@/pages/VerifyOtp";

// Auth Guards
import { ProtectedRoute, GuestRoute } from "@/features/auth";

import { ROUTES } from "./paths";

export const routes = [
	{
		path: "/",
		element: <RootRedirect />,
	},
	{
		path: "/:lang",
		element: <LanguageGuard />,
		children: [
			// App Layout Routes
			{
				element: <AppLayout />,
				children: [
					{
						index: true,
						element: <Home />,
					},
					{
						path: ROUTES.PRODUCTS.substring(1),
						element: <Products />,
					},
					{
						path: ROUTES.PRODUCT_DETAILS.substring(1),
						element: <ProductDetails />,
					},
					{
						path: "category/:slug",
						element: <Category />,
					},
					{
						path: "category/*",
						element: <Category />,
					},
					{
						path: "categories",
						element: <Categories />,
					},
					{
						path: "categories/*",
						element: <Categories />,
					},
					{
						path: ROUTES.BRANDS.substring(1),
						element: <Brands />,
					},
					{
						path: ROUTES.CART.substring(1),
						element: <Cart />,
					},
					{
						path: ROUTES.WISHLIST.substring(1),
						element: <Wishlist />,
					},
					{
						path: ROUTES.ABOUT.substring(1),
						element: <About />,
					},
					{
						path: ROUTES.CONTACT.substring(1),
						element: <Contact />,
					},
					{
						path: ROUTES.FAQ.substring(1),
						element: <FAQ />,
					},
					{
						path: ROUTES.PRIVACY.substring(1),
						element: <Privacy />,
					},
					{
						path: ROUTES.TERMS.substring(1),
						element: <Terms />,
					},
					{
						path: ROUTES.BEST_SELLERS.substring(1),
						element: <BestSellers />,
					},
					{
						path: ROUTES.BLOGS.substring(1),
						element: <Blogs />,
					},
					{
						path: ROUTES.BLOG_DETAILS.substring(1),
						element: <BlogDetails />,
					},
					{
						path: ROUTES.FLASH_DEALS.substring(1),
						element: <FlashDeals />,
					},
					{
						path: ROUTES.OFFERS.substring(1),
						element: <Category isOffersRoute={true} />,
					},
					// Protected Routes directly accessible (Guards removed temporarily)
					{
						path: ROUTES.CHECKOUT.substring(1),
						element: (
							<ProtectedRoute>
								<Checkout />
							</ProtectedRoute>
						),
					},
					{
						path: ROUTES.ACCOUNT.substring(1),
						element: (
							<ProtectedRoute>
								<Account />
							</ProtectedRoute>
						),
					},
				],
			},
			// Auth Layout Routes (Direct access, GuestRoute integrated)
			{
				path: "auth",
				element: (
					<GuestRoute>
						<AuthLayout />
					</GuestRoute>
				),
				children: [
					{
						path: ROUTES.LOGIN.replace("/auth/", ""),
						element: <Login />,
					},
					{
						path: ROUTES.REGISTER.replace("/auth/", ""),
						element: <Register />,
					},
					{
						path: ROUTES.FORGOT_PASSWORD.replace("/auth/", ""),
						element: <ForgotPassword />,
					},
					{
						path: ROUTES.VERIFY_OTP.replace("/auth/", ""),
						element: <VerifyOtp />,
					},
					{
						path: ROUTES.RESET_PASSWORD.replace("/auth/", ""),
						element: <ResetPassword />,
					},
				],
			},
			// Demo Routes
			{
				path: "product-card-demo",
				element: <ProductCardDemo />,
			},
			// Empty Layout Routes
			{
				element: <EmptyLayout />,
				children: [
					{
						path: ROUTES.NOT_FOUND.substring(1),
						element: <NotFound />,
					},
					{
						path: ROUTES.MAINTENANCE.substring(1),
						element: <Maintenance />,
					},
					{
						path: "*",
						element: <Navigate to={ROUTES.NOT_FOUND} replace />,
					},
				],
			},
		]
	},
	{
		path: "*",
		element: <RootRedirect /> // Catch all non-prefixed routes and redirect
	}
];

export default routes;
