import LocalizedLink from "@/components/ui/LocalizedLink";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { navigationLinks } from "@/config/navigation";
import {
	Menu,
	X,
	Search,
	ShoppingCart,
	Heart,
	User,
	ChevronRight,
	ChevronDown,
	Package,
	LogOut,
	Sun,
	Moon,
	Monitor,
	Globe,
	Home,
	Zap,
	Percent,
	Info,
	PhoneCall,
	Stethoscope
} from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "./Logo";
import { useTheme } from "@/app/providers/ThemeProvider";
import { THEMES } from "@/constants/theme";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/app/store/hooks";
import { selectCartCount } from "@/features/cart/cartSlice";
import { selectWishlistCount } from "@/features/wishlist/wishlistSlice";
import { useLogout } from "@/features/auth";

/**
 * Helper to resolve appropriate icons for menu items
 */
const getLinkIcon = (id) => {
	switch (id) {
		case "home":
			return Home;
		case "flash-deals":
			return Zap;
		case "offers":
			return Percent;
		case "about":
			return Info;
		case "contact":
			return PhoneCall;
		case "consultation":
			return Stethoscope;
		default:
			return ChevronRight;
	}
};

/**
 * MobileHeader Component
 * Mobile-first responsive header with:
 * - Hamburger menu toggle
 * - Centered logo
 * - Cart icon
 * - Full-screen slide-in drawer with navigation, search, switchers
 * Visible only on screens < md.
 * Supports RTL/LTR and Light/Dark.
 */

export const MobileHeader = () => {
	const { language, toggleLanguage } = useLanguage();
	const { theme, toggleTheme } = useTheme();
	const isRtl = language === "ar";
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const cartCount = useAppSelector(selectCartCount);
	const wishlistCount = useAppSelector(selectWishlistCount);
	const { isAuthenticated, user } = useAppSelector((state) => state.auth);
	const { logout } = useLogout();
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

	const handleLanguageSwitch = () => {
		const newLang = language === "ar" ? "en" : "ar";
		toggleLanguage();
		
		const pathSegments = location.pathname.split('/').filter(Boolean);
		if (pathSegments.length > 0 && ["ar", "en"].includes(pathSegments[0])) {
			pathSegments[0] = newLang;
		} else {
			pathSegments.unshift(newLang);
		}
		
		const newPath = '/' + pathSegments.join('/') + location.search + location.hash;
		navigate(newPath);
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/${language}/products?search=${encodeURIComponent(searchQuery.trim())}`);
			setIsOpen(false);
		}
	};

	// Lock body scroll when drawer is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			document.body.style.paddingRight = "var(--removed-body-scroll-bar-size, 0px)";
		} else {
			document.body.style.overflow = "";
			document.body.style.paddingRight = "";
		}
		return () => {
			document.body.style.overflow = "";
			document.body.style.paddingRight = "";
		};
	}, [isOpen]);

	// Close on escape key or route change
	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === "Escape") setIsOpen(false);
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, []);

	useEffect(() => {
		setIsOpen(false);
	}, [location.pathname]);

	const close = useCallback(() => setIsOpen(false), []);

	const themeIcons = {
		[THEMES.LIGHT]: Sun,
		[THEMES.DARK]: Moon,
		[THEMES.SYSTEM]: Monitor,
	};
	const ThemeIcon = themeIcons[theme] || Monitor;

	return (
		<div className="w-full bg-surface border-b border-border md:hidden sticky top-0 z-[120]">
			<Container>
				<div className="flex items-center justify-between py-2.5 gap-3">
					{/* Menu Toggle */}
					<button
						onClick={() => setIsOpen(true)}
						className="p-2 rounded-xl text-text-secondary hover:text-primary hover:bg-surface-2 transition-all active:scale-95 cursor-pointer"
						aria-label={isRtl ? "فتح القائمة" : "Open menu"}
					>
						<Menu className="w-5 h-5" />
					</button>

					{/* Logo */}
					<Logo />

					{/* Right Actions - Hidden as requested */}
					{false && (
						<div className="flex items-center gap-0.5">
							<LocalizedLink
								to="/cart"
								className="relative p-2 rounded-xl text-text-secondary hover:text-primary hover:bg-surface-2 transition-all active:scale-95"
								aria-label={isRtl ? "طلبات التسعير" : "Quote"}
							>
								<ShoppingCart className="w-5 h-5" />
								{cartCount > 0 && (
									<span className="absolute top-0.5 end-0.5 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-secondary text-white text-[10px] font-bold leading-none">
										{cartCount}
									</span>
								)}
							</LocalizedLink>
						</div>
					)}
				</div>
			</Container>

			{/* ── Drawer Overlay ── */}
			<div
				className={cn(
					"fixed inset-0 z-[1000] transition-opacity duration-300",
					isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
				)}
			>
				{/* Backdrop with Blur */}
				<div 
					className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-all duration-300 touch-none" 
					onClick={close} 
				/>

				{/* Drawer Panel */}
				<div
					className={cn(
						"fixed inset-y-0 w-[85%] max-w-sm bg-surface border-border flex flex-col shadow-2xl transition-transform duration-300 ease-in-out z-50",
						isRtl ? "right-0 border-l" : "left-0 border-r",
						isOpen
							? "translate-x-0"
							: isRtl
								? "translate-x-full"
								: "-translate-x-full"
					)}
				>
					{/* Drawer Header */}
					<div className="flex items-center justify-between p-4 border-b border-border bg-surface">
						<Logo />
						<button
							onClick={close}
							className="p-2 rounded-full text-text-muted hover:text-text hover:bg-surface-2 transition-all active:scale-90 cursor-pointer"
							aria-label={isRtl ? "إغلاق" : "Close"}
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					{/* Drawer Search */}
					<div className="p-4 border-b border-border bg-surface">
						<form onSubmit={handleSearchSubmit} className="flex items-center gap-2 bg-surface-2 rounded-xl px-3.5 py-2.5 border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
							<Search className="w-4 h-4 text-text-muted shrink-0" />
							<input
								type="search"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder={isRtl ? "ابحث عن المنتجات..." : "Search products..."}
								className="flex-1 bg-transparent text-sm outline-none text-text placeholder:text-text-muted/50"
							/>
						</form>
					</div>

					{/* Scrollable Navigation Area */}
					<nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4" aria-label="Mobile navigation">
						{/* Welcome Card & Profile Options */}
						{isAuthenticated ? (
							<div className="flex flex-col gap-1.5">
								<button
									onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
									className="w-full text-start px-3.5 py-4 rounded-2xl bg-surface-2 border border-border/40 flex items-center justify-between hover:bg-surface-3 transition-colors cursor-pointer"
								>
									<div className="flex items-center gap-3 min-w-0">
										<div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
											<User className="w-5 h-5" />
										</div>
										<div className="flex flex-col min-w-0">
											<span className="text-xs font-bold text-text-muted">
												{isRtl ? "مرحباً بك" : "Welcome"}
											</span>
											<span className="text-sm font-extrabold text-text truncate">
												{user?.name || (isRtl ? "العميل" : "Customer")}
											</span>
										</div>
									</div>
									<ChevronDown className={cn("w-4 h-4 text-text-secondary transition-transform", isProfileMenuOpen && "rotate-180")} />
								</button>

								{/* Profile Options List */}
								{isProfileMenuOpen && (
									<div className="mx-2 bg-surface-2/40 border border-border/40 rounded-xl overflow-hidden flex flex-col p-1">
										<LocalizedLink 
											to="/account?tab=overview" 
											onClick={close}
											className="flex items-center gap-3 p-3 hover:bg-surface-2 rounded-lg text-text-secondary hover:text-primary transition-colors text-sm font-bold"
										>
											<User className="w-4 h-4 text-primary" />
											{isRtl ? "الملف الشخصي" : "Profile"}
										</LocalizedLink>
										<LocalizedLink 
											to="/account?tab=orders" 
											onClick={close}
											className="flex items-center gap-3 p-3 hover:bg-surface-2 rounded-lg text-text-secondary hover:text-primary transition-colors text-sm font-bold"
										>
											<Package className="w-4 h-4 text-primary" />
											{isRtl ? "الطلبات" : "Orders"}
										</LocalizedLink>
										{/* Wishlist - Hidden as requested */}
										{false && (
											<LocalizedLink 
												to="/wishlist" 
												onClick={close}
												className="flex items-center gap-3 p-3 hover:bg-surface-2 rounded-lg text-text-secondary hover:text-primary transition-colors text-sm font-bold"
											>
												<Heart className="w-4 h-4 text-primary" />
												{isRtl ? "المفضلة" : "Wishlist"}
											</LocalizedLink>
										)}
										<button 
											onClick={() => {
												logout();
												close();
											}} 
											className="flex w-full items-center gap-3 p-3 hover:bg-danger/10 text-danger rounded-lg transition-colors text-sm font-extrabold cursor-pointer border-t border-border/30 mt-1"
										>
											<LogOut className="w-4 h-4" />
											{isRtl ? "تسجيل الخروج" : "Logout"}
										</button>
									</div>
								)}
							</div>
						) : (
							<LocalizedLink
								to="/auth/login"
								onClick={close}
								className="w-full px-3.5 py-4 rounded-2xl bg-surface-2 border border-border/40 flex items-center gap-3 hover:bg-surface-3 transition-colors"
							>
								<div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
									<User className="w-5 h-5" />
								</div>
								<div className="flex flex-col min-w-0">
									<span className="text-xs font-bold text-text-muted">
										{isRtl ? "مرحباً بك" : "Welcome"}
									</span>
									<span className="text-sm font-bold text-text truncate">
										{isRtl ? "تسجيل الدخول / إنشاء حساب" : "Login / Register"}
									</span>
								</div>
							</LocalizedLink>
						)}

						{/* Links list */}
						<div className="space-y-1">
							{navigationLinks.map((link) => {
								const linkName = link.name[language] || link.name.en;
								const IconComponent = getLinkIcon(link.id);

								return (
									<LocalizedLink
										key={link.id || link.path}
										to={link.path}
										onClick={close}
										className={cn(
											"flex items-center gap-3.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 select-none",
											link.isOffer
												? "text-secondary hover:bg-secondary/5"
												: "text-text-secondary hover:text-primary hover:bg-primary/5"
										)}
									>
										{IconComponent && <IconComponent className="w-4.5 h-4.5 shrink-0 opacity-80" />}
										<span className="flex-1 text-start">{linkName}</span>
										{link.badge && (
											<span className={cn(
												"px-2 py-0.5 text-[9px] font-extrabold rounded-full uppercase tracking-wider shrink-0",
												link.badgeVariant === "danger" 
													? "bg-danger/10 text-danger border border-danger/20" 
													: "bg-success/10 text-success border border-success/20"
											)}>
												{link.badge[language]}
											</span>
										)}
										<ChevronRight className={cn("w-4 h-4 opacity-30 shrink-0", isRtl && "rotate-180")} />
									</LocalizedLink>
								);
							})}
						</div>
					</nav>

					{/* Drawer Footer — Switchers & Actions */}
					<div className="p-4 border-t border-border bg-surface-2/40 space-y-2.5">
						{/* Quick Actions Row - Hidden as requested */}
						{false && (
							<div className="grid grid-cols-2 gap-2">
								<LocalizedLink
									to="/wishlist"
									onClick={close}
									className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface border border-border/40 text-text-secondary hover:text-primary text-xs font-semibold shadow-sm transition-all relative"
								>
									<Heart className="w-4 h-4 text-danger/80" />
									<span>{isRtl ? "المفضلة" : "Wishlist"}</span>
									{wishlistCount > 0 && (
										<span className="flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-primary text-white text-[9px] font-bold leading-none">
											{wishlistCount}
										</span>
									)}
								</LocalizedLink>
								<LocalizedLink
									to="/cart"
									onClick={close}
									className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface border border-border/40 text-text-secondary hover:text-primary text-xs font-semibold shadow-sm transition-all relative"
								>
									<ShoppingCart className="w-4 h-4 text-secondary/80" />
									<span>{isRtl ? "طلبات التسعير" : "Quote"}</span>
									{cartCount > 0 && (
										<span className="flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-secondary text-white text-[9px] font-bold leading-none">
											{cartCount}
										</span>
									)}
								</LocalizedLink>
							</div>
						)}

						{/* Language & Theme Row */}
						<div className="grid grid-cols-2 gap-2">
							<button
								onClick={handleLanguageSwitch}
								className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface border border-border/40 text-text-secondary hover:text-primary text-xs font-semibold shadow-sm transition-all cursor-pointer"
							>
								<Globe className="w-4 h-4 text-secondary" />
								{isRtl ? "English" : "العربية"}
							</button>
							<button
								onClick={toggleTheme}
								className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface border border-border/40 text-text-secondary hover:text-primary text-xs font-semibold shadow-sm transition-all cursor-pointer"
							>
								<ThemeIcon className="w-4 h-4 text-warning" />
								<span>
									{theme === "dark" 
										? (isRtl ? "داكن" : "Dark") 
										: theme === "light" 
											? (isRtl ? "فاتح" : "Light") 
											: (isRtl ? "النظام" : "System")}
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MobileHeader;
