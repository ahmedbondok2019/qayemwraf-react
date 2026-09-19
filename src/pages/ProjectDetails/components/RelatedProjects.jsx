import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { ProjectCard } from "@/pages/Projects/components/ProjectCard";

export const RelatedProjects = ({ projects = [] }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	if (!projects || projects.length === 0) return null;

	return (
		<div className="w-full space-y-6 pt-12 border-t border-border/80">
			<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
				<div>
					<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
						<Sparkles className="w-3.5 h-3.5" />
						<span>{isRtl ? "مشاريع ذات صلة" : "Related Case Studies"}</span>
					</div>
					<h2 className="text-2xl sm:text-3xl font-black text-text tracking-tight">
						{isRtl ? "مشاريع أخرى قد تهمك" : "Other Projects You May Like"}
					</h2>
				</div>

				<LocalizedLink
					to="/projects"
					className="group inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-all self-start sm:self-auto"
				>
					<span>{isRtl ? "استعراض كافة المشاريع" : "View All Projects"}</span>
					{isRtl ? (
						<ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
					) : (
						<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
					)}
				</LocalizedLink>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
				{projects.slice(0, 4).map((project) => (
					<ProjectCard key={project.id || project.slug} project={project} />
				))}
			</div>
		</div>
	);
};

export default RelatedProjects;
