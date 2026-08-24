import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import HeaderActions from "./HeaderActions";
import ThemeSwitcher from "./ThemeSwitcher";

/**
 * MainHeader Component
 * Central header block containing Logo, SearchBar, ThemeSwitcher, and HeaderActions.
 * Visible on md+ screens. Mobile has its own header.
 * Supports RTL/LTR and Light/Dark.
 */
export const MainHeader = () => {
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

					{/* Theme Switcher */}
					<ThemeSwitcher />

					{/* Action Buttons */}
					<HeaderActions />
				</div>
			</Container>
		</div>
	);
};

export default MainHeader;
