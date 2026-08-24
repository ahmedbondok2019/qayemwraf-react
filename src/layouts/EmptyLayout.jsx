import { Outlet } from "react-router-dom";

export const EmptyLayout = () => {
	return (
		<div className="min-h-screen bg-background text-text flex flex-col transition-colors">
			<main className="flex-1 flex flex-col items-center justify-center p-4">
				<Outlet />
			</main>
		</div>
	);
};

export default EmptyLayout;
