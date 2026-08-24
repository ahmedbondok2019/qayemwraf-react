import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import LanguageSwitcher from "./LanguageSwitcher";
import { Icon } from "@/components/ui/Icon";
import { useSelector } from "react-redux";
import { useLogout } from "@/features/auth";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/queries/useSettings";

/**
 * AnnouncementBar Component
 * Matches reference design exactly: Light background, Truck icon, Location, Hotline, Language, and Login.
 */
export const AnnouncementBar = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const { logout } = useLogout();
	const { data: settings } = useSettings();

	const phone = settings?.phone || "01203036736";
	// Formatted phone: replace spaces/special characters or format for display if needed
	const formattedPhone = phone;

	return (
		<div className="w-full bg-surface-2 border-b border-divider text-text-secondary text-xs select-none relative z-[110]">
			<Container>
				<div className="flex items-center justify-between py-2.5 gap-4">
					{/* Left: Why Choose Us Announcement */}
					<div className="flex items-center gap-2 font-medium">
						<Icon name="ShieldCheck" size="sm" className="text-primary shrink-0" />
						<span className="line-clamp-1">
							{settings?.why_choose_us?.subtitle || settings?.why_choose_us?.title || (isRtl
								? "نحن نضع معايير جديدة للموثوقية والأمان في توفير أنظمة وحلول التخزين المعدني"
								: "We set new standards of reliability and safety in providing metal storage solutions")}
						</span>
					</div>

					{/* Right: Location + Hotline + Language + Auth */}
					<div className="flex items-center gap-4 lg:gap-6">
						{/* Deliver To */}
						<div className="hidden lg:flex items-center gap-2 text-text-secondary">
							<Icon name="MapPin" size="sm" className="text-primary shrink-0" />
							<div className="flex flex-col leading-[1.2]">
								<span className="text-[10px] text-text-muted font-normal">
									{isRtl ? "التوصيل إلى" : "Deliver to"}
								</span>
								<span className="font-semibold text-text">
									{isRtl ? "القاهرة، مصر" : "Cairo, Egypt"}
								</span>
							</div>
						</div>

						<span className="hidden lg:block w-px h-5 bg-divider" />

						{/* Hotline */}
						<a
							href={`tel:${phone}`}
							className="hidden lg:flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
						>
							<Icon name="Phone" size="sm" className="text-primary shrink-0" />
							<div className="flex flex-col leading-[1.2]">
								<span className="text-[10px] text-text-muted font-normal">
									{isRtl ? "تحتاج مساعدة؟" : "Need Help?"}
								</span>
								<span className="font-semibold text-text">{formattedPhone}</span>
							</div>
						</a>

						<span className="hidden lg:block w-px h-5 bg-divider" />

						{/* Language Switcher */}
						<LanguageSwitcher />

						<span className="hidden sm:block w-px h-5 bg-divider" />

						{/* Login / Register or Profile */}
						{isAuthenticated ? (
							<div className="relative group z-50">
								<LocalizedLink
									to="/account"
									className="flex items-center gap-2 font-bold text-primary hover:text-primary-hover transition-colors py-2"
								>
									<Icon name="User" size="sm" className="text-primary shrink-0" />
									<span className="hidden sm:inline">
										{user?.name || (isRtl ? "حسابي" : "My Account")}
									</span>
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
								className="flex items-center gap-2 font-medium hover:text-primary transition-colors"
							>
								<Icon name="User" size="sm" className="text-primary shrink-0" />
								<span className="hidden sm:inline">
									{isRtl ? "الدخول / التسجيل" : "Login / Register"}
								</span>
							</LocalizedLink>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default AnnouncementBar;
