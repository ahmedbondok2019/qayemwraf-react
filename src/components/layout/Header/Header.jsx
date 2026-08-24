import React, { useState, useEffect } from "react";
import AnnouncementBar from "./AnnouncementBar";
import MainHeader from "./MainHeader";
import Navigation from "./Navigation";
import MobileHeader from "./MobileHeader";
import { cn } from "@/lib/utils";

/**
 * Header Component
 * Top-level orchestrator that composes:
 *   AnnouncementBar → MainHeader → Navigation (Desktop)
 *   AnnouncementBar → MobileHeader (Mobile)
 *
 * Features:
 * - Sticky behavior on scroll (MainHeader + Navigation stick, AnnouncementBar scrolls away)
 * - Smooth shadow transition on scroll
 * - Backdrop blur for premium feel
 * Supports RTL/LTR and Light/Dark.
 */
export const Header = () => {
	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		let ticking = false;

		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					setIsSticky(window.scrollY > 60);
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header className="w-full flex flex-col" role="banner">
			{/* Announcement Bar — always at the top, scrolls away */}
			<AnnouncementBar />

			{/* Sticky wrapper — sticks on scroll */}
			<div
				className={cn(
					"w-full transition-shadow duration-200",
					isSticky
						? "fixed top-0 left-0 right-0 z-[var(--z-sticky)] bg-surface/95 backdrop-blur-md shadow-md"
						: "relative z-[130] lg:z-[100]"
				)}
			>
				{/* Desktop: MainHeader + Navigation */}
				<MainHeader />
				<Navigation />

				{/* Mobile: MobileHeader */}
				<MobileHeader />
			</div>

			{/* Spacer to prevent layout shift when sticky kicks in */}
			{isSticky && (
				<div className="h-[110px] md:h-[120px] lg:h-[150px]" aria-hidden="true" />
			)}
		</header>
	);
};

export default Header;
