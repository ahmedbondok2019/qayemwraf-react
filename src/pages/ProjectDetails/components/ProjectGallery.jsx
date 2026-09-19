import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const ProjectGallery = ({ images = [], projectTitle = "" }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);

	const galleryList = images.length > 0 ? images : ["https://placehold.co/1200x800?text=Project+Photo"];
	const currentImage = galleryList[selectedIndex] || galleryList[0];

	const handlePrev = (e) => {
		e?.stopPropagation();
		setSelectedIndex((prev) => (prev === 0 ? galleryList.length - 1 : prev - 1));
	};

	const handleNext = (e) => {
		e?.stopPropagation();
		setSelectedIndex((prev) => (prev === galleryList.length - 1 ? 0 : prev + 1));
	};

	return (
		<div className="flex flex-col gap-4 w-full">
			{/* Main Image Viewer */}
			<div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-slate-900 border border-border group shadow-md">
				<img
					src={currentImage}
					alt={`${projectTitle} - photo ${selectedIndex + 1}`}
					loading="eager"
					fetchPriority="high"
					decoding="async"
					className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
				/>

				{/* Floating Fullscreen / Lightbox Trigger */}
				<button
					type="button"
					onClick={() => setIsLightboxOpen(true)}
					className="absolute top-4 end-4 z-20 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-primary text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
					aria-label="View Fullscreen"
				>
					<Maximize2 className="w-4 h-4" />
				</button>

				{/* Navigation Arrows for Main Viewer */}
				{galleryList.length > 1 && (
					<>
						<button
							type="button"
							onClick={handlePrev}
							className={cn(
								"absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-primary text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg cursor-pointer",
								isRtl ? "right-4" : "left-4"
							)}
							aria-label="Previous image"
						>
							{isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
						</button>
						<button
							type="button"
							onClick={handleNext}
							className={cn(
								"absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-primary text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg cursor-pointer",
								isRtl ? "left-4" : "right-4"
							)}
							aria-label="Next image"
						>
							{isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
						</button>
					</>
				)}

				{/* Image Counter Badge */}
				<div className="absolute bottom-4 start-4 z-20 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-xs font-semibold">
					{selectedIndex + 1} / {galleryList.length}
				</div>
			</div>

			{/* Thumbnails Row */}
			{galleryList.length > 1 && (
				<div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
					{galleryList.map((img, idx) => {
						const isSelected = selectedIndex === idx;
						return (
							<button
								key={idx}
								type="button"
								onClick={() => setSelectedIndex(idx)}
								className={cn(
									"relative w-20 sm:w-24 aspect-[4/3] rounded-xl overflow-hidden shrink-0 transition-all duration-300 cursor-pointer border-2",
									isSelected
										? "border-primary ring-2 ring-primary/40 scale-105"
										: "border-border/80 opacity-70 hover:opacity-100 hover:border-primary/50"
								)}
							>
								<img
									src={img}
									alt={`Thumbnail ${idx + 1}`}
									className="w-full h-full object-cover"
								/>
							</button>
						);
					})}
				</div>
			)}

			{/* Fullscreen Lightbox Modal */}
			{isLightboxOpen && (
				<div
					className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
					onClick={() => setIsLightboxOpen(false)}
				>
					<button
						type="button"
						onClick={() => setIsLightboxOpen(false)}
						className="absolute top-6 end-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
						aria-label="Close modal"
					>
						<X className="w-6 h-6" />
					</button>

					<div
						className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
						onClick={(e) => e.stopPropagation()}
					>
						<img
							src={currentImage}
							alt={projectTitle}
							className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
						/>

						{galleryList.length > 1 && (
							<>
								<button
									type="button"
									onClick={handlePrev}
									className={cn(
										"absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-primary text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer",
										isRtl ? "-right-4 sm:-right-8" : "-left-4 sm:-left-8"
									)}
								>
									{isRtl ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
								</button>
								<button
									type="button"
									onClick={handleNext}
									className={cn(
										"absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-primary text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer",
										isRtl ? "-left-4 sm:-left-8" : "-right-4 sm:-right-8"
									)}
								>
									{isRtl ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
								</button>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProjectGallery;
