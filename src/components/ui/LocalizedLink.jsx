import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";

export const LocalizedLink = ({ to, children, ...props }) => {
	const { language } = useLanguage();

	if (typeof to === "string" && (/^(https?:|\/\/|mailto:|tel:)/i.test(to))) {
		return (
			<a href={to} {...props}>
				{children}
			</a>
		);
	}

	let localizedTo = to;
	if (typeof to === "string" && to.startsWith("/")) {
		localizedTo = `/${language}${to}`;
	} else if (typeof to === "object" && to.pathname?.startsWith("/")) {
		localizedTo = { ...to, pathname: `/${language}${to.pathname}` };
	}

	return (
		<RouterLink to={localizedTo} {...props}>
			{children}
		</RouterLink>
	);
};

export default LocalizedLink;
