import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import { navigationLinks } from "@/config/navigation";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import MegaMenu from "./MegaMenu";

/**
 * Navigation Component
 * Matches the reference design: Blue "All Categories" button with Hamburger icon, followed by specific category links.
 */

export const Navigation = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [isMegaMenuOpen, setIsMegaMenuOpen] = React.useState(false);
	
	const closeTimeoutRef = React.useRef(null);

	const handleMouseEnter = () => {
		if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
		setIsMegaMenuOpen(true);
	};

	const handleMouseLeave = () => {
		closeTimeoutRef.current = setTimeout(() => {
			setIsMegaMenuOpen(false);
		}, 150); // slight debounce to prevent flickering when mouse slips
	};

	return (
		<div className="w-full bg-surface border-b border-border hidden lg:block relative z-40 shadow-sm">
			<Container className="relative">
				<div 
					className="flex items-center gap-2 py-1 static"
					onMouseLeave={handleMouseLeave}
				>
					{/* All Categories Button */}
					<div 
						className="relative"
						onMouseEnter={handleMouseEnter}
					>
						<button
							className={cn(
								"inline-flex items-center justify-between min-w-[220px] h-[56px] text-white text-[15px] font-bold px-6 rounded-t-xl transition-all duration-300 cursor-pointer select-none shrink-0",
								isMegaMenuOpen ? "bg-primary/90 shadow-inner" : "bg-primary hover:bg-primary/90 hover:-translate-y-0.5"
							)}
							aria-haspopup="true"
							aria-expanded={isMegaMenuOpen}
						>
							<div className="flex items-center gap-3">
								<Icon name="LayoutGrid" size={20} strokeWidth={2.5} />
								<span>{isRtl ? "كل الأقسام" : "All Categories"}</span>
							</div>
							<Icon name="ChevronDown" size={16} className={cn("opacity-80 transition-transform duration-300", isMegaMenuOpen && "rotate-180")} />
						</button>
					</div>

					{/* Mega Menu Dropdown */}
					<div 
						className={cn("absolute top-full z-50", isRtl ? "right-0" : "left-0")} 
						onMouseEnter={handleMouseEnter}
					>
						<MegaMenu 
							isOpen={isMegaMenuOpen} 
							language={language} 
							isRtl={isRtl} 
							onClose={() => setIsMegaMenuOpen(false)} 
						/>
					</div>

					{/* Navigation Links */}
					<nav className="flex items-center gap-6 ms-8 flex-1" aria-label="Main navigation">
						{navigationLinks.map((link) => {
							const linkName = link.name[language] || link.name.en;

							return (
								<LocalizedLink
									key={link.id || link.path}
									to={link.path}
									className={cn(
										"relative inline-flex items-center gap-1.5 py-4 text-[15.5px] font-bold transition-all duration-300 select-none whitespace-nowrap group",
										link.isOffer
											? "text-secondary hover:text-secondary-hover"
											: "text-text-secondary hover:text-primary"
									)}
								>
									<span className="relative z-10">{linkName}</span>
									{link.badge && (
										<Badge variant={link.badgeVariant || "primary"} size="sm" className="h-5 px-1.5 text-[10px] font-extrabold -translate-y-2">
											{link.badge[language]}
										</Badge>
									)}
									{/* Animated Underline */}
									<span className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-current transition-all duration-300 -translate-x-1/2 group-hover:w-full rounded-t-full opacity-0 group-hover:opacity-100" />
								</LocalizedLink>
							);
						})}
					</nav>
				</div>
			</Container>
		</div>
	);
};

export default Navigation;
