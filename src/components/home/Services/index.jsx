import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { Wrench, ShieldCheck, PhoneCall } from "lucide-react";

export const ServicesSection = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const title = {
		en: "Our Services & Solutions",
		ar: "خدماتنا وحلولنا الهندسية",
	};

	const services = [
		{
			id: 1,
			icon: Wrench,
			title: { en: "Custom Design & Fabrication", ar: "التصميم والتصنيع المخصص" },
			desc: { en: "Tailored storage rack engineering according to your warehouse space and load specs.", ar: "تصميم وتصنيع أنظمة تخزين مخصصة تناسب مساحة مستودعك وطبيعة أحمالك." }
		},
		{
			id: 2,
			icon: ShieldCheck,
			title: { en: "Supply & Professional Installation", ar: "التوريد والتركيب الهندسي" },
			desc: { en: "Fast delivery and professional on-site assembly with maximum safety standards.", ar: "شحن سريع وتركيب احترافي في الموقع بأيدي فنيين متخصصين ومعايير أمان عالية." }
		},
		{
			id: 3,
			icon: PhoneCall,
			title: { en: "Free Space Optimization", ar: "معاينة وتخطيط مساحات مجاناً" },
			desc: { en: "Free warehouse space optimization and load capacity engineering consultation.", ar: "معاينة هندسية وحساب مساحات التخزين وتقديم أفضل توزيع للأرفف مجاناً." }
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
