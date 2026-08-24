// Simple client-side validation rules for Authentication inputs

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Egyptian phone formats: 010, 011, 012, 015 followed by 8 digits
export const EGYPT_PHONE_REGEX = /^01[0125][0-9]{8}$/;

export const authValidators = {
	email: (email) => {
		if (!email) return { en: "Email is required.", ar: "البريد الإلكتروني مطلوب." };
		if (!EMAIL_REGEX.test(email)) return { en: "Invalid email format.", ar: "صيغة البريد الإلكتروني غير صحيحة." };
		return null;
	},
	
	password: (password) => {
		if (!password) return { en: "Password is required.", ar: "كلمة المرور مطلوبة." };
		if (password.length < 8) return { en: "Password must be at least 8 characters.", ar: "يجب أن لا تقل كلمة المرور عن 8 أحرف." };
		
		const hasLetters = /[a-zA-Z]/.test(password);
		const hasNumbers = /[0-9]/.test(password);
		if (!hasLetters || !hasNumbers) {
			return { en: "Password must contain both letters and numbers.", ar: "يجب أن تحتوي كلمة المرور على حروف وأرقام." };
		}
		
		return null;
	},

	phone: (phone) => {
		if (!phone) return { en: "Phone number is required.", ar: "رقم الهاتف مطلوب." };
		if (!EGYPT_PHONE_REGEX.test(phone)) {
			return { 
				en: "Must be a valid Egyptian mobile number (11 digits starting with 010, 011, 012, or 015).", 
				ar: "يجب أن يكون رقم محمول مصري صحيح (11 رقم يبدأ بـ 010، 011، 012 أو 015)." 
			};
		}
		return null;
	},

	name: (name) => {
		if (!name || name.trim().length < 3) {
			return { en: "Name must be at least 3 characters.", ar: "يجب أن لا يقل الاسم عن 3 أحرف." };
		}
		return null;
	}
};

export const getPasswordStrength = (password) => {
	if (!password) return 0;
	let score = 0;
	if (password.length >= 8) score++;
	if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
	if (/[0-9]/.test(password)) score++;
	if (/[^A-Za-z0-9]/.test(password)) score++;
	return score; // Max score 4
};
