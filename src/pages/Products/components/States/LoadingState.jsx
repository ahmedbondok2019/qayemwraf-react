import React from "react";
import Container from "@/components/ui/Container";

export const LoadingState = () => {
	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-10 animate-pulse">
			{/* Hero Skeleton */}
			<div className="w-full h-40 sm:h-48 md:h-56 bg-surface-2 border-b border-border/40" />

			<Container className="mt-8">
				{/* Toolbar Skeleton */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 pb-6 border-b border-border/60">
					<div className="w-48 h-8 bg-surface-2 rounded-lg" />
					<div className="flex gap-4 w-full sm:w-auto">
						<div className="w-full sm:w-40 h-11 bg-surface-2 rounded-xl" />
						<div className="w-32 h-11 bg-surface-2 rounded-xl hidden sm:block" />
					</div>
				</div>

				<div className="flex gap-8 items-start w-full relative">
					{/* Sidebar Skeleton */}
					<div className="hidden lg:flex flex-col w-[280px] shrink-0 gap-6">
						{[...Array(4)].map((_, i) => (
							<div key={i} className="flex flex-col gap-3">
								<div className="w-24 h-5 bg-surface-2 rounded-md mb-2" />
								{[...Array(5)].map((_, j) => (
									<div key={j} className="flex items-center gap-3">
										<div className="w-5 h-5 bg-surface-2 rounded-md" />
										<div className="w-32 h-4 bg-surface-2 rounded-md" />
									</div>
								))}
							</div>
						))}
					</div>

					{/* Grid Skeleton */}
					<div className="w-full flex-grow flex flex-col gap-6">
						<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
							{[...Array(8)].map((_, i) => (
								<div key={i} className="w-full h-[320px] bg-surface rounded-2xl border border-border/60 flex flex-col p-4 gap-4">
									<div className="w-full h-40 bg-surface-2 rounded-xl" />
									<div className="w-3/4 h-5 bg-surface-2 rounded-md" />
									<div className="w-1/2 h-4 bg-surface-2 rounded-md mt-auto" />
									<div className="w-full h-10 bg-surface-2 rounded-xl mt-2" />
								</div>
							))}
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default LoadingState;
