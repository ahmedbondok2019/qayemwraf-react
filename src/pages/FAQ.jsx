import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Search, ChevronDown, HelpCircle, Package, Receipt, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const FAQ = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "FAQ", ar: "الأسئلة الشائعة" } }
	];

	const categories = [
		{ id: "all", label: { en: "All Questions", ar: "كل الأسئلة" }, icon: Sparkles },
		{ id: "delivery", label: { en: "Shipping & Delivery", ar: "الشحن والتوصيل" }, icon: Package },
		{ id: "payment", label: { en: "Payment & Returns", ar: "الدفع والإرجاع" }, icon: Receipt },
	];

	const faqs = [
		{
			id: 1,
			category: "delivery",
			question: {
				en: "How long does shipping take within Egypt?",
				ar: "كم يستغرق الشحن داخل مصر؟"
			},
			answer: {
				en: "For Cairo and Giza, deliveries take 24 to 48 hours. For Alexandria and other Delta cities, it takes 2-3 business days. For Upper Egypt and remote areas, it may take 4-5 business days.",
				ar: "بالنسبة للقاهرة والجيزة، يستغرق التوصيل من ٢٤ إلى ٤٨ ساعة. الإسكندرية ومحافظات الدلتا ٢-٣ أيام عمل. الصعيد والمناطق النائية ٤-٥ أيام عمل."
			}
		},
		{
			id: 2,
			category: "delivery",
			question: {
				en: "Do you offer free delivery?",
				ar: "هل تقدمون شحن مجاني؟"
			},
			answer: {
				en: "Yes, we offer free shipping on all orders over 50 EGP (or equivalent in USD for medical equipment) across Egypt.",
				ar: "نعم، نقدم شحن مجاني لكافة الطلبات التي تزيد قيمتها عن 50 جنيهاً مصرياً (أو ما يعادلها للأجهزة الطبية) لجميع أنحاء مصر."
			}
		},
		{
			id: 3,
			category: "payment",
			question: {
				en: "What payment methods do you accept?",
				ar: "ما هي طرق الدفع المقبولة لديكم؟"
			},
			answer: {
				en: "We accept Cash on Delivery (COD), major credit cards (Visa, MasterCard), and local wallets (Fawry, Vodafone Cash).",
				ar: "نقبل الدفع عند الاستلام (COD)، البطاقات الائتمانية (Visa, MasterCard)، والمحافظ المحلية (Fawry, Vodafone Cash)."
			}
		},
		{
			id: 4,
			category: "payment",
			question: {
				en: "What is your return policy for medical devices?",
				ar: "ما هي سياسة الإرجاع الخاصة بالأجهزة الطبية؟"
			},
			answer: {
				en: "Due to health regulations, medical devices can be returned within 14 days of receipt ONLY if the packaging is sealed, unopened, and in its original condition, unless the product has a manufacturing defect.",
				ar: "نظراً للاشتراطات الصحية، يمكن إرجاع الأجهزة الطبية في غضون 14 يوماً من الاستلام فقط إذا كانت العبوة مغلقة وبحالتها الأصلية، ما لم يكن بالمنتج عيب صناعة."
			}
		},
		{
			id: 5,
			category: "general",
			question: {
				en: "Are your products authorized by the Ministry of Health?",
				ar: "هل منتجاتكم معتمدة من وزارة الصحة؟"
			},
			answer: {
				en: "Absolutely. All medical devices, instruments, and consumables distributed by EG Medical are fully authorized by the Egyptian Drug Authority (EDA) and the Ministry of Health.",
				ar: "بالتأكيد. جميع الأجهزة والأدوات الطبية والمستلزمات الموزعة مرخصة بالكامل من هيئة الدواء المصرية (EDA) ووزارة الصحة."
			}
		}
	];

	const [searchQuery, setSearchQuery] = useState("");
	const [activeCategory, setActiveCategory] = useState("all");
	const [openFaqId, setOpenFaqId] = useState(null);

	const toggleFaq = (id) => {
		setOpenFaqId(openFaqId === id ? null : id);
	};

	const filteredFaqs = faqs.filter(faq => {
		const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
		const matchesSearch = faq.question[language].toLowerCase().includes(searchQuery.toLowerCase()) || 
		                      faq.answer[language].toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			
			{/* Hero Banner */}
			<div className="bg-surface border-b border-border/60 py-10 mb-12">
				<Container>
					<Breadcrumb items={breadcrumbItems} className="mb-4" />
					<h1 className="text-3xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
						{isRtl ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
					</h1>
					
					{/* FAQ Search Bar */}
					<div className="relative w-full max-w-xl mt-6">
						<input 
							type="text" 
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
							placeholder={isRtl ? "ابحث عن سؤالك هنا..." : "Search your question here..."}
							className="w-full h-12 ps-12 pe-4 bg-surface-2 border border-border/80 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-semibold"
						/>
						<Search className="w-5 h-5 text-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
					</div>
				</Container>
			</div>

			<Container>
				<div className="flex flex-col lg:flex-row gap-8 items-start">
					
					{/* Category Tabs (Sidebar) */}
					<div className="w-full lg:w-64 shrink-0 bg-surface rounded-2xl border border-border/50 p-4 sticky top-24 shadow-sm">
						<nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible hide-scrollbar">
							{categories.map(cat => {
								const Icon = cat.icon;
								const isActive = activeCategory === cat.id;
								return (
									<button
										key={cat.id}
										onClick={() => setActiveCategory(cat.id)}
										className={cn(
											"flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm text-start whitespace-nowrap",
											isActive 
												? "bg-primary text-white shadow-md shadow-primary/20" 
												: "text-text-secondary hover:bg-surface-2 hover:text-primary"
										)}
									>
										<Icon className="w-4 h-4 shrink-0" />
										{cat.label[language]}
									</button>
								);
							})}
						</nav>
					</div>

					{/* FAQ Accordions List */}
					<div className="flex-1 w-full min-w-0 flex flex-col gap-4">
						{filteredFaqs.length > 0 ? (
							filteredFaqs.map(faq => {
								const isOpen = openFaqId === faq.id;
								return (
									<div 
										key={faq.id} 
										className={cn(
											"bg-surface rounded-2xl border border-border/50 overflow-hidden transition-all shadow-sm",
											isOpen && "border-primary/50 ring-1 ring-primary/20"
										)}
									>
										<button 
											onClick={() => toggleFaq(faq.id)}
											className="w-full p-5 flex items-center justify-between text-start font-bold text-text hover:text-primary transition-colors gap-4"
										>
											<span className="text-sm sm:text-base leading-relaxed">{faq.question[language]}</span>
											<ChevronDown className={cn("w-5 h-5 text-text-muted shrink-0 transition-transform duration-300", isOpen && "rotate-180")} />
										</button>
										
										{/* Accordion Content */}
										<div 
											className={cn(
												"px-5 pb-5 pt-1 text-sm text-text-secondary leading-relaxed border-t border-border/30 bg-surface-2/10 transition-all duration-300",
												isOpen ? "block" : "hidden"
											)}
										>
											{faq.answer[language]}
										</div>
									</div>
								);
							})
						) : (
							<div className="text-center py-16 bg-surface rounded-2xl border border-border/50">
								<HelpCircle className="w-12 h-12 text-border mx-auto mb-3" />
								<p className="text-text-secondary font-medium">
									{isRtl ? "لم نعثر على أسئلة تطابق بحثك." : "No FAQs matching your search query."}
								</p>
							</div>
						)}
					</div>

				</div>
			</Container>

		</div>
	);
};

export default FAQ;
