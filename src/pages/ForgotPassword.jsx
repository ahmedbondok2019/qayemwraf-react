import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { authValidators } from "@/features/auth/validation/authSchemas";
import authService from "@/features/auth/services/authService";
import { AuthFooter } from "@/features/auth";
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft, Mail } from "lucide-react";
import { normalizeApiError } from "@/utils/errorMapper";
import { cn } from "@/lib/utils";

export const ForgotPassword = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [loading, setLoading] = useState(false);

	const [emailFocused, setEmailFocused] = useState(false);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		const emailErr = authValidators.email(email);
		if (emailErr) {
			setError(emailErr);
			return;
		}

		setLoading(true);
		try {
			await authService.forgetPassword(email);
			setSuccess(isRtl ? "تم إرسال رمز التحقق بنجاح!" : "Verification code sent successfully!");
			
			// Redirect to Verify OTP page after 1.5s
			setTimeout(() => {
				navigate(`/${language}/auth/verify-otp?email=${encodeURIComponent(email)}`);
			}, 1500);
		} catch (err) {
			const { generalMessage } = normalizeApiError(err);
			setError({ en: generalMessage, ar: generalMessage });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
			{/* Page Header */}
			<div className="flex flex-col gap-2 text-center sm:text-start">
				<h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
					{isRtl ? "نسيت كلمة المرور؟" : "Forgot Password?"}
				</h2>
				<p className="text-sm font-semibold text-slate-400">
					{isRtl ? "أدخل بريدك الإلكتروني لإرسال رمز تأكيد الـ OTP" : "Enter your email to receive a verification code"}
				</p>
			</div>

			{/* Status Alerts */}
			{success && (
				<div className="p-4 bg-success/10 border border-success/30 rounded-2xl flex items-center gap-3 text-success animate-in fade-in zoom-in-95 duration-300 shadow-sm shadow-success/10">
					<CheckCircle2 className="w-5 h-5 shrink-0" />
					<span className="text-sm font-bold">{success}</span>
				</div>
			)}

			{error && (
				<div className="p-4 bg-danger/10 border border-danger/30 rounded-2xl flex items-center gap-3 text-danger animate-in fade-in zoom-in-95 duration-300 shadow-sm shadow-danger/10">
					<AlertCircle className="w-5 h-5 shrink-0" />
					<span className="text-sm font-bold">{error[language] || error}</span>
				</div>
			)}

			{/* Form */}
			<form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
				<div className="flex flex-col gap-1.5 w-full">
					<label className="text-xs font-bold text-slate-400 select-none">
						{isRtl ? "البريد الإلكتروني" : "Email Address"}
					</label>
					<div className={cn(
						"relative w-full h-12 bg-[#0b1329]/40 border rounded-xl flex items-center overflow-hidden transition-all duration-300",
						emailFocused ? "border-blue-500 ring-2 ring-blue-500/20 shadow-sm shadow-blue-500/10" : "border-slate-800 hover:border-slate-700"
					)}>
						<div className="absolute left-4 text-slate-450 flex items-center justify-center pointer-events-none">
							<Mail className={cn("w-5 h-5 transition-colors duration-300", emailFocused && "text-blue-500")} />
						</div>
						<input 
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							onFocus={() => setEmailFocused(true)}
							onBlur={() => setEmailFocused(false)}
							placeholder="name@example.com"
							className="w-full h-full bg-transparent outline-none ps-12 pe-4 text-sm font-semibold text-white placeholder:text-slate-500/60"
							dir="ltr"
							required
						/>
					</div>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="h-12 mt-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 cursor-pointer overflow-hidden relative group"
				>
					<div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl pointer-events-none" />
					{loading ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin relative z-10" />
							<span className="relative z-10">{isRtl ? "جاري الإرسال..." : "Sending..."}</span>
						</>
					) : (
						<span className="relative z-10 tracking-wide">{isRtl ? "إرسال رمز التحقق" : "Send Reset Code"}</span>
					)}
				</button>
			</form>

			{/* Back Link */}
			<LocalizedLink 
				to="/auth/login" 
				className="flex items-center justify-center gap-2 text-sm font-bold text-slate-400 hover:text-blue-500 transition-colors mt-2"
			>
				<ArrowLeft className={cn("w-4 h-4", isRtl && "rotate-180")} />
				<span>{isRtl ? "العودة لتسجيل الدخول" : "Back to Sign In"}</span>
			</LocalizedLink>

			<AuthFooter />
		</div>
	);
};

export default ForgotPassword;
