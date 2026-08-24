export const ROLES = {
	USER: "user",
	DOCTOR: "doctor",
	DISTRIBUTOR: "distributor",
	ADMIN: "admin"
};

export const AUTH_STORAGE_KEYS = {
	ACCESS_TOKEN: "eg_access_token",
	REFRESH_TOKEN: "eg_refresh_token",
	USER: "eg_user_info",
	REMEMBER_ME: "eg_remember_me"
};

export const OTP_TIMER_SECONDS = 60;

export const AUTH_ERRORS = {
	INVALID_CREDENTIALS: {
		en: "Invalid email or password. Please try again.",
		ar: "البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى."
	},
	ACCOUNT_LOCKED: {
		en: "Your account is temporarily locked due to multiple failed attempts. Try again in 15 minutes.",
		ar: "تم قفل حسابك مؤقتاً بسبب محاولات فاشلة متعددة. حاول مجدداً بعد 15 دقيقة."
	},
	OTP_EXPIRED: {
		en: "The OTP verification code has expired. Please request a new code.",
		ar: "انتهت صلاحية رمز تأكيد الـ OTP. يرجى طلب رمز جديد."
	},
	EMAIL_NOT_VERIFIED: {
		en: "Please verify your email address to access your account.",
		ar: "يرجى تأكيد بريدك الإلكتروني أولاً للتمكن من تسجيل الدخول."
	},
	NETWORK_ERROR: {
		en: "Unable to connect to the server. Please check your internet connection.",
		ar: "فشل الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت."
	}
};
