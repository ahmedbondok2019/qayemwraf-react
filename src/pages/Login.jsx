import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { useLogin, PasswordField, RememberMe, AuthFooter } from "@/features/auth";
import { authValidators } from "@/features/auth/validation/authSchemas";
import { AlertCircle, CheckCircle2, Loader2, User } from "lucide-react";
import { normalizeApiError } from "@/utils/errorMapper";
import { cn } from "@/lib/utils";

export const Login = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const navigate = useNavigate();
	const location = useLocation();
	const { login, loading } = useLogin();

	// Inputs
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(true);

	// Errors & UI states
	const [errors, setErrors] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	
	// Focus states for input animation
	const [emailFocused, setEmailFocused] = useState(false);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setErrors({});
		setErrorMessage(null);
		setSuccessMessage(null);

		// Validate email
		const emailErr = authValidators.email(email);
		const passErr = authValidators.password(password);
		if (emailErr || passErr) {
			setErrors({
				email: emailErr,
				password: passErr
			});
			return;
		}

		try {
			await login(email, password, rememberMe);
			setSuccessMessage(isRtl ? "تم تسجيل الدخول بنجاح!" : "Logged in successfully!");
			
			// Redirect back to original route or home page after 1.5s
			setTimeout(() => {
				const from = location.state?.from?.pathname || `/${language}`;
				navigate(from, { replace: true });
			}, 1500);
		} catch (err) {
			const { generalMessage, fieldErrors } = normalizeApiError(err);
			setErrorMessage(generalMessage);
			if (Object.keys(fieldErrors).length > 0) {
				setErrors(prev => ({ ...prev, ...fieldErrors }));
			}
		}
	};



	return (
		<div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
			{/* Page Header */}
			<div className="flex flex-col gap-2 text-center sm:text-start">
				<h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
					{isRtl ? "مرحباً بك مجدداً 👋" : "Welcome Back 👋"}
				</h2>
				<p className="text-sm font-semibold text-slate-400">
					{isRtl ? "قم بتسجيل الدخول للوصول إلى حسابك الطبي" : "Sign in to access your medical account"}
				</p>
			</div>

			{/* Status Alerts */}
			{successMessage && (
				<div className="p-4 bg-success/10 border border-success/30 rounded-2xl flex items-center gap-3 text-success animate-in fade-in zoom-in-95 duration-300 shadow-sm shadow-success/10">
					<CheckCircle2 className="w-5 h-5 shrink-0" />
					<span className="text-sm font-bold">{successMessage}</span>
				</div>
			)}

			{errorMessage && (
				<div className="p-4 bg-danger/10 border border-danger/30 rounded-2xl flex items-center gap-3 text-danger animate-in fade-in zoom-in-95 duration-300 shadow-sm shadow-danger/10">
					<AlertCircle className="w-5 h-5 shrink-0" />
					<span className="text-sm font-bold">{errorMessage}</span>
				</div>
			)}

			{/* Form */}
			<form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
				{/* Email or Phone */}
				<div className="flex flex-col gap-1.5 w-full">
					<label className="text-xs font-bold text-slate-400 select-none">
						{isRtl ? "البريد الإلكتروني أو رقم الهاتف" : "Email or Phone"}
					</label>
					<div className={cn(
						"relative w-full h-12 bg-[#0b1329]/40 border rounded-xl flex items-center overflow-hidden transition-all duration-300",
						emailFocused ? "border-blue-500 ring-2 ring-blue-500/20 shadow-sm shadow-blue-500/10" : "border-slate-800 hover:border-slate-700"
					)}>
						<div className="absolute start-4 text-slate-450 flex items-center justify-center pointer-events-none">
							<User className={cn("w-5 h-5 transition-colors duration-300", emailFocused && "text-blue-500")} />
						</div>
						<input 
							type="text"
							value={email}
							onChange={e => setEmail(e.target.value)}
							onFocus={() => setEmailFocused(true)}
							onBlur={() => setEmailFocused(false)}
							placeholder={isRtl ? "أدخل بريدك الإلكتروني أو رقمك" : "Enter your email or phone"}
							className="w-full h-full bg-transparent outline-none ps-12 pe-4 text-sm font-semibold text-white placeholder:text-slate-500/60"
							dir="ltr"
							required
							autoComplete="username"
						/>
					</div>
					{errors.email && (
						<span className="text-xs text-danger font-semibold animate-in fade-in slide-in-from-top-1">{errors.email[language]}</span>
					)}
				</div>

				{/* Password */}
				<PasswordField 
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder="••••••••"
					label={isRtl ? "كلمة المرور" : "Password"}
					error={errors.password}
					autoComplete="current-password"
				/>

				{/* Remember Me & Forgot Password Link */}
				<div className="flex items-center justify-between gap-4 mt-1">
					<RememberMe checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
					<LocalizedLink 
						to="/auth/forgot-password" 
						className="text-xs font-bold text-blue-500 hover:text-blue-400 hover:underline transition-colors cursor-pointer"
					>
						{isRtl ? "نسيت كلمة المرور؟" : "Forgot Password?"}
					</LocalizedLink>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={loading}
					className="h-12 mt-2 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 cursor-pointer overflow-hidden relative group"
				>
					<div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl pointer-events-none" />
					{loading ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin relative z-10" />
							<span className="relative z-10">{isRtl ? "جاري التحميل..." : "Loading..."}</span>
						</>
					) : (
						<span className="relative z-10 tracking-wide">{isRtl ? "تسجيل الدخول" : "Sign In"}</span>
					)}
				</button>
			</form>

			{/* Link to Register */}
			<p className="text-center text-sm font-bold text-slate-400 mt-2">
				{isRtl ? "ليس لديك حساب؟ " : "Don't have an account? "}
				<LocalizedLink to="/auth/register" className="text-blue-500 hover:text-blue-400 hover:underline font-black transition-colors">
					{isRtl ? "سجل الآن" : "Sign Up"}
				</LocalizedLink>
			</p>

			<AuthFooter />
		</div>
	);
};

export default Login;
