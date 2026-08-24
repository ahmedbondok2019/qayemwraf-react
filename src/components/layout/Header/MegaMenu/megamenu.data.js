import { Baby, Heart, Stethoscope, Pill, Apple, ShieldCheck, Dumbbell, Activity } from "lucide-react";

export const megaMenuData = [
	{
		id: "baby-care",
		title: { en: "Baby Care", ar: "العناية بالطفل" },
		icon: Baby,
		subcategories: [
			{
				title: { en: "Diapers & Wipes", ar: "الحفاضات والمناديل" },
				links: [
					{ name: { en: "Premium Diapers", ar: "حفاضات بريميوم" }, path: "/category/baby/diapers/premium" },
					{ name: { en: "Pants", ar: "كلوت أطفال" }, path: "/category/baby/diapers/pants" },
					{ name: { en: "Wet Wipes", ar: "مناديل مبللة" }, path: "/category/baby/wipes" },
					{ name: { en: "Rash Creams", ar: "كريمات التسلخات" }, path: "/category/baby/rash-creams" },
				]
			},
			{
				title: { en: "Bath & Skin Care", ar: "الاستحمام والعناية بالبشرة" },
				links: [
					{ name: { en: "Baby Shampoo", ar: "شامبو أطفال" }, path: "/category/baby/bath/shampoo" },
					{ name: { en: "Body Wash", ar: "غسول الجسم" }, path: "/category/baby/bath/body-wash" },
					{ name: { en: "Baby Lotions", ar: "لوشن أطفال" }, path: "/category/baby/skin/lotion" },
					{ name: { en: "Baby Oils", ar: "زيوت أطفال" }, path: "/category/baby/skin/oils" },
				]
			},
			{
				title: { en: "Feeding & Nursing", ar: "الرضاعة والتغذية" },
				links: [
					{ name: { en: "Baby Formula", ar: "حليب أطفال" }, path: "/category/baby/feeding/formula" },
					{ name: { en: "Feeding Bottles", ar: "ببرونات" }, path: "/category/baby/feeding/bottles" },
					{ name: { en: "Breast Pumps", ar: "مضخات حليب" }, path: "/category/baby/nursing/pumps" },
					{ name: { en: "Pacifiers", ar: "سكاتات (تيتينة)" }, path: "/category/baby/nursing/pacifiers" },
				]
			},
			{
				title: { en: "Gear & Safety", ar: "المعدات والأمان" },
				links: [
					{ name: { en: "Strollers", ar: "عربات أطفال" }, path: "/category/baby/gear/strollers" },
					{ name: { en: "Car Seats", ar: "مقاعد سيارات" }, path: "/category/baby/gear/car-seats" },
					{ name: { en: "Baby Monitors", ar: "أجهزة مراقبة الطفل" }, path: "/category/baby/safety/monitors" },
					{ name: { en: "Thermometers", ar: "ترمومترات للأطفال" }, path: "/category/baby/safety/thermometers" },
				]
			}
		],
		banner: {
			image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=600&fit=crop",
			title: { en: "Newborn Essentials", ar: "أساسيات حديثي الولادة" },
			link: "/campaigns/newborn"
		}
	},
	{
		id: "personal-care",
		title: { en: "Personal Care", ar: "العناية الشخصية" },
		icon: Heart,
		subcategories: [
			{
				title: { en: "Skin Care", ar: "العناية بالبشرة" },
				links: [
					{ name: { en: "Cleansers", ar: "غسول ومنظفات" }, path: "/category/personal-care/skin/cleansers" },
					{ name: { en: "Moisturizers", ar: "مرطبات" }, path: "/category/personal-care/skin/moisturizers" },
					{ name: { en: "Sun Care", ar: "واقي الشمس" }, path: "/category/personal-care/skin/sunblock" },
					{ name: { en: "Acne Treatments", ar: "علاجات حب الشباب" }, path: "/category/personal-care/skin/acne" },
				]
			},
			{
				title: { en: "Hair Care", ar: "العناية بالشعر" },
				links: [
					{ name: { en: "Shampoo & Conditioner", ar: "شامبو وبلسم" }, path: "/category/personal-care/hair/shampoo" },
					{ name: { en: "Hair Loss", ar: "تساقط الشعر" }, path: "/category/personal-care/hair/loss" },
					{ name: { en: "Styling Products", ar: "منتجات تصفيف" }, path: "/category/personal-care/hair/styling" },
				]
			},
			{
				title: { en: "Oral Care", ar: "العناية بالفم" },
				links: [
					{ name: { en: "Toothpaste", ar: "معجون أسنان" }, path: "/category/personal-care/oral/toothpaste" },
					{ name: { en: "Toothbrushes", ar: "فرش أسنان" }, path: "/category/personal-care/oral/brushes" },
					{ name: { en: "Mouthwash", ar: "غسول الفم" }, path: "/category/personal-care/oral/mouthwash" },
				]
			}
		]
	},
	{
		id: "medical-devices",
		title: { en: "Medical Devices", ar: "الأجهزة الطبية" },
		icon: Stethoscope,
		subcategories: [
			{
				title: { en: "Monitoring", ar: "أجهزة القياس والمراقبة" },
				links: [
					{ name: { en: "Blood Pressure Monitors", ar: "أجهزة ضغط الدم" }, path: "/category/devices/bp-monitors" },
					{ name: { en: "Blood Glucose Monitors", ar: "أجهزة قياس السكر" }, path: "/category/devices/glucose" },
					{ name: { en: "Pulse Oximeters", ar: "أجهزة قياس الأكسجين" }, path: "/category/devices/oximeters" },
					{ name: { en: "Thermometers", ar: "ترمومترات" }, path: "/category/devices/thermometers" },
				]
			},
			{
				title: { en: "Respiratory Support", ar: "أجهزة التنفس" },
				links: [
					{ name: { en: "Nebulizers", ar: "أجهزة الاستنشاق (نيبولايزر)" }, path: "/category/devices/nebulizers" },
					{ name: { en: "Oxygen Concentrators", ar: "مولدات الأكسجين" }, path: "/category/devices/oxygen" },
					{ name: { en: "CPAP Machines", ar: "أجهزة التنفس الصناعي CPAP" }, path: "/category/devices/cpap" },
				]
			},
			{
				title: { en: "Mobility Aids", ar: "مساعدات الحركة" },
				links: [
					{ name: { en: "Wheelchairs", ar: "كراسي متحركة" }, path: "/category/devices/mobility/wheelchairs" },
					{ name: { en: "Walkers & Rollators", ar: "مشايات طبية" }, path: "/category/devices/mobility/walkers" },
					{ name: { en: "Crutches & Canes", ar: "عكازات وعصي" }, path: "/category/devices/mobility/crutches" },
				]
			}
		]
	},
	{
		id: "medicines",
		title: { en: "Medicines & Treatments", ar: "الأدوية والعلاجات" },
		icon: Pill,
		subcategories: [
			{
				title: { en: "Pain Relief", ar: "مسكنات الألم" },
				links: [
					{ name: { en: "Headache & Fever", ar: "الصداع والحرارة" }, path: "/category/medicines/pain/headache" },
					{ name: { en: "Muscle & Joint Pain", ar: "ألم العضلات والمفاصل" }, path: "/category/medicines/pain/muscle" },
				]
			},
			{
				title: { en: "Cold & Flu", ar: "البرد والإنفلونزا" },
				links: [
					{ name: { en: "Cough Syrups", ar: "أدوية السعال" }, path: "/category/medicines/cold/cough" },
					{ name: { en: "Sore Throat", ar: "احتقان الحلق" }, path: "/category/medicines/cold/throat" },
				]
			},
			{
				title: { en: "Digestive Care", ar: "العناية بالجهاز الهضمي" },
				links: [
					{ name: { en: "Antacids", ar: "مضادات الحموضة" }, path: "/category/medicines/digestive/antacids" },
					{ name: { en: "Laxatives", ar: "الملينات" }, path: "/category/medicines/digestive/laxatives" },
				]
			}
		]
	},
	{
		id: "vitamins-supplements",
		title: { en: "Vitamins & Nutrition", ar: "الفيتامينات والمكملات" },
		icon: Apple,
		subcategories: [
			{
				title: { en: "Vitamins", ar: "فيتامينات" },
				links: [
					{ name: { en: "Multivitamins", ar: "فيتامينات متعددة" }, path: "/category/vitamins/multivitamins" },
					{ name: { en: "Vitamin C & Immunity", ar: "فيتامين سي والمناعة" }, path: "/category/vitamins/c" },
					{ name: { en: "Vitamin D & Calcium", ar: "فيتامين د وكالسيوم" }, path: "/category/vitamins/d" },
				]
			},
			{
				title: { en: "Supplements", ar: "مكملات غذائية" },
				links: [
					{ name: { en: "Omega 3 & Fish Oil", ar: "أوميجا 3 وزيت السمك" }, path: "/category/vitamins/omega3" },
					{ name: { en: "Iron Supplements", ar: "مكملات الحديد" }, path: "/category/vitamins/iron" },
					{ name: { en: "Collagen", ar: "كولاجين" }, path: "/category/vitamins/collagen" },
				]
			}
		]
	},
	{
		id: "fitness-health",
		title: { en: "Fitness & Health", ar: "اللياقة والصحة العامة" },
		icon: Dumbbell,
		subcategories: [
			{
				title: { en: "Sports Nutrition", ar: "التغذية الرياضية" },
				links: [
					{ name: { en: "Whey Protein", ar: "بروتين مصل اللبن" }, path: "/category/fitness/protein" },
					{ name: { en: "Amino Acids", ar: "أحماض أمينية" }, path: "/category/fitness/amino" },
					{ name: { en: "Pre-Workout", ar: "مكملات قبل التمرين" }, path: "/category/fitness/pre-workout" },
				]
			},
			{
				title: { en: "Supports & Braces", ar: "الدعامات الطبية" },
				links: [
					{ name: { en: "Knee Supports", ar: "دعامات الركبة" }, path: "/category/fitness/supports/knee" },
					{ name: { en: "Back Supports", ar: "أحزمة الظهر" }, path: "/category/fitness/supports/back" },
					{ name: { en: "Ankle & Wrist", ar: "دعامات الكاحل والمعصم" }, path: "/category/fitness/supports/ankle-wrist" },
				]
			}
		]
	}
];
