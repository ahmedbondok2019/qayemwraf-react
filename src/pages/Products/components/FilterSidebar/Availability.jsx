import React from "react";
import { CheckboxGroup } from "./CheckboxGroup";
import { useLanguage } from "@/app/providers/I18nProvider";

/**
 * Availability Component
 * Predefined options for In Stock / On Sale
 */
export const Availability = ({ selectedOptions = [], onChange, counts = {} }) => {
	const { language } = useLanguage();

	const options = [
		{ id: "instock", label: { en: "In Stock", ar: "متوفر" }, count: counts.instock },
		{ id: "sale", label: { en: "On Sale", ar: "تخفيضات" }, count: counts.sale }
	];

	return (
		<div className="flex flex-col gap-1">
			{options.map(opt => (
				<CheckboxGroup 
					key={opt.id}
					label={opt.label[language]}
					value={opt.id}
					count={opt.count}
					checked={selectedOptions.includes(opt.id)}
					onChange={onChange}
				/>
			))}
		</div>
	);
};

export default Availability;
