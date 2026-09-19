import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import {
	Maximize2,
	Weight,
	Calendar,
	TrendingUp,
	CheckCircle2,
	Check,
	FileText,
	Layers,
	ShieldCheck,
	Camera
} from "lucide-react";
import { cn } from "@/lib/utils";

export const ProjectSpecs = ({ project }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	if (!project) return null;

	const resolveText = (val) => {
		if (!val) return "";
		if (typeof val === "object") return val[language] || val.ar || val.en || "";
		return val;
	};

	const area = resolveText(project.area);
	const loadCapacity = resolveText(project.loadCapacity);
	const duration = resolveText(project.duration);
	const rackHeight = resolveText(project.rackHeight);
	const overview = resolveText(project.overview);
	const challenge = resolveText(project.challenge);
	const solution = resolveText(project.solution);

	const features = project.features || [];
	const specifications = project.specifications || [];
	const gallery = project.gallery || [];

	// Column offset classes for the Staggered Photo Gallery Grid inside details (equal aspect ratios)
	const colConfig = [
		{ offsetClass: "pt-0" },
		{ offsetClass: "pt-0 sm:pt-8" },
		{ offsetClass: "pt-0" }
	];

	// Distribute project gallery images across 3 columns
	const photoCols = [[], [], []];
	gallery.forEach((img, idx) => {
		photoCols[idx % 3].push({ img, idx });
	});

	return (
		<div className="flex flex-col gap-10 sm:gap-12 w-full">
			{/* Project Metric Highlights Bar */}
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
				{area && (
					<div className="bg-surface border border-border/80 rounded-2xl p-4 flex flex-col gap-1.5 shadow-xs">
						<div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
							<Maximize2 className="w-4 h-4" />
						</div>
						<span className="text-xs text-text-secondary font-medium">
							{isRtl ? "المساحة الإجمالية" : "Total Area"}
						</span>
						<span className="text-base sm:text-lg font-bold text-text">{area}</span>
					</div>
				)}

				{loadCapacity && (
					<div className="bg-surface border border-border/80 rounded-2xl p-4 flex flex-col gap-1.5 shadow-xs">
						<div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
							<Weight className="w-4 h-4" />
						</div>
						<span className="text-xs text-text-secondary font-medium">
							{isRtl ? "قوة التحمل" : "Load Capacity"}
						</span>
						<span className="text-base sm:text-lg font-bold text-text">{loadCapacity}</span>
					</div>
				)}

				{duration && (
					<div className="bg-surface border border-border/80 rounded-2xl p-4 flex flex-col gap-1.5 shadow-xs">
						<div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
							<Calendar className="w-4 h-4" />
						</div>
						<span className="text-xs text-text-secondary font-medium">
							{isRtl ? "مدة التنفيذ" : "Execution Time"}
						</span>
						<span className="text-base sm:text-lg font-bold text-text">{duration}</span>
					</div>
				)}

				{rackHeight && (
					<div className="bg-surface border border-border/80 rounded-2xl p-4 flex flex-col gap-1.5 shadow-xs">
						<div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
							<TrendingUp className="w-4 h-4" />
						</div>
						<span className="text-xs text-text-secondary font-medium">
							{isRtl ? "ارتفاع القوائم" : "Rack Height"}
						</span>
						<span className="text-base sm:text-lg font-bold text-text">{rackHeight}</span>
					</div>
				)}
			</div>

			{/* Project Overview & Narrative */}
			{overview && (
				<div className="space-y-4">
					<h2 className="text-xl sm:text-2xl font-bold text-text tracking-tight flex items-center gap-2.5">
						<FileText className="w-5 h-5 text-primary" />
						<span>{isRtl ? "نظرة عامة على المشروع" : "Project Overview"}</span>
					</h2>
					<p className="text-text-secondary text-base sm:text-lg leading-relaxed">{overview}</p>
				</div>
			)}

			{/* Challenge & Solution Grid */}
			{(challenge || solution) && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{challenge && (
						<div className="bg-surface rounded-2xl p-6 border border-border/80 relative overflow-hidden">
							<div className="w-2 h-full bg-secondary absolute top-0 start-0" />
							<h3 className="text-lg font-bold text-text mb-3">
								{isRtl ? "التحدي الهندسي" : "The Challenge"}
							</h3>
							<p className="text-text-secondary text-sm sm:text-base leading-relaxed">
								{challenge}
							</p>
						</div>
					)}

					{solution && (
						<div className="bg-surface rounded-2xl p-6 border border-border/80 relative overflow-hidden">
							<div className="w-2 h-full bg-primary absolute top-0 start-0" />
							<h3 className="text-lg font-bold text-text mb-3">
								{isRtl ? "الحل الهندسي والتنفيذي" : "The Solution"}
							</h3>
							<p className="text-text-secondary text-sm sm:text-base leading-relaxed">
								{solution}
							</p>
						</div>
					)}
				</div>
			)}

			{/* Key Features & Engineering Highlights */}
			{features.length > 0 && (
				<div className="space-y-4">
					<h2 className="text-xl sm:text-2xl font-bold text-text tracking-tight flex items-center gap-2.5">
						<ShieldCheck className="w-5 h-5 text-primary" />
						<span>{isRtl ? "أبرز مميزات التنفيذ ومواصفات الأمان" : "Key Execution Features & Safety"}</span>
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
						{features.map((feat, idx) => (
							<div
								key={idx}
								className="flex items-start gap-3 p-3.5 rounded-xl bg-surface border border-border/60"
							>
								<CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
								<span className="text-sm sm:text-base font-semibold text-text">
									{resolveText(feat)}
								</span>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Technical Specifications Table */}
			{specifications.length > 0 && (
				<div className="space-y-4">
					<h2 className="text-xl sm:text-2xl font-bold text-text tracking-tight flex items-center gap-2.5">
						<Layers className="w-5 h-5 text-primary" />
						<span>{isRtl ? "المواصفات الفنية التفصيلية" : "Technical Specifications"}</span>
					</h2>
					<div className="rounded-2xl border border-border overflow-hidden bg-surface shadow-xs">
						<table className="w-full text-start text-sm sm:text-base">
							<tbody>
								{specifications.map((spec, idx) => (
									<tr
										key={idx}
										className={cn(
											"border-b border-border/60 transition-colors last:border-b-0",
											idx % 2 === 0 ? "bg-surface" : "bg-surface-2/40"
										)}
									>
										<td className="py-3.5 px-5 font-bold text-text w-1/3 sm:w-2/5 border-e border-border/40">
											{resolveText(spec.key)}
										</td>
										<td className="py-3.5 px-5 text-text-secondary font-medium">
											{resolveText(spec.value)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* Staggered Photo Gallery Grid inside Project Details */}
			{gallery.length > 0 && (
				<div className="space-y-6 pt-4 border-t border-border/80">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-xl sm:text-2xl font-bold text-text tracking-tight flex items-center gap-2.5">
								<Camera className="w-5 h-5 text-primary" />
								<span>{isRtl ? "معرض صور المشروع ومراحل التركيب" : "Project Site Photo Gallery"}</span>
							</h2>
							<p className="text-text-secondary text-sm mt-1">
								{isRtl
									? "صور حصرية عالية الدقة من موقع العمل وزوايا التركيب المختلفة"
									: "High-resolution photos showcasing installation angles and structural details"}
							</p>
						</div>
					</div>

					{/* 3-Column Staggered Offset Grid with Equal Image Sizes */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-start">
						{photoCols.map((columnItems, colIdx) => (
							<div
								key={colIdx}
								className={cn("flex flex-col gap-4 sm:gap-6", colConfig[colIdx].offsetClass)}
							>
								{columnItems.map(({ img, idx }) => (
									<div
										key={idx}
										className="group relative rounded-2xl md:rounded-3xl overflow-hidden bg-surface border border-border hover:border-primary/60 shadow-xs hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
									>
										<div className="w-full relative overflow-hidden bg-slate-900/5 aspect-[16/10]">
											<img
												src={img}
												alt={`Project Angle ${idx + 1}`}
												className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
												loading="lazy"
											/>
											<div className="absolute inset-0 bg-black/0 group-hover:bg-primary/10 transition-colors duration-300" />
										</div>
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProjectSpecs;
