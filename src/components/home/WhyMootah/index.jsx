import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Section } from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { ShieldCheck, Award, Wrench, CheckCircle, Star, Heart, TrendingUp, Settings, HardHat } from "lucide-react";

const ICON_MAP = {
	"shield_check": ShieldCheck,
	"award": Award,
	"hard_hat": HardHat,
	"wrench": Wrench,
	"star": Star,
	"heart": Heart,
	"trending_up": TrendingUp,
	"settings": Settings,
};

const valueProps = [
	{
		id: "quality",
		icon: ShieldCheck,
		title: { en: "High Grade Steel", ar: "أعلى جودة صاج وفولاذ" },
		desc: { en: "Manufactured from cold-rolled steel with superior load capacity.", ar: "تصنيع من أجود خامات الصاج المدرفل على البارد لتحمل أقصى الأوزان." }
	},
	{
		id: "engineering",
		icon: Award,
		title: { en: "Certified Engineering", ar: "مطابقة للمواصفات القياسية" },
		desc: { en: "Engineered to withstand heavy loads and rigorous warehouse usage.", ar: "تصميم هندسي متقن ومطابق لأعلى معايير الأمان والسلامة الصناعية." }
	},
	{
		id: "experts",
		icon: HardHat,
		title: { en: "Storage Specialists", ar: "استشارات وتخطيط مساحات" },
		desc: { en: "Engineering team ready to assist with warehouse layout & specs.", ar: "فريق هندسي متخصص لمساعدتك في استغلال وتخطيط كل متر في مستودعك." }
	},
	{
		id: "warranty",
		icon: Wrench,
		title: { en: "Fast Supply & Installation", ar: "سرعة في التوريد والتركيب" },
		desc: { en: "Complete warranty, on-site assembly, and after-sales support.", ar: "ضمان شامل وتوريد سريع مع تركيب احترافي وخدمة ما بعد البيع." }
	}
];

export const WhyMootah = ({ data }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const title = data?.title || (isRtl ? "لماذا تختار قايم ورف؟" : "Why Choose Qayem & Raf?");
	const subtitle = data?.subtitle || (isRtl ? "نحن نضع معايير جديدة للجودة والمتانة في تصنيع وتوريد أنظمة الرفوف والمشغولات المعدنية" : "Setting new standards for quality, strength, and durability in storage systems and metal works");

	const itemsToDisplay = data?.items && data.items.length > 0 ? data.items.map(item => ({
		id: item.id,
		IconComp: ICON_MAP[item.icon] || CheckCircle,
		title: item.title,
		desc: item.description
	})) : valueProps.map(prop => ({
		id: prop.id,
		IconComp: prop.icon,
		title: prop.title[language],
		desc: prop.desc[language]
	}));

	return (
		<Section spacing="lg" className="bg-slate-900 text-white relative overflow-hidden">
			{/* Decorative background glows */}
			<div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

			<Container className="relative z-10">
				<div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 tracking-tight">
						{title}
					</h2>
					<p className="text-slate-400 text-sm sm:text-base lg:text-lg">
						{subtitle}
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
					{itemsToDisplay.map((prop) => {
						const IconComp = prop.IconComp;
						return (
							<div
								key={prop.id}
								className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 sm:p-6 flex flex-col items-start hover:border-primary/50 hover:bg-slate-800 transition-all duration-300 group"
							>
								<div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center mb-4 sm:mb-6 transition-colors duration-300">
									<IconComp className="w-5 h-5 sm:w-7 sm:h-7" />
								</div>
								<h3 className="text-base sm:text-xl font-bold text-white mb-1 sm:mb-2">
									{prop.title}
								</h3>
								<p className="text-slate-400 text-sm leading-relaxed">
									{prop.desc}
								</p>
							</div>
						);
					})}
				</div>
			</Container>
		</Section>
	);
};

export default WhyMootah;

