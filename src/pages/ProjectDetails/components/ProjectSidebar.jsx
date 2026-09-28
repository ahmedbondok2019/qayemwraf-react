import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import {
	Building2,
	MapPin,
	Calendar,
	Layers,
	CheckCircle2,
	Phone,
	MessageSquare,
	Share2,
	Copy,
	Download,
	Send
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/queries/useSettings";
import { trackWhatsAppClick, getWhatsAppUrl, normalizeWhatsAppNumber } from "@/lib/analytics";

export const ProjectSidebar = ({ project }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const { data: settings } = useSettings();

	if (!project) return null;

	const rawWhatsapp = settings?.social_links?.whatsapp || settings?.phone || "01154813836";
	const cleanWhatsapp = normalizeWhatsAppNumber(rawWhatsapp);

	const resolveText = (val) => {
		if (!val) return "";
		if (typeof val === "object") return val[language] || val.ar || val.en || "";
		return val;
	};

	const client = resolveText(project.client);
	const location = resolveText(project.location);
	const categoryTitle = resolveText(project.category?.title);
	const status = resolveText(project.status) || (isRtl ? "مكتمل بنجاح" : "Completed");
	const completionDate = project.completionDate;

	const handleCopyLink = () => {
		navigator.clipboard.writeText(window.location.href);
		toast.success(isRtl ? "تم نسخ رابط المشروع بنجاح!" : "Project link copied to clipboard!");
	};

	const handleShareWhatsApp = () => {
		const text = encodeURIComponent(
			`${resolveText(project.title)} - ${window.location.href}`
		);
		trackWhatsAppClick("project_sidebar_share", { url: `https://wa.me/?text=${text}`, project_id: project.id });
		window.open(`https://wa.me/?text=${text}`, "_blank");
	};

	return (
		<div className="flex flex-col gap-6 w-full lg:sticky lg:top-24">
			{/* Project Summary Card */}
			<div className="bg-surface border border-border rounded-3xl p-6 shadow-sm space-y-6">
				<h3 className="text-lg font-bold text-text border-b border-border/80 pb-4">
					{isRtl ? "بطاقة تعريف المشروع" : "Project Summary"}
				</h3>

				<div className="space-y-4 text-sm">
					{client && (
						<div className="flex items-start gap-3">
							<Building2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
							<div>
								<span className="block text-xs text-text-muted font-medium">
									{isRtl ? "العميل / الجهة" : "Client / Organization"}
								</span>
								<span className="font-bold text-text">{client}</span>
							</div>
						</div>
					)}

					{location && (
						<div className="flex items-start gap-3">
							<MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
							<div>
								<span className="block text-xs text-text-muted font-medium">
									{isRtl ? "الموقع الجغرافي" : "Location"}
								</span>
								<span className="font-bold text-text">{location}</span>
							</div>
						</div>
					)}

					{categoryTitle && (
						<div className="flex items-start gap-3">
							<Layers className="w-5 h-5 text-primary shrink-0 mt-0.5" />
							<div>
								<span className="block text-xs text-text-muted font-medium">
									{isRtl ? "تصنيف النظام" : "System Category"}
								</span>
								<span className="font-bold text-text">{categoryTitle}</span>
							</div>
						</div>
					)}

					{completionDate && (
						<div className="flex items-start gap-3">
							<Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
							<div>
								<span className="block text-xs text-text-muted font-medium">
									{isRtl ? "تاريخ الإنجاز" : "Completion Date"}
								</span>
								<span className="font-bold text-text">{completionDate}</span>
							</div>
						</div>
					)}

					<div className="flex items-start gap-3">
						<CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
						<div>
							<span className="block text-xs text-text-muted font-medium">
								{isRtl ? "حالة المشروع" : "Project Status"}
							</span>
							<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-success/15 text-success">
								{status}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Action & Quote Card */}
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-hover p-6 sm:p-7 text-white shadow-xl shadow-primary/20 space-y-5">
				<div className="space-y-2">
					<h3 className="text-xl font-black text-white tracking-tight">
						{isRtl ? "هل ترغب في تنفيذ مشروع مماثل؟" : "Want a Similar Storage Setup?"}
					</h3>
					<p className="text-white/90 text-sm leading-relaxed">
						{isRtl
							? "تواصل مباشرة مع استشاري الحلول التخزينية للحصول على مقايسة وتصميم هندسي ثلاثي الأبعاد مجاني."
							: "Contact our technical sales consultants for custom dimensioning and free 3D warehouse engineering layout."}
					</p>
				</div>

				<div className="flex flex-col gap-3 pt-2">
					<LocalizedLink
						to="/contact"
						className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-full bg-white text-primary hover:bg-slate-50 font-bold text-sm shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
					>
						<Send className="w-4 h-4 text-primary" />
						<span>{isRtl ? "طلب مقايسة وعرض سعر" : "Request a Detailed Quote"}</span>
					</LocalizedLink>

					{project.video && (
						<a
							href={project.video}
							target="_blank"
							rel="noopener noreferrer"
							className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-sm border border-white/20 transition-all"
						>
							<span>{isRtl ? "مشاهدة فيديو المشروع 🎬" : "Watch Project Video 🎬"}</span>
						</a>
					)}

					{project.link && (
						<a
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-sm border border-white/20 transition-all"
						>
							<span>{isRtl ? "زيارة رابط المشروع 🔗" : "Visit Project Link 🔗"}</span>
						</a>
					)}

					{(() => {
						const inquiryText = isRtl
							? `مرحباً، أود الاستفسار عن تفاصيل مشروع: ${resolveText(project.title)}`
							: `Hello, I would like to inquire about project: ${resolveText(project.title)}`;
						const waUrl = getWhatsAppUrl(cleanWhatsapp, inquiryText);
						return (
							<a
								href={waUrl}
								target="_blank"
								rel="noopener noreferrer"
								data-analytics-action="whatsapp"
								data-analytics-location="project_sidebar_inquiry"
								onClick={() => trackWhatsAppClick("project_sidebar_inquiry", { url: waUrl, phone: cleanWhatsapp, project_id: project.id })}
								className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-sm border border-white/20 transition-all"
							>
								<MessageSquare className="w-4 h-4" />
								<span>{isRtl ? "محادثة فورية عبر واتساب" : "Chat on WhatsApp"}</span>
							</a>
						);
					})()}
				</div>
			</div>

			{/* Share & Actions Toolbar */}
			<div className="bg-surface border border-border rounded-3xl p-5 shadow-xs space-y-4">
				<span className="block text-xs font-bold text-text uppercase tracking-wider">
					{isRtl ? "مشاركة المشروع" : "Share Project"}
				</span>
				<div className="flex items-center gap-3">
					<button
						type="button"
						data-analytics-action="whatsapp"
						data-analytics-location="project_sidebar_share"
						onClick={handleShareWhatsApp}
						className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-surface-2 hover:bg-success/15 hover:text-success text-text-secondary text-xs font-bold transition-colors cursor-pointer border border-border/60"
					>
						<MessageSquare className="w-3.5 h-3.5" />
						<span>واتساب</span>
					</button>
					<button
						type="button"
						onClick={handleCopyLink}
						className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-surface-2 hover:bg-primary/15 hover:text-primary text-text-secondary text-xs font-bold transition-colors cursor-pointer border border-border/60"
					>
						<Copy className="w-3.5 h-3.5" />
						<span>{isRtl ? "نسخ الرابط" : "Copy Link"}</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProjectSidebar;
