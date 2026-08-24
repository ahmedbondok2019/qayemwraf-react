import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { BadgeCheck } from "lucide-react";

const richBrands = [
	{ id: 1, name: "Omron", count: "120+", logo: "Omron", bgClass: "bg-[#1E3A8A]" }, // Navy
	{ id: 2, name: "Accu-Chek", count: "45+", logo: "AccuChek", bgClass: "bg-[#047857]" }, // Emerald
	{ id: 3, name: "Yuwell", count: "80+", logo: "Yuwell", bgClass: "bg-[#BE123C]" }, // Rose
	{ id: 4, name: "Ensure", count: "30+", logo: "Ensure", bgClass: "bg-[#4338CA]" }, // Indigo
	{ id: 5, name: "Johnson's", count: "200+", logo: "Johnson", bgClass: "bg-[#C2410C]" }, // Orange
	{ id: 6, name: "Littmann", count: "25+", logo: "Littmann", bgClass: "bg-[#0F172A]" }, // Slate
];

export const BrandsShowcase = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<Section spacing="lg">
			<Container>
				<div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
					<h2 className="text-2xl sm:text-3xl font-extrabold text-text-heading mb-2">
						{isRtl ? "العلامات التجارية الرسمية الشريكة" : "Official Partner Brands"}
					</h2>
					<p className="text-text-secondary text-sm">
						{isRtl ? "نحن وكلاء وموزعون معتمدون لأرقى الماركات الطبية العالمية" : "Authorized distributor for world-leading medical healthcare brands"}
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


