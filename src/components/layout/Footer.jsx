import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import Container from "@/components/ui/Container";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/queries/useSettings";
import { toast } from "sonner";

export const Footer = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const { data: settings } = useSettings();

	return (
		<footer className="bg-slate-900 pt-10 sm:pt-16 pb-6 sm:pb-8 text-slate-300 border-t border-slate-800">
			<Container>
				{/* Top Section - Google Maps Location */}
				<div className="bg-slate-800/60 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 mb-10 sm:mb-16 border border-slate-700/60 relative overflow-hidden shadow-xl">
					<div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 relative z-10">
						{/* Location Details & Directions */}
						<div className="lg:w-1/3 flex flex-col justify-between space-y-4">
							<div>
								<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-3">
									<MapPin className="w-3.5 h-3.5 text-primary" />
									<span>{isRtl ? "موقع المعرض والمبيعات" : "Showroom & Sales Location"}</span>
								</div>
								<h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
									{isRtl ? "تفضل بزيارتنا في المعرض" : "Visit Our Showroom"}
								</h3>
								<p className="text-slate-400 text-sm leading-relaxed mb-4">
									{isRtl
										? "35 عمارات التوفيقية، شرق مدينة نصر (امتداد مصطفى النحاس - قرب النادي الأهلي)، القاهرة."
										: "35 Al-Tawfiqia Buildings, East Nasr City (Mustafa El-Nahas Ext - near Al-Ahly Club), Cairo, Egypt."}
								</p>
								<div className="space-y-2 text-xs text-slate-300">
									<div className="flex items-center gap-2">
										<span className="w-2 h-2 rounded-full bg-success"></span>
										<span>{isRtl ? "مواعيد العمل: يومياً من 9:00 ص إلى 10:00 م" : "Working Hours: Daily 9:00 AM - 10:00 PM"}</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="w-2 h-2 rounded-full bg-primary"></span>
										<span>{isRtl ? "معاينة وفحص كافة أنواع الأرفف والمشغولات" : "Inspect all rack samples & metal works in person"}</span>
									</div>
								</div>
							</div>

							<a
								href="https://maps.app.goo.gl/u9Zs1ikL4h1uVDFa8"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm shadow-md transition-all hover:shadow-primary/20 hover:-translate-y-0.5"
							>
								<MapPin className="w-4 h-4" />
								<span>{isRtl ? "فتح الموقع على Google Maps" : "Open in Google Maps"}</span>
							</a>
						</div>

						{/* Map Iframe */}
						<div className="lg:w-2/3 w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-slate-700/80 shadow-inner relative bg-slate-900">
							<iframe
								title={isRtl ? "موقع قايم ورف على الخريطة" : "Qayem & Raf Google Map"}
								src="https://maps.google.com/maps?q=30.0384,31.3655&hl=ar&z=15&output=embed"
								className="w-full h-full border-0"
								loading="lazy"
								allowFullScreen
								referrerPolicy="no-referrer-when-downgrade"
							/>
						</div>
					</div>
				</div>

				{/* Main Footer Links */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-16">
					
					{/* Brand Info */}
					<div className="space-y-6">
						<LocalizedLink to="/" className="inline-block group" aria-label={isRtl ? "قايم ورف للمشغولات المعدنية وحلول التخزين" : "Qayem & Raf"}>
							<div className="flex items-center">
								<img 
									src={settings?.logo || "/images/logo.jpg"} 
									alt={isRtl ? "قايم ورف للمشغولات المعدنية وحلول التخزين" : "Qayem & Raf"} 
									className="h-12 sm:h-14 w-auto object-contain rounded-xl shadow-sm" 
								/>
							</div>
						</LocalizedLink>
						<p className="text-slate-400 text-sm leading-relaxed">
							{isRtl
								? "متخصصون في تصميم وتوريد وتركيب أحدث أنظمة التخزين الذكية والمشغولات المعدنية للمؤسسات والمستودعات والمحلات التجارية بأعلى معايير الجودة والموثوقية في مصر."
								: "Specialized in designing, manufacturing, supplying, and installing smart metal storage solutions for commercial institutions, shops, and warehouses according to top quality standards."}
						</p>
						<div className="flex items-center gap-4">
							{settings?.social_links?.facebook && (
								<a href={settings.social_links.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all text-slate-400">
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
								</a>
							)}
							{settings?.social_links?.twitter && (
								<a href={settings.social_links.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all text-slate-400">
									<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
								</a>
							)}
							{settings?.social_links?.instagram && (
								<a href={settings.social_links.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all text-slate-400">
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
								</a>
							)}
							{settings?.social_links?.linkedin && (
								<a href={settings.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all text-slate-400">
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
								</a>
							)}
							{settings?.social_links?.whatsapp && (
								<a href={`https://wa.me/${settings.social_links.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-success hover:text-white transition-all text-slate-400">
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.817 1.453 5.461 0 9.902-4.44 9.905-9.902.002-2.646-1.02-5.133-2.878-6.993-1.858-1.859-4.343-2.882-6.996-2.883-5.462 0-9.907 4.446-9.91 9.908-.002 1.84.481 3.637 1.4 5.202l-1.023 3.733 3.829-1.004-.337.218zm10.742-7.394c-.266-.134-1.583-.78-1.83-.87-.246-.09-.425-.134-.604.134-.18.268-.696.87-.852 1.05-.156.18-.312.2-.578.066-.266-.134-1.123-.414-2.14-1.321-.79-.704-1.323-1.572-1.479-1.84-.156-.268-.016-.413.118-.546.12-.12.266-.312.4-.468.133-.156.178-.268.266-.446.088-.178.044-.334-.022-.468-.067-.134-.604-1.456-.827-1.99-.217-.524-.457-.453-.624-.461-.16-.008-.344-.01-.527-.01-.18 0-.476.068-.724.34-.248.272-.946.924-.946 2.256 0 1.332.969 2.616 1.104 2.8.134.183 1.907 2.91 4.62 4.08.647.278 1.151.444 1.545.57.65.207 1.242.177 1.71.107.521-.078 1.583-.647 1.808-1.272.224-.624.224-1.157.157-1.272-.068-.114-.247-.206-.513-.34z"/></svg>
								</a>
							)}
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-lg font-bold text-white mb-6">
							{isRtl ? "روابط سريعة" : "Quick Links"}
						</h4>
						<ul className="space-y-4">
							<li><LocalizedLink to="/about" className="text-slate-400 hover:text-primary transition-colors inline-block">{isRtl ? "عن المصنع" : "About Us"}</LocalizedLink></li>
							<li><LocalizedLink to="/projects" className="text-slate-400 hover:text-primary transition-colors inline-block">{isRtl ? "سابقة أعمالنا ومشاريعنا" : "Our Projects & Portfolio"}</LocalizedLink></li>
							<li><LocalizedLink to="/products" className="text-slate-400 hover:text-primary transition-colors inline-block">{isRtl ? "كتالوج المنتجات" : "Product Catalog"}</LocalizedLink></li>
						</ul>
					</div>

					{/* Customer Service */}
					<div>
						<h4 className="text-lg font-bold text-white mb-6">
							{isRtl ? "خدمة العملاء" : "Customer Service"}
						</h4>
						<ul className="space-y-4">
							<li><LocalizedLink to="/privacy" className="text-slate-400 hover:text-primary transition-colors inline-block">{isRtl ? "سياسة الخصوصية" : "Privacy Policy"}</LocalizedLink></li>
							<li><LocalizedLink to="/terms" className="text-slate-400 hover:text-primary transition-colors inline-block">{isRtl ? "الشروط والأحكام" : "Terms & Conditions"}</LocalizedLink></li>
							<li><LocalizedLink to="/faq" className="text-slate-400 hover:text-primary transition-colors inline-block">{isRtl ? "الأسئلة الشائعة" : "FAQ"}</LocalizedLink></li>
							<li><LocalizedLink to="/contact" className="text-slate-400 hover:text-primary transition-colors inline-block">{isRtl ? "اتصل بنا" : "Contact Us"}</LocalizedLink></li>
						</ul>
					</div>

					{/* Contact Info (Transparency) */}
					<div>
						<h4 className="text-lg font-bold text-white mb-6">
							{isRtl ? "تواصل معنا" : "Contact Us"}
						</h4>
						<ul className="space-y-4 text-sm">
							{/* Showroom Address */}
							{(settings?.showroom_address || settings?.address) && (
								<li className="flex items-start gap-3 text-slate-400">
									<MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
									<div className="flex flex-col">
										<span className="text-xs font-semibold text-white/90">
											{isRtl ? "عنوان المعرض:" : "Showroom Address:"}
										</span>
										<span className="text-xs leading-relaxed text-slate-300">
											{(() => {
												const val = settings.showroom_address || settings.address;
												return typeof val === 'object' ? (val[language] || val.ar || val.en || "") : val;
											})()}
										</span>
									</div>
								</li>
							)}
							{/* Factory Address */}
							{settings?.factory_address && (
								<li className="flex items-start gap-3 text-slate-400">
									<MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
									<div className="flex flex-col">
										<span className="text-xs font-semibold text-white/90">
											{isRtl ? "عنوان المصنع:" : "Factory Address:"}
										</span>
										<span className="text-xs leading-relaxed text-slate-300">
											{typeof settings.factory_address === 'object'
												? (settings.factory_address[language] || settings.factory_address.ar || settings.factory_address.en || "")
												: settings.factory_address}
										</span>
									</div>
								</li>
							)}
							{settings?.phone && (
								<li className="flex items-center gap-3 text-slate-400">
									<Phone className="w-5 h-5 text-orange-500 shrink-0" />
									<a href={`tel:${settings.phone}`} className="hover:text-primary transition-colors" dir="ltr">
										{settings.phone}
									</a>
								</li>
							)}
							{settings?.contact_email && (
								<li className="flex items-center gap-3 text-slate-400">
									<Mail className="w-5 h-5 text-orange-500 shrink-0" />
									<a href={`mailto:${settings.contact_email}`} className="hover:text-primary transition-colors">
										{settings.contact_email}
									</a>
								</li>
							)}
						</ul>
					</div>

				</div>

				{/* Bottom Bar */}
				<div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="text-slate-500 text-sm">
						&copy; {new Date().getFullYear()} Qayem & Raf. {isRtl ? "جميع الحقوق محفوظة." : "All rights reserved."}
					</p>
					
					<div className="flex items-center gap-6 text-sm text-slate-500">
						<LocalizedLink to="/privacy" className="hover:text-primary transition-colors">
							{isRtl ? "سياسة الخصوصية" : "Privacy Policy"}
						</LocalizedLink>
						<LocalizedLink to="/terms" className="hover:text-primary transition-colors">
							{isRtl ? "الشروط والأحكام" : "Terms & Conditions"}
						</LocalizedLink>
					</div>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
