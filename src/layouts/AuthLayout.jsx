import React from "react";
import { Outlet } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import LanguageSwitcher from "@/components/layout/Header/LanguageSwitcher";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { HeartPulse, ShieldCheck, Truck, CheckCircle2 } from "lucide-react";
import authIllustration from "@/assets/auth-illustration.png";

export const AuthLayout = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div 
			className="min-h-screen flex flex-col lg:flex-row bg-[#020817] text-text transition-all duration-300 relative overflow-hidden select-none"
			dir="ltr" // Force layout flow LTR (Slogan Left, Form Right)
		>
			
			{/* Animated Ambient Glowing Orbs in Background */}
			<div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none animate-pulse duration-[12000ms]" />
			<div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none animate-pulse duration-[10000ms] delay-2000" />
			
			{/* Left Column: Slogans & Background (Hidden on mobile) */}
			<div 
				className="hidden lg:flex lg:w-[48%] flex-col justify-between p-12 relative z-10 border-e border-slate-800/50 bg-[#020817] overflow-hidden shadow-2xl"
				dir={isRtl ? "rtl" : "ltr"} // Correct text direction inside branding column
			>
				
				{/* Full-width Background Image Layer */}
				<div className="absolute inset-0 z-0 pointer-events-none">
					<img 
						src={authIllustration} 
						alt="EG Medical Backdrop" 
						className="w-full h-full object-cover object-center opacity-40 mix-blend-screen animate-[pulse_15s_ease-in-out_infinite]"
					/>
					{/* Overlays for premium blending and readability */}
					<div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay" />
					<div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/30 to-[#020817]/70" />
					<div className="absolute inset-0 bg-gradient-to-b from-[#020817]/40 to-transparent" />
				</div>
				
				{/* Top Logo */}
				<LocalizedLink to="/" className="flex items-center gap-3 relative z-20">
					<img 
						src="/images/logo.jpeg" 
						alt="EGI Medical Logo" 
						className="h-20 w-auto object-contain rounded-xl"
					/>
				</LocalizedLink>

				{/* Center Content: Slogans overlaying the holographic Heart Cube Background */}
				<div className="relative flex-1 flex flex-col items-center justify-center my-auto py-12">
					
					{/* Slogan Title & Paragraph rendered ON TOP of the backdrop */}
					<div className="w-full text-center relative z-10 bg-slate-950/20 backdrop-blur-[2px] p-6 rounded-3xl border border-slate-800/10">
						<h1 className="text-4xl lg:text-5xl font-black text-white leading-[1.2] mb-4 select-none drop-shadow-md">
							{isRtl ? (
								<>
									مستقبل الرعاية الصحية
									<span className="block mt-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
										يبدأ من هنا
									</span>
								</>
							) : (
								<>
									The Future of Healthcare
									<span className="block mt-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
										Starts Here
									</span>
								</>
							)}
						</h1>
						<p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed font-semibold drop-shadow-sm">
							{isRtl 
								? "انضم إلى منصة EGI Medical واستمتع بتجربة تسوق آمنة، سهلة وموثوقة لكل احتياجاتك الطبية."
								: "Join the EGI Medical platform and enjoy a secure, easy, and reliable shopping experience for all your medical needs."}
						</p>
					</div>

				</div>

				{/* Bottom Trust Metrics Grid */}
				<div className="grid grid-cols-4 gap-3 mt-auto relative z-20">
					{/* Card 1 */}
					<div className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-900/40 border border-slate-850 backdrop-blur-md">
						<div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center mb-2">
							<CheckCircle2 className="w-4 h-4 text-blue-400" />
						</div>
						<span className="text-[10px] font-black text-white leading-tight">
							{isRtl ? "منتجات أصلية" : "Original Products"}
						</span>
						<span className="text-[8px] text-slate-400 mt-0.5">
							{isRtl ? "100% مضمونة" : "100% Guaranteed"}
						</span>
					</div>

					{/* Card 2 */}
					<div className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-900/40 border border-slate-850 backdrop-blur-md">
						<div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-2">
							<Truck className="w-4 h-4 text-indigo-400" />
						</div>
						<span className="text-[10px] font-black text-white leading-tight">
							{isRtl ? "توصيل سريع" : "Fast Delivery"}
						</span>
						<span className="text-[8px] text-slate-400 mt-0.5">
							{isRtl ? "لكل أنحاء مصر" : "All over Egypt"}
						</span>
					</div>

					{/* Card 3 */}
					<div className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-900/40 border border-slate-850 backdrop-blur-md">
						<div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-2">
							<HeartPulse className="w-4 h-4 text-cyan-400" />
						</div>
						<span className="text-[10px] font-black text-white leading-tight">
							{isRtl ? "دعم طبي" : "Medical Support"}
						</span>
						<span className="text-[8px] text-slate-400 mt-0.5">
							{isRtl ? "فريق من الخبراء" : "Team of Experts"}
						</span>
					</div>

					{/* Card 4 */}
					<div className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-900/40 border border-slate-850 backdrop-blur-md">
						<div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-2">
							<ShieldCheck className="w-4 h-4 text-emerald-400" />
						</div>
						<span className="text-[10px] font-black text-white leading-tight">
							{isRtl ? "دفع آمن" : "Secure Payment"}
						</span>
						<span className="text-[8px] text-slate-400 mt-0.5">
							{isRtl ? "حماية بياناتك" : "Data Protection"}
						</span>
					</div>
				</div>

			</div>

			{/* Right Column: Auth Form Container */}
			<div 
				className="flex-1 flex flex-col justify-between p-6 sm:p-10 relative z-10 w-full min-h-screen lg:min-h-0 bg-[#020817] lg:bg-transparent overflow-y-auto"
				dir={isRtl ? "rtl" : "ltr"} // Correct text direction inside form card column
			>
				
				{/* Top Navigation */}
				<div className="flex justify-between w-full items-center gap-4 relative z-25">
					<LanguageSwitcher />
					<LocalizedLink to="/" className="inline-flex items-center gap-2 lg:hidden">
						<img 
							src="/images/logo.jpeg" 
							alt="EGI Medical Logo" 
							className="h-14 w-auto object-contain rounded-lg"
						/>
					</LocalizedLink>
				</div>

				{/* Center Form Card */}
				<div className="w-full max-w-[620px] mx-auto my-auto py-6 mt-12 sm:mt-auto z-10">
					<div className="relative group">
						
						{/* Glowing frame around the form container */}
						<div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-1000" />
						
						{/* Solid Premium Dark Blue Card */}
						<div className="relative bg-[#070e20] border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-500/5">
							<Outlet />
						</div>
					</div>
				</div>

				{/* Bottom Footer / Copyright */}
				<div className="text-center text-xs text-slate-500 font-bold select-none py-2 relative z-25">
					© 2026 EGI Medical. All rights reserved.
				</div>

			</div>

		</div>
	);
};

export default AuthLayout;
