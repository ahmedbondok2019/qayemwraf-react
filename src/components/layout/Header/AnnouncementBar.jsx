import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
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
		<div className="w-full bg-[#C79A2D] dark:bg-[#A88020] border-b border-black/10 text-white text-xs select-none relative z-[110]">
			<Container>
				<div className="flex items-center justify-between py-2.5 gap-4">
					{/* Left: Why Choose Us Announcement */}
					<div className="flex items-center gap-2 font-medium">
						<Icon name="ShieldCheck" size="sm" className="text-white shrink-0" />
						<span className="line-clamp-1 text-white">
							{settings?.why_choose_us?.subtitle || settings?.why_choose_us?.title || (isRtl
								? "نحن نضع معايير جديدة للموثوقية والأمان في توفير أنظمة وحلول التخزين المعدني"
								: "We set new standards of reliability and safety in providing metal storage solutions")}
						</span>
					</div>

					{/* Right: Location + Hotline + Language + Auth */}
					<div className="flex items-center gap-4 lg:gap-6">
						{/* Deliver To */}
						<div className="hidden lg:flex items-center gap-2 text-white">
							<Icon name="MapPin" size="sm" className="text-white shrink-0" />
							<div className="flex flex-col leading-[1.2]">
								<span className="text-[10px] text-white/80 font-normal">
									{isRtl ? "التوصيل إلى" : "Deliver to"}
								</span>
								<span className="font-semibold text-white">
									{isRtl ? "القاهرة، مصر" : "Cairo, Egypt"}
								</span>
							</div>
						</div>

						<span className="hidden lg:block w-px h-5 bg-white/20" />

						{/* Hotline */}
						<a
							href={`tel:${phone}`}
							className="hidden lg:flex items-center gap-2 text-white hover:text-white/80 transition-colors"
						>
							<Icon name="Phone" size="sm" className="text-white shrink-0" />
							<div className="flex flex-col leading-[1.2]">
								<span className="text-[10px] text-white/80 font-normal">
									{isRtl ? "تحتاج مساعدة؟" : "Need Help?"}
								</span>
								<span className="font-semibold text-white">{formattedPhone}</span>
							</div>
						</a>

						<span className="hidden lg:block w-px h-5 bg-white/20" />

						{/* Language Switcher */}
						<div className="text-white [&_*]:text-white">
							<LanguageSwitcher />
						</div>

						<span className="hidden sm:block w-px h-5 bg-white/20" />

						{/* Theme Switcher */}
						<ThemeSwitcher />
					</div>
				</div>
			</Container>
		</div>
	);
};

export default AnnouncementBar;
