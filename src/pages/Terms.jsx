import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { AlertTriangle, Clock, BookOpen } from "lucide-react";
import { usePages } from "@/hooks/queries/usePages";

export const Terms = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const { data: pages = [], isLoading } = usePages();
	const termsPage = pages.find(p => p.title?.includes("الشروط") || p.title?.includes("Terms") || p.translations?.some(t => t.title?.includes("Terms") || t.title?.includes("الشروط")));
	
	const pageData = termsPage ? (termsPage.translations?.find(t => t.locale === language) || {
		title: termsPage.title || "",
		content: termsPage.content || ""
	}) : null;

	const breadcrumbItems = [
		{ label: { en: "Home", ar: "الرئيسية" }, link: "/" },
		{ label: { en: "Terms of Service", ar: "شروط الاستخدام" } }
	];

	return (
		<div className="flex flex-col w-full min-h-screen bg-background pb-16">
			
			{/* Hero Banner */}
			<div className="bg-surface border-b border-border/60 py-10 mb-12">
				<Container>
					<Breadcrumb items={breadcrumbItems} className="mb-4" />
					<h1 className="text-3xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
						{isRtl ? "شروط الاستخدام" : "Terms of Service"}
					</h1>
					<div className="flex items-center gap-4 text-xs font-bold text-text-muted mt-4">
						<div className="flex items-center gap-1.5">
							<Clock className="w-4 h-4" />
							<span>{isRtl ? "آخر تحديث: أكتوبر ٢٠٢٦" : "Last updated: October 2026"}</span>
						</div>
						<div className="flex items-center gap-1.5">
							<BookOpen className="w-4 h-4" />
							<span>{isRtl ? "وقت القراءة: ٥ دقائق" : "Read time: 5 mins"}</span>
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
										{isRtl ? "١. قبول الشروط" : "1. Acceptance of Terms"}
									</h2>
									<p>
										{isRtl 
											? "باستخدامك لموقعنا الإلكتروني وشراء منتجاتك منه، فإنك توافق بالكامل على الالتزام بشروط الاستخدام المذكورة هنا وكافة القوانين الصناعية والتجارية المصرية ذات الصلة."
											: "By accessing and using this website to purchase storage supplies, you fully accept and agree to comply with these Terms of Service and all applicable industrial and commerce laws in Egypt."}
									</p>
								</div>

								{/* Section 2 */}
								<div className="flex flex-col gap-3">
									<h2 className="text-xl font-extrabold text-text">
										{isRtl ? "٢. أهلية تجهيز المشروعات" : "2. Purchase Eligibility"}
									</h2>
									<p>
										{isRtl
											? "قد تتطلب بعض التجهيزات الصناعية المتخصصة تقديم تراخيص صناعية وتجارية (مثل المصانع والمستودعات الكبيرة). نحن نحتفظ بالحق في إلغاء أي طلب لا يستوفي الشروط أو التراخيص المطلوبة."
											: "Certain professional-grade storage installations may require proof of registration (such as for factories or large warehouses). We reserve the right to cancel orders that do not meet professional purchase criteria."}
									</p>
								</div>

								{/* Section 3 */}
								<div className="flex flex-col gap-3">
									<h2 className="text-xl font-extrabold text-text">
										{isRtl ? "٣. دقة الأسعار والبيانات الهندسية للمنتجات" : "3. Product Information & Pricing"}
									</h2>
									<p>
										{isRtl
											? "نسعى لتقديم أدق التفاصيل التقنية للأنظمة والأسعار. في حال وجود خطأ مطبعي في السعر أو المواصفات، سيتم التواصل معك فوراً وتعديل الطلب أو إلغائه واسترداد المبلغ بالكامل."
											: "We strive for complete accuracy in hardware specifications and pricing. In the rare event of typographical errors, we reserve the right to contact you to adjust or cancel the order with a full refund."}
									</p>
								</div>

								{/* Section 4 */}
								<div className="flex flex-col gap-3">
									<h2 className="text-xl font-extrabold text-text">
										{isRtl ? "٤. المسؤولية القانونية" : "4. Limitation of Liability"}
									</h2>
									<p>
										{isRtl
											? "لا تتحمل مؤسسة قائم ورف المسؤولية عن أي أضرار ناتجة عن الاستخدام الخاطئ لوحدات التخزين، أو عدم اتباع تعليمات الاستخدام والحمولة القصوى المرفقة من قبل المصنعين."
											: "Qayem & Raf is not liable for any direct or indirect damages resulting from the misuse of purchased storage systems, or the failure to follow the manufacturer's user manual and load directions."}
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

export default Terms;
