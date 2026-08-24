import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";

export const SpecificationTable = ({ specifications }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	if (!specifications || specifications.length === 0) {
		return (
			<p className="text-text-secondary text-sm">
				{isRtl ? "لا توجد مواصفات متاحة لهذا المنتج." : "No specifications available for this product."}
			</p>
		);
	}

	return (
		<div className="overflow-hidden rounded-2xl border border-border/50">
			<table className="w-full text-sm text-start">
				<tbody className="divide-y divide-border/50">
					{specifications.map((spec, index) => (
						<tr 
							key={index} 
							className="bg-surface hover:bg-surface-2/50 transition-colors"
						>
							<th className="py-4 px-6 w-1/3 bg-surface-2/30 font-bold text-text-secondary text-start whitespace-nowrap">
								{spec.label[language]}
							</th>
							<td className="py-4 px-6 font-medium text-text">
								{spec.value[language]}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default SpecificationTable;
