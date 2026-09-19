import React, { useState, useMemo } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import PageHero from "@/components/ui/PageHero";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { ProjectCard, ProjectsSkeleton, ProjectsPagination } from "./components";
import { useProjects } from "@/hooks/queries/useProjects";
import { Sparkles, PhoneCall, ArrowLeft, ArrowRight, FolderSearch } from "lucide-react";
import { cn } from "@/lib/utils";

export const Projects = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 16; // 3 complete 4-column rows per page

	const { data: projects = [], isLoading, isError } = useProjects();

	// Calculate pagination
	const totalPages = Math.ceil(projects.length / itemsPerPage) || 1;
	const paginatedProjects = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return projects.slice(start, start + itemsPerPage);
	}, [projects, currentPage, itemsPerPage]);

	// 4 Staggered columns with uniform card and image sizing (alternating offset)
	const colConfig = [
		{ offsetClass: "pt-0" },                  // Column 1 starts at top
		{ offsetClass: "pt-0 sm:pt-12 lg:pt-16" },// Column 2 staggered down
		{ offsetClass: "pt-0" },                  // Column 3 starts at top
		{ offsetClass: "pt-0 sm:pt-12 lg:pt-16" } // Column 4 staggered down
	];

	// Distribute current page items across 4 staggered columns
	const cols = useMemo(() => {
		const result = [[], [], [], []];
		paginatedProjects.forEach((item, index) => {
			result[index % 4].push({
				...item,
				index
			});
		});
		return result;
	}, [paginatedProjects]);

	const breadcrumbs = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Our Projects & Portfolio", ar: "سابقة أعمالنا ومشاريعنا" } }
	];

	const pageTitle = {
		en: "Our Completed Projects & Portfolio",
		ar: "سابقة أعمالنا ومشاريعنا المنجزة"
	};

	const pageSubtitle = {
		en: "Explore a curated showcase of our heavy-duty industrial shelving, automated racking, and warehouse fitouts across Egypt & the Middle East.",
		ar: "استعرض جولة مصورة وشاملة لأبرز مشاريعنا وتجهيزاتنا لمستودعات ومخازن كبرى الشركات والمصانع بأنظمة تخزين معدنية هندسية متقدمة."
	};

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			{/* Page Hero Banner */}
			<PageHero
				title={pageTitle}
				subtitle={pageSubtitle}
				count={projects.length}
				countLabel={{ en: "Projects", ar: "مشروع" }}
				breadcrumbs={breadcrumbs}
				bgImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600"
			/>

			{/* Main Projects Section */}
			<Section spacing="lg" className="pt-8 sm:pt-12">
				<Container>
					{/* Loading State */}
					{isLoading && <ProjectsSkeleton />}

					{/* Empty State */}
					{!isLoading && projects.length === 0 && (
						<div className="flex flex-col items-center justify-center py-20 text-center bg-surface/50 border border-dashed border-border rounded-3xl p-8 max-w-xl mx-auto">
							<div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
								<FolderSearch className="w-8 h-8" />
							</div>
							<h3 className="text-xl font-bold text-text mb-2">
								{isRtl ? "لم يتم العثور على مشاريع" : "No Projects Found"}
							</h3>
						</div>
					)}

					{/* 4-Column Staggered Offset Grid Gallery with Equal Card Sizes */}
					{!isLoading && paginatedProjects.length > 0 && (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-start">
							{cols.map((columnItems, colIdx) => (
								<div
									key={colIdx}
									className={cn("flex flex-col gap-5 lg:gap-6", colConfig[colIdx].offsetClass)}
								>
									{columnItems.map((project) => (
										<ProjectCard
											key={project.id || project.slug}
											project={project}
										/>
									))}
								</div>
							))}
						</div>
					)}

					{/* Pagination Controls */}
					{!isLoading && totalPages > 1 && (
						<ProjectsPagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={(page) => setCurrentPage(page)}
						/>
					)}

					{/* Bottom Call to Action Banner */}
					<div className="mt-16 sm:mt-24 relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 p-8 sm:p-12 text-white shadow-2xl">
						<div className="absolute top-0 end-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

						<div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-start">
							<div className="max-w-2xl space-y-3">
								<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 text-primary-light text-xs font-bold border border-primary/30">
									<Sparkles className="w-3.5 h-3.5" />
									<span>{isRtl ? "دراسة هندسية ومعاينة مجانية" : "Free Engineering & Site Survey"}</span>
								</div>
								<h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
									{isRtl
										? "هل تخطط لتجهيز أو توسعة مستودعك؟"
										: "Planning to fitout or expand your warehouse?"}
								</h2>
								<p className="text-slate-300 text-sm sm:text-base leading-relaxed">
									{isRtl
										? "فريقنا الهندسي المتخصص يقدم لك استشارات متكاملة وتصميم ثنائي وثلاثي الأبعاد (2D/3D) لمستودعك مع تقديم أفضل عروض الأسعار."
										: "Our engineering specialists provide comprehensive consultancy and custom 2D/3D storage layouts tailored to maximize your facility's capacity."}
								</p>
							</div>

							<div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
								<LocalizedLink
									to="/contact"
									className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-base shadow-lg shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5"
								>
									<span>{isRtl ? "طلب استشارة وعرض سعر" : "Request Free Consultation"}</span>
									{isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
								</LocalizedLink>
								<LocalizedLink
									to="/contact"
									className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition-all"
								>
									<PhoneCall className="w-4 h-4 text-primary" />
									<span>{isRtl ? "تواصل مع مهندس المبيعات" : "Talk to an Engineer"}</span>
								</LocalizedLink>
							</div>
						</div>
					</div>
				</Container>
			</Section>
		</div>
	);
};

export default Projects;
