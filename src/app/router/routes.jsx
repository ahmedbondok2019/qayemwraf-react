import { Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import EmptyLayout from "@/layouts/EmptyLayout";
import LanguageGuard from "./LanguageGuard";
import RootRedirect from "./RootRedirect";
import { ProtectedRoute, GuestRoute } from "@/features/auth";
import { ROUTES } from "./paths";

// Minimal, smooth loading placeholder for lazy routes
const PageLoader = () => (
	<div className="min-h-[50vh] flex items-center justify-center">
		<div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
	</div>
);

const withSuspense = (Component) => (
	<Suspense fallback={<PageLoader />}>
		<Component />
	</Suspense>
);

import Home from "@/pages/Home";

// App Pages (Code-split with React.lazy)
const About = lazy(() => import("@/pages/About"));
const Products = lazy(() => import("@/pages/Products/index"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails/index"));
const Category = lazy(() => import("@/pages/Category/index"));
const Categories = lazy(() => import("@/pages/Categories/index"));
const Brands = lazy(() => import("@/pages/Brands"));
const Cart = lazy(() => import("@/pages/Cart/index"));
const Checkout = lazy(() => import("@/pages/Checkout/index"));
const Wishlist = lazy(() => import("@/pages/Wishlist/index"));
const Account = lazy(() => import("@/pages/Account/index"));
const Contact = lazy(() => import("@/pages/Contact"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const BestSellers = lazy(() => import("@/pages/BestSellers"));
const Blogs = lazy(() => import("@/pages/Blogs/index"));
const BlogDetails = lazy(() => import("@/pages/Blogs/BlogDetails"));
const Projects = lazy(() => import("@/pages/Projects/index"));
const ProjectDetails = lazy(() => import("@/pages/ProjectDetails/index"));
const FlashDeals = lazy(() => import("@/pages/FlashDeals"));

// Auth Pages
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const VerifyOtp = lazy(() => import("@/pages/VerifyOtp"));

// Status / Empty Pages
const NotFound = lazy(() => import("@/pages/NotFound"));
const Maintenance = lazy(() => import("@/pages/Maintenance"));
const ProductCardDemo = lazy(() => import("@/pages/ProductCardDemo"));

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
						element: withSuspense(Products),
					},
					{
						path: ROUTES.PRODUCT_DETAILS.substring(1),
						element: withSuspense(ProductDetails),
					},
					{
						path: "category/:slug",
						element: withSuspense(Category),
					},
					{
						path: "category/*",
						element: withSuspense(Category),
					},
					{
						path: "categories",
						element: withSuspense(Categories),
					},
					{
						path: "categories/*",
						element: withSuspense(Categories),
					},
					{
						path: ROUTES.BRANDS.substring(1),
						element: withSuspense(Brands),
					},
					{
						path: ROUTES.CART.substring(1),
						element: withSuspense(Cart),
					},
					{
						path: ROUTES.WISHLIST.substring(1),
						element: withSuspense(Wishlist),
					},
					{
						path: ROUTES.ABOUT.substring(1),
						element: withSuspense(About),
					},
					{
						path: "about-us",
						element: withSuspense(About),
					},
					{
						path: ROUTES.CONTACT.substring(1),
						element: withSuspense(Contact),
					},
					{
						path: ROUTES.FAQ.substring(1),
						element: withSuspense(FAQ),
					},
					{
						path: ROUTES.PRIVACY.substring(1),
						element: withSuspense(Privacy),
					},
					{
						path: ROUTES.TERMS.substring(1),
						element: withSuspense(Terms),
					},
					{
						path: ROUTES.BEST_SELLERS.substring(1),
						element: withSuspense(BestSellers),
					},
					{
						path: ROUTES.BLOGS.substring(1),
						element: withSuspense(Blogs),
					},
					{
						path: ROUTES.BLOG_DETAILS.substring(1),
						element: withSuspense(BlogDetails),
					},
					{
						path: ROUTES.PROJECTS.substring(1),
						element: withSuspense(Projects),
					},
					{
						path: ROUTES.PROJECT_DETAILS.substring(1),
						element: withSuspense(ProjectDetails),
					},
					{
						path: ROUTES.FLASH_DEALS.substring(1),
						element: withSuspense(FlashDeals),
					},
					{
						path: ROUTES.OFFERS.substring(1),
						element: <Category isOffersRoute={true} />,
					},
					// Protected Routes directly accessible
					{
						path: ROUTES.CHECKOUT.substring(1),
						element: (
							<ProtectedRoute>
								{withSuspense(Checkout)}
							</ProtectedRoute>
						),
					},
					{
						path: ROUTES.ACCOUNT.substring(1),
						element: (
							<ProtectedRoute>
								{withSuspense(Account)}
							</ProtectedRoute>
						),
					},
				],
			},
			// Auth Layout Routes
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
						element: withSuspense(Login),
					},
					{
						path: ROUTES.REGISTER.replace("/auth/", ""),
						element: withSuspense(Register),
					},
					{
						path: ROUTES.FORGOT_PASSWORD.replace("/auth/", ""),
						element: withSuspense(ForgotPassword),
					},
					{
						path: ROUTES.VERIFY_OTP.replace("/auth/", ""),
						element: withSuspense(VerifyOtp),
					},
					{
						path: ROUTES.RESET_PASSWORD.replace("/auth/", ""),
						element: withSuspense(ResetPassword),
					},
				],
			},
			// Demo Routes
			{
				path: "product-card-demo",
				element: withSuspense(ProductCardDemo),
			},
			// Empty Layout Routes
			{
				element: <EmptyLayout />,
				children: [
					{
						path: ROUTES.NOT_FOUND.substring(1),
						element: withSuspense(NotFound),
					},
					{
						path: ROUTES.MAINTENANCE.substring(1),
						element: withSuspense(Maintenance),
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
		element: <RootRedirect />
	}
];

export default routes;
