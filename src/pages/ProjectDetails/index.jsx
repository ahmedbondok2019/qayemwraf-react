import React from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import LocalizedLink from "@/components/ui/LocalizedLink";
import SEO from "@/components/common/SEO";
import {
	ProjectGallery,
	ProjectSpecs,
	ProjectSidebar,
	RelatedProjects
} from "./components";
import { useProjectDetails, useRelatedProjects } from "@/hooks/queries/useProjects";
import { MapPin, Building2, Calendar, ArrowLeft, ArrowRight, FolderSearch } from "lucide-react";

export const ProjectDetails = () => {
	const { slug } = useParams();
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const { data: project, isLoading, isError } = useProjectDetails(slug);
	const { data: relatedProjects = [] } = useRelatedProjects(slug, project?.category?.id);

	if (isLoading) {
		return (
			<div className="w-full min-h-screen bg-background py-12">
				<Container className="space-y-8">
					<div className="h-6 w-64 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-6">
							<div className="aspect-[16/10] bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse" />
							<div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
							<div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
						</div>
						<div className="space-y-6">
							<div className="h-80 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse" />
							<div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse" />
						</div>
					</div>
				</Container>
			</div>
		);
	}

	if (isError || !project) {
		return (
			<div className="w-full min-h-[70vh] flex items-center justify-center bg-background px-4">
				<div className="flex flex-col items-center justify-center text-center max-w-md p-8 bg-surface rounded-3xl border border-border shadow-sm">
					<div className="w-16 h-16 rounded-full bg-danger/10 text-danger flex items-center justify-center mb-4">
						<FolderSearch className="w-8 h-8" />
					</div>
					<h2 className="text-2xl font-bold text-text mb-2">
						{isRtl ? "المشروع غير موجود" : "Project Not Found"}
					</h2>
					<p className="text-text-secondary text-sm mb-6">
						{isRtl
							? "عذراً، لم نتمكن من العثور على تفاصيل هذا المشروع أو ربما تم نقله."
							: "Sorry, we could not find this project. It might have been moved or removed."}
					</p>
					<LocalizedLink
						to="/projects"
						className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-colors"
					>
						<span>{isRtl ? "العودة لصفحة المشاريع" : "Back to Projects"}</span>
						{isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
					</LocalizedLink>
				</div>
			</div>
		);
	}

	const resolveText = (val) => {
		if (!val) return "";
		if (typeof val === "object") return val[language] || val.ar || val.en || "";
		return val;
	};

	const title = resolveText(project.title);
	const categoryTitle = resolveText(project.category?.title);
	const client = resolveText(project.client);
	const location = resolveText(project.location);

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Projects", ar: "المشاريع" }, link: "/projects" },
		...(categoryTitle ? [{ label: categoryTitle }] : []),
		{ label: title }
	];

	const rawDesc = resolveText(project.description);
	const cleanDesc = typeof rawDesc === "string" ? rawDesc.replace(/<[^>]*>?/gm, "").slice(0, 160) : "";

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			<SEO
				title={`${title} - مشروع تجهيز مخازن وأرفف`}
				description={cleanDesc || `تفاصيل مشروع ${title} لتجهيز المستودعات والمخازن بأنظمة أرفف التخزين المعدنية من قايم ورف.`}
				keywords={`${title}, ${categoryTitle}, تجهيز مخازن, ارفف مخازن, مشاريع قايم ورف, ارفف مستودعات`}
				image={project.primary_image || project.gallery?.[0] || "/android-chrome-512x512.png"}
				canonical={`https://qayemwraf.com/${language}/projects/${slug}`}
			/>

			{/* Breadcrumb Navigation Header */}
			<div className="border-b border-border/60 bg-surface/50">
				<Container className="py-4">
					<Breadcrumb items={breadcrumbItems} className="py-0 border-b-0" />
				</Container>
			</div>

			<Container className="pt-6 sm:pt-8 space-y-10">
				{/* Top Project Header Banner */}
				<div className="space-y-4">
					{categoryTitle && (
						<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
							<span>{categoryTitle}</span>
						</div>
					)}

					<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-text tracking-tight leading-tight">
						{title}
					</h1>

					{/* Meta quick row */}
					<div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-text-secondary pt-1 font-medium">
						{client && (
							<div className="flex items-center gap-1.5">
								<Building2 className="w-4 h-4 text-primary shrink-0" />
								<span>{client}</span>
							</div>
						)}
						{location && (
							<div className="flex items-center gap-1.5">
								<MapPin className="w-4 h-4 text-primary shrink-0" />
								<span>{location}</span>
							</div>
						)}
						{project.completionDate && (
							<div className="flex items-center gap-1.5">
								<Calendar className="w-4 h-4 text-primary shrink-0" />
								<span>{project.completionDate}</span>
							</div>
						)}
					</div>
				</div>

				{/* Main Content Layout: Left (Gallery & Specs) + Right (Sidebar) */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
					{/* Left / Main Column */}
					<div className="lg:col-span-8 space-y-10">
						{/* High-res Interactive Photo Gallery */}
						<ProjectGallery images={project.gallery || [project.primary_image]} projectTitle={title} />

						{/* Project Details, Specs, Metrics & Staggered Site Photos */}
						<ProjectSpecs project={project} />
					</div>

					{/* Right / Sticky Sidebar */}
					<div className="lg:col-span-4 w-full">
						<ProjectSidebar project={project} />
					</div>
				</div>

				{/* Related Projects Carousel / Grid */}
				{relatedProjects.length > 0 && (
					<RelatedProjects projects={relatedProjects} />
				)}
			</Container>
		</div>
	);
};

export default ProjectDetails;
