import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * HeroImage Component
 * Handles the display and animation of the main product composition image
 * with the soft blue oval background shape positioned strictly behind the products.
 * Hidden on mobile (< lg) to prevent content overlap.
 */
export const HeroImage = ({ src, alt, imageVariants }) => {
	return (
		<div className="relative w-full h-auto lg:h-full flex items-center justify-center pointer-events-none select-none py-2 lg:py-0">
			{/* Oval backdrop - z-0 (Strictly behind products) - Scaled down on mobile */}
			<div className="absolute w-[65%] h-[65%] lg:w-[85%] lg:h-[85%] max-w-[220px] max-h-[220px] lg:max-w-[460px] lg:max-h-[460px] rounded-[90px] lg:rounded-[170px] bg-[#E3EFFF] dark:bg-blue-950/40 z-0 border border-blue-100/60 dark:border-blue-900/30 transform rotate-[-8deg] transition-all duration-500" />
			
			{/* Products Image - z-10 (Strictly in front of the oval) */}
			<motion.div
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={imageVariants}
				className="relative z-10 w-full h-full flex items-center justify-center"
			>
				{src ? (
					<img
						src={src}
						alt={alt}
						className="w-full h-auto max-h-[200px] sm:max-h-[250px] lg:max-h-[420px] object-contain drop-shadow-xl transition-all duration-300"
						loading="eager"
					/>
				) : (
					<div className="w-full aspect-square bg-white/50 border border-white/60 rounded-[24px] shadow-overlay flex flex-col items-center justify-center backdrop-blur-md">
						<div className="text-primary/30 font-extrabold text-2xl lg:text-4xl -rotate-12 px-6 text-center leading-tight">
							{alt}
						</div>
					</div>
				)}
			</motion.div>
		</div>
	);
};

export default HeroImage;
