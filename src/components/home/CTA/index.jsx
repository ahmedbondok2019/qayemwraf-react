import LocalizedLink from "@/components/ui/LocalizedLink";
import React from "react";
import { } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

export const CallToAction = ({ title, description, buttonText, buttonLink, iconName = "ArrowRight" }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	
	// Dynamically load the icon from lucide-react
	const IconComp = Icons[iconName] || Icons.ArrowRight;

	const getLocalizedText = (textObj) => {
		if (!textObj) return "";
		if (typeof textObj === "string") return textObj;
		return textObj[language] || textObj.en || textObj.ar || "";
	};

	return (
		<Section spacing="sm">
			<Container>
				<div className="relative overflow-hidden rounded-2xl sm:rounded-[32px] bg-primary text-white p-6 sm:p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 shadow-lg">
					{/* Decorative background circle */}
					<div className="absolute top-0 ltr:right-0 rtl:left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
					
					<div className="relative z-10 max-w-xl text-center md:ltr:text-left md:rtl:text-right">
						<h2 className="text-xl sm:text-h2 font-bold mb-3 sm:mb-4">
							{getLocalizedText(title)}
						</h2>
						{description && (
							<p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed">
								{getLocalizedText(description)}
							</p>
						)}
					</div>

					<div className="relative z-10 flex-shrink-0">
						<Button asChild variant="secondary" size="lg" className="h-14 px-8 text-[15px] shadow-floating gap-3">
							<a href={buttonLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
								<IconComp className="w-5 h-5" />
								{getLocalizedText(buttonText)}
							</a>
						</Button>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default CallToAction;


