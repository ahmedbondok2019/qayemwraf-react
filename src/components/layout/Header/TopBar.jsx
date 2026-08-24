import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

/**
 * TopBar Component
 * Secondary utility bar between AnnouncementBar and MainHeader.
 * Contains delivery location, contact email, language switcher, and theme switcher.
 * Visible on md+ screens only.
 * Supports RTL/LTR and Light/Dark.
 *
 * NOTE: Currently unused — its content was merged into AnnouncementBar for a cleaner design.
 * Kept as a placeholder for future use.
 */
export const TopBar = () => {
	return null;
};

export default TopBar;
