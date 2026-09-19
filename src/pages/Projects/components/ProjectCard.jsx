import React from "react";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { useLanguage } from "@/app/providers/I18nProvider";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ProjectCard Component
 * Large prominent 1:1 square image area, concise title, and clean footer.
 */
export const ProjectCard = ({ project, className }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	if (!project) return null;

	const title = typeof project.title === "object" ? project.title[language] || project.title.ar || project.title.en : project.title;
	const categoryTitle = typeof project.category?.title === "object" ? project.category.title[language] || project.category.title.ar : project.category?.title;
	const completionYear = project.completionDate ? (project.completionDate.includes("-") ? project.completionDate.split("-")[0] : project.completionDate) : "2026";

	const targetSlug = project.slug || project.id;
	const projectLink = `/projects/${targetSlug}`;

	return (
		<LocalizedLink
			to={projectLink}
			className={cn(
				"group flex flex-col w-full rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 bg-surface dark:bg-slate-900/80 border border-border hover:border-primary/60 dark:border-slate-800/90 dark:hover:border-primary/60 shadow-xs hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
				className
			)}
		>
			{/* Extra Large Square Image Area (1:1 Ratio) */}
			<div className="relative w-full aspect-[1/1] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950/40 border border-border/40 dark:border-slate-800 shrink-0">
				<img
					src={project.primary_image || project.image || "https://placehold.co/800x800?text=Project"}
					alt={title}
					className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
					loading="lazy"
				/>

				{/* Floating Action Icon on Hover */}
				<div className="absolute top-3 end-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
					<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
						<ArrowUpRight className="w-4 h-4" />
					</div>
				</div>

				<div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			</div>

			{/* Card Body Text Information */}
			<div className="flex flex-col flex-1 pt-3 sm:pt-3.5 justify-between">
				{/* Title */}
				<h3 className="text-xs sm:text-[13.5px] font-bold text-text group-hover:text-primary transition-colors line-clamp-2 leading-relaxed">
					{title}
				</h3>

				{/* Card Footer: Category & Year */}
				<div className="flex items-center justify-between gap-2 pt-2.5 mt-2 border-t border-border/60 dark:border-slate-800/80 text-[11px] text-text-muted font-medium">
					<span className="truncate group-hover:text-text transition-colors">
						{categoryTitle || (isRtl ? "نظام تخزين صناعي" : "Industrial Storage")}
					</span>
					<span className="font-semibold text-text-secondary shrink-0" dir="ltr">
						{completionYear}
					</span>
				</div>
			</div>
		</LocalizedLink>
	);
};

export default ProjectCard;
