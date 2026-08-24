import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Package, Heart, MapPin, ShoppingCart } from "lucide-react";
import { useOrders } from "@/hooks/queries/useOrders";
import { useUserAddresses } from "@/hooks/queries/useUserAddresses";
import { useAppSelector } from "@/app/store/hooks";
import { selectWishlistCount } from "@/features/wishlist/wishlistSlice";
import { selectCartCount } from "@/features/cart/cartSlice";

export const ProfileOverview = ({ user }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const { data: responseData } = useOrders();
	const ordersCount = responseData?.data?.length || 0;

	const { data: apiAddresses = [] } = useUserAddresses();
	const addressesCount = apiAddresses.length;

	const wishlistCount = useAppSelector(selectWishlistCount);
	const cartCount = useAppSelector(selectCartCount);

	const firstName = user?.name ? user.name.split(" ")[0] : (isRtl ? "مستخدم" : "User");

	const stats = [
		{ id: "orders", icon: Package, value: ordersCount, label: { en: "Total Orders", ar: "إجمالي الطلبات" }, color: "text-primary", bg: "bg-primary/10" },
		{ id: "wishlist", icon: Heart, value: wishlistCount, label: { en: "Wishlist Items", ar: "المنتجات المفضلة" }, color: "text-danger", bg: "bg-danger/10" },
		{ id: "addresses", icon: MapPin, value: addressesCount, label: { en: "Saved Addresses", ar: "العناوين المحفوظة" }, color: "text-success", bg: "bg-success/10" },
		{ id: "cart", icon: ShoppingCart, value: cartCount, label: { en: "Shopping Cart", ar: "سلة التسوق" }, color: "text-warning", bg: "bg-warning/10" }
	];

	return (
		<div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
			
			{/* Welcome Banner */}
			<div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 flex items-center justify-between">
				<div className="flex flex-col gap-2">
					<h2 className="text-2xl font-extrabold text-text">
						{isRtl ? `مرحباً بعودتك، ${firstName}!` : `Welcome back, ${firstName}!`}
					</h2>
					<p className="text-text-secondary">
						{isRtl 
							? "يمكنك من هنا إدارة حسابك، تتبع طلباتك، وتعديل بياناتك الشخصية بسهولة."
							: "From here you can manage your account, track orders, and edit your personal info easily."}
					</p>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map(stat => {
					const Icon = stat.icon;
					return (
						<div key={stat.id} className="bg-surface rounded-2xl border border-border/50 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
							<div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
								<Icon className="w-6 h-6" />
							</div>
							<div className="flex flex-col">
								<span className="text-3xl font-extrabold text-text mb-1">{stat.value}</span>
								<span className="text-sm font-bold text-text-secondary">{stat.label[language]}</span>
							</div>
						</div>
					);
				})}
			</div>

			{/* Recent Activity */}
			<div className="bg-surface rounded-2xl border border-border/50 p-6">
				<h3 className="text-xl font-bold text-text mb-6">
					{isRtl ? "أحدث النشاطات" : "Recent Activity"}
				</h3>
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between p-4 bg-surface-2 rounded-xl border border-border/60">
						<div className="flex items-center gap-4">
							<div className="w-10 h-10 bg-success/10 text-success rounded-full flex items-center justify-center">
								<Package className="w-5 h-5" />
							</div>
							<div className="flex flex-col">
								<span className="font-bold text-text">{isRtl ? "تم توصيل الطلب #ORD-8891" : "Order #ORD-8891 Delivered"}</span>
								<span className="text-xs text-text-muted">{isRtl ? "منذ يومين" : "2 days ago"}</span>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-between p-4 bg-surface-2 rounded-xl border border-border/60">
						<div className="flex items-center gap-4">
							<div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
								<Heart className="w-5 h-5" />
							</div>
							<div className="flex flex-col">
								<span className="font-bold text-text">{isRtl ? "تمت إضافة منتج للمفضلة" : "Item added to wishlist"}</span>
								<span className="text-xs text-text-muted">{isRtl ? "منذ أسبوع" : "1 week ago"}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
};

export default ProfileOverview;
