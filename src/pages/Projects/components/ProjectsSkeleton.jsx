import React from "react";

export const ProjectsSkeleton = () => {
	return (
		<div className="w-full">
			{/* 4-Column Staggered Skeleton matching masonry grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-start">
				<div className="space-y-5 lg:space-y-6">
					<div className="bg-slate-200 dark:bg-slate-800/60 animate-pulse rounded-2xl sm:rounded-3xl h-80 w-full" />
					<div className="bg-slate-200 dark:bg-slate-800/60 animate-pulse rounded-2xl sm:rounded-3xl h-80 w-full" />
				</div>
				<div className="space-y-5 lg:space-y-6 pt-0 sm:pt-12 lg:pt-16">
					<div className="bg-slate-200 dark:bg-slate-800/60 animate-pulse rounded-2xl sm:rounded-3xl h-80 w-full" />
					<div className="bg-slate-200 dark:bg-slate-800/60 animate-pulse rounded-2xl sm:rounded-3xl h-80 w-full" />
				</div>
				<div className="space-y-5 lg:space-y-6">
					<div className="bg-slate-200 dark:bg-slate-800/60 animate-pulse rounded-2xl sm:rounded-3xl h-80 w-full" />
					<div className="bg-slate-200 dark:bg-slate-800/60 animate-pulse rounded-2xl sm:rounded-3xl h-80 w-full" />
				</div>
				<div className="space-y-5 lg:space-y-6 pt-0 sm:pt-12 lg:pt-16">
					<div className="bg-slate-200 dark:bg-slate-800/60 animate-pulse rounded-2xl sm:rounded-3xl h-80 w-full" />
					<div className="bg-slate-200 dark:bg-slate-800/60 animate-pulse rounded-2xl sm:rounded-3xl h-80 w-full" />
				</div>
			</div>
		</div>
	);
};

export default ProjectsSkeleton;
