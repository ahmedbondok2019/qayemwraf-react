import React from "react";
import { cn } from "@/lib/utils";

/**
 * HeroBackground Component
 * Renders the clean medical background with decorative shapes (Dot grid pattern).
 */
export const HeroBackground = ({ className, bgClass = "bg-[#F4F7FC]" }) => {
	return (
		<div className={cn("absolute inset-0 z-0 overflow-hidden bg-[#F4F7FC] dark:bg-slate-950", className)}>
			{/* Soft Gradient Overlay */}
			<div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/40 to-transparent dark:from-slate-950/70 dark:via-slate-950/40 pointer-events-none" />

			{/* Dot Grid Pattern (Top Right/End) */}
			<div className="absolute top-6 end-8 w-36 h-48 opacity-10 lg:opacity-35 pointer-events-none">
				<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
							<circle cx="3" cy="3" r="2" fill="currentColor" className="text-primary" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#dotGrid)" />
				</svg>
			</div>
		</div>
	);
};

export default HeroBackground;
