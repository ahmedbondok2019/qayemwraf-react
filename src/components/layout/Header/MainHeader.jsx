import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import HeaderActions from "./HeaderActions";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

/**
 * MainHeader Component
 * Central header block containing Logo, SearchBar, Language & Theme switchers, and HeaderActions.
 * Visible on md+ screens. Mobile has its own header.
 * Supports RTL/LTR and Light/Dark.
 */
export const MainHeader = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

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

					{/* Switchers (Language & Theme) in place of login */}
					<div className="flex items-center gap-2.5 shrink-0">
						<LanguageSwitcher className="bg-surface-2 hover:bg-surface-3 hover:text-primary px-3.5 py-2 rounded-xl text-text font-bold border border-border/60 text-xs transition-all shadow-xs" />
						<ThemeSwitcher className="bg-surface-2 hover:bg-surface-3 hover:text-primary p-2.5 rounded-xl text-text border border-border/60 transition-all shadow-xs" />
					</div>

					{/* Action Buttons (Cart, Wishlist, etc.) */}
					<HeaderActions />
				</div>
			</Container>
		</div>
	);
};

export default MainHeader;
