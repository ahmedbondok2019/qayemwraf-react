import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ShieldAlert, BookOpen, Clock } from "lucide-react";
import { usePages } from "@/hooks/queries/usePages";

export const Privacy = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const { data: pages = [], isLoading } = usePages();
	const privacyPage = pages.find(p => p.title?.includes("الخصوصية") || p.title?.includes("Privacy") || p.translations?.some(t => t.title?.includes("Privacy") || t.title?.includes("الخصوصية")));
	
	const pageData = privacyPage ? (privacyPage.translations?.find(t => t.locale === language) || {
		title: privacyPage.title || "",
		content: privacyPage.content || ""
	}) : null;

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Privacy Policy", ar: "سياسة الخصوصية" } }
	];

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			
			{/* Hero Banner */}
			<div className="bg-surface border-b border-border/60 py-10 mb-12">
				<Container>
					<Breadcrumb items={breadcrumbItems} className="mb-4" />
					<h1 className="text-3xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
						{isRtl ? "سياسة الخصوصية" : "Privacy Policy"}
					</h1>
					<div className="flex items-center gap-4 text-xs font-bold text-text-muted mt-4">
						<div className="flex items-center gap-1.5">
							<Clock className="w-4 h-4" />
							<span>{isRtl ? "آخر تحديث: أكتوبر ٢٠٢٦" : "Last updated: October 2026"}</span>
						</div>
						<div className="flex items-center gap-1.5">
							<BookOpen className="w-4 h-4" />
							<span>{isRtl ? "وقت القراءة: ٤ دقائق" : "Read time: 4 mins"}</span>
						</div>
					</div>
				</Container>
			</div>

			<Container>
				<div className="max-w-4xl mx-auto bg-surface border border-border/50 rounded-3xl p-6 sm:p-10 shadow-sm">


					{/* Policy Content */}
					<div className="prose prose-sm md:prose-base max-w-none text-text-secondary leading-relaxed flex flex-col gap-8 html-content">
						{isLoading ? (
							<div className="space-y-4">
								<div className="h-4 bg-slate-200 dark:bg-slate-800 animate-pulse rounded w-full"></div>
								<div className="h-4 bg-slate-200 dark:bg-slate-800 animate-pulse rounded w-11/12"></div>
								<div className="h-4 bg-slate-200 dark:bg-slate-800 animate-pulse rounded w-3/4"></div>
							</div>
						) : pageData?.content ? (
							<div dangerouslySetInnerHTML={{ __html: pageData.content }} className="space-y-4" />
						) : (
							<>
								{/* Section 1 */}
								<div className="flex flex-col gap-3">
									<h2 className="text-xl font-extrabold text-text">
										{isRtl ? "١. المعلومات التي نجمعها" : "1. Information We Collect"}
									</h2>
									<p>
										{isRtl 
											? "نقوم بجمع معلومات لمساعدتنا في تقديم وتحسين خدماتنا الصحية والطبية لك. تشمل هذه البيانات: الاسم، البريد الإلكتروني، رقم الهاتف، عنوان الشحن، وبيانات الوصفات الطبية (الروشتات) التي تقوم برفعها لتوفير الأجهزة والمستلزمات الملائمة."
											: "We collect information to provide better medical supply services. This includes personal details (name, email, phone, shipping address), payment info, and prescription uploads necessary to verify correct medical device purchases."}
									</p>
								</div>

								{/* Section 2 */}
								<div className="flex flex-col gap-3">
									<h2 className="text-xl font-extrabold text-text">
										{isRtl ? "٢. كيف نستخدم معلوماتك" : "2. How We Use Your Information"}
									</h2>
									<p>
										{isRtl
											? "نستخدم معلوماتك لـ: معالجة شحناتك الطبية وتوصيلها، معالجة المدفوعات بأمان، تقديم الدعم الفني للأجهزة وتدريب العملاء عليها، وإرسال تحديثات حالة الطلب عبر الرسائل القصيرة والبريد الإلكتروني."
											: "We process your information to process and deliver medical orders, process secure payments, provide customer technical support/training for devices, and send shipping/tracking updates via SMS or email."}
									</p>
								</div>

								{/* Section 3 */}
								<div className="flex flex-col gap-3">
									<h2 className="text-xl font-extrabold text-text">
										{isRtl ? "٣. سرية ومشاركة البيانات" : "3. Data Confidentiality & Sharing"}
									</h2>
									<p>
										{isRtl
											? "نحن لا نبيع أو نؤجر معلوماتك الشخصية أو الطبية لأي جهات خارجية. تتم مشاركة البيانات فقط مع شركات الشحن الطبية المتخصصة لتوصيل طلباتك، أو عند الالتزام بالمتطلبات القانونية والصحية الحكومية."
											: "We do not sell, rent, or trade your personal or medical data with third parties. Data is only shared with specialized medical courier services to deliver products, or to comply with official health department guidelines."}
									</p>
								</div>

								{/* Section 4 */}
								<div className="flex flex-col gap-3">
									<h2 className="text-xl font-extrabold text-text">
										{isRtl ? "٤. أمان البيانات والتشفير" : "4. Data Security & Encryption"}
									</h2>
									<p>
										{isRtl
											? "نطبق تدابير أمنية تقنية وتنظيمية متطورة بما في ذلك بروتوكول التشفير SSL لحماية بياناتك من الوصول غير المصرح به أو الفقدان أو التعديل."
											: "We implement advanced industry-standard technical security measures, including SSL encryption, to ensure your health records and personal information remain secure from unauthorized access."}
									</p>
								</div>
							</>
						)}
					</div>

				</div>
			</Container>

		</div>
	);
};

export default Privacy;
