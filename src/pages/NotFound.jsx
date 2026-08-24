import LocalizedLink from "@/components/ui/LocalizedLink";
import { } from "react-router-dom";
import ROUTES from "@/app/router/paths";

const NotFound = () => {
	return (
		<div className="text-center space-y-6">
			<h1 className="text-9xl font-extrabold text-primary tracking-widest">404</h1>
			<div className="bg-danger px-2 text-sm rounded rotate-12 absolute -mt-10 ml-28 inline-block text-white font-semibold">
				Page Not Found
			</div>
			<p className="text-muted text-lg max-w-md mx-auto">
				Sorry, we couldn't find the page you are looking for. It might have been moved or deleted.
			</p>
			<LocalizedLink
				to={ROUTES.HOME}
				className="inline-block px-6 py-3 bg-primary text-background font-bold rounded-lg hover:opacity-90 transition-all"
			>
				Go Back Home
			</LocalizedLink>
		</div>
	);
};

export default NotFound;
