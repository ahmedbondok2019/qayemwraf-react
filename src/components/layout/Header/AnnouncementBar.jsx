import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/queries/useSettings";

/**
 * AnnouncementBar Component
 * Displays announcement message, delivery location, email address, and hotline.
 */
export const AnnouncementBar = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const { data: settings } = useSettings();

	const phone = settings?.phone || "01154813836";
	const formattedPhone = phone;
	const email = settings?.contact_email || settings?.email || "info@qayemwraf.com";

	return (
		<div className="w-full bg-[#C79A2D] dark:bg-[#A88020] border-b border-black/10 text-white text-xs select-none relative z-[110]">
			<Container>
				<div className="flex items-center justify-between py-2.5 gap-4">
					{/* Left: Why Choose Us Announcement */}
					<div className="flex items-center gap-2 font-medium">
						<Icon name="ShieldCheck" size="sm" className="text-white shrink-0" />
						<span className="line-clamp-1 text-white">
							{(() => {
								const val = settings?.why_choose_us?.subtitle || settings?.why_choose_us?.title;
								if (val) {
									if (typeof val === 'object') {
										return val[language] || val.ar || val.en || "";
									}
									return String(val);
								}
								return isRtl
									? "نحن نضع معايير جديدة للموثوقية والأمان في توفير أنظمة وحلول التخزين المعدني"
									: "We set new standards of reliability and safety in providing metal storage solutions";
							})()}
						</span>
					</div>

					{/* Right: Location + Email + Hotline */}
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

						{/* Email */}
						{email && (
							<a
								href={`mailto:${email}`}
								className="hidden sm:flex items-center gap-2 text-white hover:text-white/80 transition-colors"
							>
								<Icon name="Mail" size="sm" className="text-white shrink-0" />
								<div className="flex flex-col leading-[1.2]">
									<span className="text-[10px] text-white/80 font-normal">
										{isRtl ? "البريد الإلكتروني" : "Email"}
									</span>
									<span className="font-semibold text-white">{email}</span>
								</div>
							</a>
						)}

						<span className="hidden sm:block w-px h-5 bg-white/20" />

						{/* Hotline */}
						<a
							href={`tel:${phone}`}
							className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
						>
							<Icon name="Phone" size="sm" className="text-white shrink-0" />
							<div className="flex flex-col leading-[1.2]">
								<span className="text-[10px] text-white/80 font-normal">
									{isRtl ? "تحتاج مساعدة؟" : "Need Help?"}
								</span>
								<span className="font-semibold text-white">{formattedPhone}</span>
							</div>
						</a>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default AnnouncementBar;
