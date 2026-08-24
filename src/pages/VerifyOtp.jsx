import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { OTPInput, AuthFooter } from "@/features/auth";
import authApi from "@/features/auth/api/authApi";
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

export const VerifyOtp = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const email = searchParams.get("email") || "ahmed@example.com";

	const [otp, setOtp] = useState("");
	const [timer, setTimer] = useState(60);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [loading, setLoading] = useState(false);

	// Count down timer
	useEffect(() => {
		let interval = null;
		if (timer > 0) {
			interval = setInterval(() => {
				setTimer(prev => prev - 1);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [timer]);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		if (otp.length !== 4) {
			setError(isRtl ? "يرجى إدخال الرمز المكون من 4 أرقام كاملاً." : "Please enter the complete 4-digit code.");
			return;
		}

		setLoading(true);
		try {
			const res = await authApi.verifyOtp(email, otp);
			setSuccess(isRtl ? "تم التحقق من الرمز بنجاح!" : "Code verified successfully!");
			
			// Redirect to Reset Password page with mock token after 1.5s
			setTimeout(() => {
				navigate(`/${language}/auth/reset-password?token=${res.token}`);
			}, 1500);
		} catch (err) {
			setError(isRtl 
				? "الرمز غير صحيح. جرب 1234 للمحاكاة." 
				: "Invalid verification code. Try '1234' for mockup purposes.");
		} finally {
			setLoading(false);
		}
	};

	const handleResend = () => {
		setTimer(60);
		setOtp("");
		setError(null);
		setSuccess(isRtl ? "تم إعادة إرسال الرمز!" : "Verification code resent!");
		setTimeout(() => setSuccess(null), 3000);
	};

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
			{/* Page Header */}
			<div className="flex flex-col gap-2 text-center sm:text-start">
				<h2 className="text-3xl sm:text-4xl font-black text-text tracking-tight">
					{isRtl ? "رمز التحقق OTP" : "Verify Code"}
				</h2>
				<p className="text-sm font-semibold text-text-muted leading-relaxed">
					{isRtl 
						? `أدخل رمز الـ OTP المرسل إلى بريدك: ${email}` 
						: `Enter the verification code sent to: ${email}`}
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
					<span className="text-sm font-bold">{error}</span>
				</div>
			)}

			{/* Form */}
			<form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
				
				<OTPInput length={4} value={otp} onChange={setOtp} />

				{/* Timer & Resend */}
				<div className="flex justify-center items-center text-xs font-bold mt-2">
					{timer > 0 ? (
						<span className="text-text-muted bg-surface-2 px-3 py-1.5 rounded-full border border-border/50">
							{isRtl 
								? `إعادة إرسال الرمز خلال ${timer} ثانية` 
								: `Resend code in ${timer}s`}
						</span>
					) : (
						<button 
							type="button"
							onClick={handleResend}
							className="text-primary hover:text-primary-hover hover:underline flex items-center gap-1.5 cursor-pointer transition-colors"
						>
							<RotateCw className="w-3.5 h-3.5" />
							{isRtl ? "إعادة إرسال الرمز" : "Resend Code"}
						</button>
					)}
				</div>

				<button
					type="submit"
					disabled={loading}
					className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 cursor-pointer overflow-hidden relative group"
				>
					<div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl pointer-events-none" />
					{loading ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin relative z-10" />
							<span className="relative z-10">{isRtl ? "جاري التحقق..." : "Verifying..."}</span>
						</>
					) : (
						<span className="relative z-10 tracking-wide">{isRtl ? "تأكيد الرمز" : "Verify Code"}</span>
					)}
				</button>
			</form>

			{/* Back Link */}
			<LocalizedLink 
				to="/auth/forgot-password" 
				className="flex items-center justify-center gap-2 text-sm font-bold text-text-secondary hover:text-primary transition-colors mt-2"
			>
				<ArrowLeft className={cn("w-4 h-4", isRtl && "rotate-180")} />
				<span>{isRtl ? "العودة للخطوة السابقة" : "Go Back"}</span>
			</LocalizedLink>

			<AuthFooter />
		</div>
	);
};

export default VerifyOtp;
