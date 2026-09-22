import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { BadgeCheck } from "lucide-react";

const richBrands = [
	{ id: 1, name: "Qayem Racks", count: "120+", logo: "Qayem", bgClass: "bg-[#1E3A8A]" },
	{ id: 2, name: "Heavy Steel", count: "45+", logo: "Steel", bgClass: "bg-[#047857]" },
	{ id: 3, name: "Warehouse Pro", count: "80+", logo: "Warehouse", bgClass: "bg-[#BE123C]" },
	{ id: 4, name: "Storage Tech", count: "30+", logo: "Storage", bgClass: "bg-[#4338CA]" },
	{ id: 5, name: "Metal Craft", count: "200+", logo: "Metal", bgClass: "bg-[#C2410C]" },
	{ id: 6, name: "Safe Store", count: "25+", logo: "SafeStore", bgClass: "bg-[#0F172A]" },
];

export const BrandsShowcase = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<Section spacing="lg">
			<Container>
				<div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
					<h2 className="text-2xl sm:text-3xl font-extrabold text-text-heading mb-2">
						{isRtl ? "أنظمة وحلول التخزين المعتمدة" : "Certified Storage Systems"}
					</h2>
					<p className="text-text-secondary text-sm">
						{isRtl ? "حلول وأنظمة تخزين معتمدة وموثوقة من كبرى المؤسسات والشركات في مصر" : "Trusted and certified storage systems for leading enterprises and warehouses"}
					</p>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-10">
					{richBrands.map((brand) => (
						<LocalizedLink key={brand.id} to={`/brand/${brand.id}`} className="group flex items-center justify-center h-20 sm:h-24 bg-surface border border-border rounded-xl sm:rounded-2xl hover:border-primary/50 hover:shadow-md transition-all duration-300 p-3 sm:p-4">
							<span className="text-text-secondary font-extrabold text-base sm:text-lg group-hover:text-primary transition-colors">{brand.name}</span>
						</LocalizedLink>
					))}
				</div>

				<div className="flex justify-center">
					<LocalizedLink to="/brands" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-surface-2 border border-border text-text font-bold text-sm hover:bg-primary hover:text-white transition-colors shadow-sm">
						{isRtl ? "استكشف كل الماركات" : "Explore Brands"}
					</LocalizedLink>
				</div>
			</Container>
		</Section>
	);
};

export default BrandsShowcase;


