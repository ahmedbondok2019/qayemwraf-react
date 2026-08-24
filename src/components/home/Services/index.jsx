import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { Wrench, Stethoscope, PhoneCall } from "lucide-react";

export const ServicesSection = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const title = {
		en: "Our Medical Services",
		ar: "خدماتنا الطبية",
	};

	const services = [
		{
			id: 1,
			icon: Wrench,
			title: { en: "Equipment Maintenance", ar: "صيانة الأجهزة" },
			desc: { en: "Certified repair and calibration for medical devices.", ar: "إصلاح ومعايرة معتمدة للأجهزة الطبية." }
		},
		{
			id: 2,
			icon: Stethoscope,
			title: { en: "Home Installation", ar: "التركيب المنزلي" },
			desc: { en: "Professional setup of medical equipment in your home.", ar: "تركيب احترافي للمعدات الطبية في منزلك." }
		},
		{
			id: 3,
			icon: PhoneCall,
			title: { en: "24/7 Consultation", ar: "استشارات على مدار الساعة" },
			desc: { en: "Speak with our healthcare experts anytime.", ar: "تحدث مع خبراء الرعاية الصحية لدينا في أي وقت." }
		}
	];

	return (
		<Section spacing="md">
			<Container>
				<SectionHeader title={title} viewAllLink="/services" />

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{services.map((service) => {
						const IconComponent = service.icon;
						return (
							<div key={service.id} className="group p-8 rounded-[20px] bg-surface-2 border border-border hover:shadow-floating transition-all cursor-pointer">
								<div className="flex items-center justify-center w-14 h-14 rounded-[16px] bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
									<IconComponent className="w-7 h-7" />
								</div>
								<h3 className="text-xl font-bold text-text mb-3">{service.title[language]}</h3>
								<p className="text-text-secondary leading-relaxed">
									{service.desc[language]}
								</p>
							</div>
						);
					})}
				</div>
			</Container>
		</Section>
	);
};

export default ServicesSection;
