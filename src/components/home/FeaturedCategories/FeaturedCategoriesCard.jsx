import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const FeaturedCategoriesCard = ({ category, isRtl, language }) => {
	return (
		<LocalizedLink
			to={category.link}
			className="group relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-surface-2 border border-border shadow-sm hover:shadow-floating transition-all duration-500 focus-visible:ring-2 focus-visible:ring-primary outline-none block"
		>
			{/* Background Image */}
			<img
				src={category.image}
				alt={category.title[language]}
				className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
			/>

			{/* Gradient Overlay for Text Readability */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

			{/* Card Content */}
			<div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
				<span className="text-xs font-bold text-white/90 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full w-fit mb-3 border border-white/20">
					{category.itemCount} {isRtl ? "منتج" : "Products"}
				</span>
				
				<h3 className="text-xl md:text-2xl font-extrabold text-white mb-2 leading-tight drop-shadow-sm group-hover:text-primary-light transition-colors">
					{category.title[language]}
				</h3>

				<div className="flex items-center gap-2 text-sm font-bold text-white/90 group-hover:text-primary-light transition-all transform translate-y-1 group-hover:translate-y-0">
					<span>{isRtl ? "تصفح القسم" : "Shop Category"}</span>
					{isRtl ? (
						<ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
					) : (
						<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
					)}
				</div>
			</div>
		</LocalizedLink>
	);
};

export default FeaturedCategoriesCard;
