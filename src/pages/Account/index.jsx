import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useLanguage } from "@/app/providers/I18nProvider";
import { User, Package, MapPin, Heart, Settings as SettingsIcon, LogOut, FileDiff } from "lucide-react";
import { cn } from "@/lib/utils";

// Components
import ProfileOverview from "./components/ProfileOverview";
import Orders from "./components/Orders";
import Addresses from "./components/Addresses";
import Settings from "./components/Settings";
import OrderDetails from "./components/OrderDetails";
import { useLogout, useCurrentUser } from "@/features/auth";
import { useProfile } from "@/features/user";


const Account = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const { logout } = useLogout();
	
	// Fetch user profile from API and sync to Redux
	useProfile();
	const { user } = useCurrentUser();
	
	const activeTab = searchParams.get("tab") || "overview";
	const orderId = searchParams.get("orderId");

	const tabs = [
		{ id: "overview", label: { en: "Profile", ar: "الملف الشخصي" }, icon: User },
		{ id: "orders", label: { en: "Orders", ar: "الطلبات" }, icon: Package },
		{ id: "addresses", label: { en: "Addresses", ar: "العناوين" }, icon: MapPin },
		{ id: "wishlist", label: { en: "Wishlist", ar: "المفضلة" }, icon: Heart, isLink: true, path: "/wishlist" },
		{ id: "settings", label: { en: "Settings", ar: "الإعدادات" }, icon: SettingsIcon },
	];

	const handleTabChange = (tab) => {
		if (tab.isLink) {
			navigate(tab.path);
		} else {
			setSearchParams({ tab: tab.id });
		}
	};

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Account", ar: "حسابي" } }
	];

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			
			{/* Header / Title Area */}
			<div className="bg-surface border-b border-border/60 py-4 mb-4 md:py-8 md:mb-8 relative z-10">
				<Container>
					<div className="hidden md:block">
						<Breadcrumb items={breadcrumbItems} className="mb-4" />
					</div>
					<h1 className="text-xl md:text-4xl font-extrabold text-text tracking-tight">
						{isRtl ? "حسابي" : "My Account"}
					</h1>
				</Container>
			</div>

			<Container>
				<div className="flex flex-col md:flex-row gap-8 items-start">
					
					{/* Sidebar (Desktop only) */}
					<div className="hidden md:block w-64 lg:w-72 shrink-0 bg-surface rounded-2xl border border-border/50 p-4 sticky top-24 shadow-sm">
						
						{/* User Mini Profile */}
						<div className="flex items-center gap-4 mb-6 p-2">
							<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl shrink-0">
								{user?.name ? user.name.charAt(0).toUpperCase() : "U"}
							</div>
							<div className="flex flex-col overflow-hidden">
								<span className="font-bold text-text truncate">{user?.name || "User"}</span>
								<span className="text-xs text-text-muted truncate">{user?.email || ""}</span>
							</div>
						</div>

						<hr className="border-border/50 mb-4" />

						<nav className="flex flex-col gap-1">
							{tabs.map(tab => {
								const Icon = tab.icon;
								const isActive = activeTab === tab.id || (tab.id === "orders" && activeTab === "order-details");
								return (
									<button
										key={tab.id}
										onClick={() => handleTabChange(tab)}
										className={cn(
											"flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm text-start cursor-pointer",
											isActive 
												? "bg-primary text-white shadow-md shadow-primary/20" 
												: "text-text-secondary hover:bg-surface-2 hover:text-primary"
										)}
									>
										<Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-text-muted")} />
										{tab.label[language]}
									</button>
								);
							})}
						</nav>

						<hr className="border-border/50 my-4" />

						<button 
							onClick={async () => {
								await logout();
								navigate(`/${language}`);
							}}
							className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm text-danger hover:bg-danger/10 w-full text-start cursor-pointer"
						>
							<LogOut className="w-5 h-5" />
							{isRtl ? "تسجيل الخروج" : "Logout"}
						</button>
					</div>

					{/* Mobile Navigation Bar */}
					<div className="w-full md:hidden flex flex-col gap-4 mb-6">
						{/* User Info Bar */}
						<div className="flex items-center justify-between bg-surface border border-border/50 rounded-2xl p-4 shadow-sm">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg shrink-0">
									{user?.name ? user.name.charAt(0).toUpperCase() : "U"}
								</div>
								<div className="flex flex-col min-w-0">
									<span className="font-bold text-text truncate text-sm">{user?.name || "User"}</span>
									<span className="text-xs text-text-muted truncate">{user?.email || ""}</span>
								</div>
							</div>
							<button 
								onClick={async () => {
									await logout();
									navigate(`/${language}`);
								}}
								className="p-2 rounded-xl text-danger hover:bg-danger/10 transition-colors cursor-pointer"
								aria-label={isRtl ? "تسجيل الخروج" : "Logout"}
							>
								<LogOut className="w-5 h-5" />
							</button>
						</div>

						{/* Horizontal Scrolling Tabs */}
						<div className="w-full overflow-x-auto py-1 scrollbar-none flex items-center gap-2">
							{tabs.map(tab => {
								const Icon = tab.icon;
								const isActive = activeTab === tab.id || (tab.id === "orders" && activeTab === "order-details");
								return (
									<button
										key={tab.id}
										onClick={() => handleTabChange(tab)}
										className={cn(
											"flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all border snap-start cursor-pointer select-none",
											isActive 
												? "bg-primary text-white border-primary shadow-sm shadow-primary/15" 
												: "bg-surface text-text-secondary border-border/60 hover:bg-surface-2"
										)}
									>
										<Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-text-muted")} />
										<span>{tab.label[language]}</span>
									</button>
								);
							})}
						</div>
					</div>

					{/* Main Content Area */}
					<div className="flex-1 w-full min-w-0">
						{activeTab === "overview" && <ProfileOverview user={user} />}
						{activeTab === "orders" && (
							<Orders onViewOrder={(id) => setSearchParams({ tab: "order-details", orderId: id })} />
						)}
						{activeTab === "order-details" && (
							<OrderDetails orderId={orderId} onBack={() => setSearchParams({ tab: "orders" })} />
						)}
						{activeTab === "addresses" && <Addresses />}
						{activeTab === "settings" && <Settings />}
					</div>

				</div>
			</Container>
		</div>
	);
};

export default Account;
