import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import HeaderActions from "./HeaderActions";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { Icon } from "@/components/ui/Icon";
import { useSelector } from "react-redux";
import { useLogout } from "@/features/auth";
import { cn } from "@/lib/utils";

/**
 * MainHeader Component
 * Central header block containing Logo, SearchBar, Account, and HeaderActions.
 * Visible on md+ screens. Mobile has its own header.
 * Supports RTL/LTR and Light/Dark.
 */
export const MainHeader = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const { logout } = useLogout();

	return (
		<div className="w-full bg-surface border-b border-border py-3 hidden md:block relative z-50">
			<Container>
				<div className="flex items-center gap-6">
					{/* Logo */}
					<Logo />

					{/* Search Bar — fills the center */}
					<div className="flex-1">
						<SearchBar />
					</div>

					{/* Login / Register or Profile (Moved down from AnnouncementBar) */}
					{isAuthenticated ? (
						<div className="relative group z-50">
							<LocalizedLink
								to="/account"
								className="flex items-center gap-2 font-bold text-text hover:text-primary transition-colors py-2"
							>
								<Icon name="User" size="md" className="text-primary shrink-0" />
								<div className="flex flex-col text-start">
									<span className="text-[10px] text-text-muted font-normal leading-none">
										{isRtl ? "مرحباً بك" : "Welcome"}
									</span>
									<span className="text-xs font-bold text-text whitespace-nowrap">
										{user?.name || (isRtl ? "حسابي" : "My Account")}
									</span>
								</div>
							</LocalizedLink>

							{/* Dropdown Menu */}
							<div className={cn(
								"absolute top-full opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 w-48 bg-surface border border-border rounded-xl shadow-lg shadow-black/5 overflow-hidden flex flex-col z-[100]",
								isRtl ? "left-0" : "right-0"
							)}>
								<div className="p-3 border-b border-border/50">
									<p className="text-xs font-bold text-text truncate">{user?.name}</p>
									<p className="text-[10px] text-text-muted truncate">{user?.email || user?.phone}</p>
								</div>
								<div className="flex flex-col p-1">
									<LocalizedLink to="/account?tab=overview" className="flex items-center gap-2 p-2 hover:bg-surface-2 rounded-lg text-text-secondary hover:text-primary transition-colors text-xs font-semibold">
										<Icon name="User" size="sm" />
										{isRtl ? "الملف الشخصي" : "Profile"}
									</LocalizedLink>
									<LocalizedLink to="/account?tab=orders" className="flex items-center gap-2 p-2 hover:bg-surface-2 rounded-lg text-text-secondary hover:text-primary transition-colors text-xs font-semibold">
										<Icon name="Package" size="sm" />
										{isRtl ? "الطلبات" : "Orders"}
									</LocalizedLink>
									<LocalizedLink to="/account?tab=wishlist" className="flex items-center gap-2 p-2 hover:bg-surface-2 rounded-lg text-text-secondary hover:text-primary transition-colors text-xs font-semibold">
										<Icon name="Heart" size="sm" />
										{isRtl ? "المفضلة" : "Wishlist"}
									</LocalizedLink>
								</div>
								<div className="p-1 border-t border-border/50">
									<button 
										onClick={() => logout()} 
										className="flex w-full items-center gap-2 p-2 hover:bg-danger/10 text-danger rounded-lg transition-colors text-xs font-bold cursor-pointer"
									>
										<Icon name="LogOut" size="sm" />
										{isRtl ? "تسجيل الخروج" : "Logout"}
									</button>
								</div>
							</div>
						</div>
					) : (
						<LocalizedLink
							to="/auth/login"
							className="flex items-center gap-2 text-text hover:text-primary transition-colors"
						>
							<Icon name="User" size="md" className="text-primary shrink-0" />
							<div className="flex flex-col text-start leading-tight">
								<span className="text-[10px] text-text-muted font-normal">
									{isRtl ? "مرحباً بك" : "Welcome"}
								</span>
								<span className="text-xs font-bold text-text">
									{isRtl ? "تسجيل الدخول" : "Sign In"}
								</span>
							</div>
						</LocalizedLink>
					)}

					{/* Action Buttons (Cart, Wishlist, etc.) */}
					<HeaderActions />
				</div>
			</Container>
		</div>
	);
};

export default MainHeader;
