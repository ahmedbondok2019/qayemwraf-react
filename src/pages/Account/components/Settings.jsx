import React, { useState } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogout } from "@/features/auth";
import authService from "@/features/auth/services/authService";
import { AlertCircle, Loader2, User, Mail, Phone } from "lucide-react";

export const Settings = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const navigate = useNavigate();
	const { logout } = useLogout();
	const user = useSelector(state => state.auth.user);
	
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteAccount = async () => {
		try {
			setIsDeleting(true);
			await authService.deleteAccount();
			await logout(); // Clears Redux & Storage
			navigate(`/${language}`);
		} catch (error) {
			console.error("Failed to delete account:", error);
			// You could also show a toast here if sonner is available
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
			
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-extrabold text-text">
					{isRtl ? "إعدادات الحساب" : "Account Settings"}
				</h2>
			</div>

			<div className="bg-surface rounded-2xl border border-border/50 p-6 md:p-8">
				<form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
					
					{/* Personal Info */}
					<div>
						<h3 className="text-lg font-bold text-text mb-4 border-b border-border/50 pb-2">
							{isRtl ? "المعلومات الشخصية" : "Personal Information"}
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex flex-col gap-2 md:col-span-2">
								<label className="text-sm font-bold text-text-secondary">{isRtl ? "الاسم الكامل" : "Full Name"}</label>
								<div className="relative">
									<div className="absolute top-1/2 -translate-y-1/2 left-4 text-text-muted">
										<User className="w-5 h-5" />
									</div>
									<input 
										type="text" 
										defaultValue={user?.name || ""} 
										placeholder={isRtl ? "الاسم الكامل" : "Full Name"}
										className="w-full h-12 pl-12 pr-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text font-semibold" 
									/>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<label className="text-sm font-bold text-text-secondary">{isRtl ? "البريد الإلكتروني" : "Email Address"}</label>
								<div className="relative">
									<div className="absolute top-1/2 -translate-y-1/2 left-4 text-text-muted">
										<Mail className="w-5 h-5" />
									</div>
									<input 
										type="email" 
										defaultValue={user?.email || ""} 
										readOnly
										className="w-full h-12 pl-12 pr-4 bg-surface-2 border border-border/60 rounded-xl outline-none text-left text-text-muted font-semibold cursor-not-allowed opacity-70" 
										dir="ltr" 
									/>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<label className="text-sm font-bold text-text-secondary">{isRtl ? "رقم الهاتف" : "Phone Number"}</label>
								<div className="relative">
									<div className="absolute top-1/2 -translate-y-1/2 left-4 text-text-muted">
										<Phone className="w-5 h-5" />
									</div>
									<input 
										type="tel" 
										defaultValue={user?.phone || ""} 
										readOnly
										className="w-full h-12 pl-12 pr-4 bg-surface-2 border border-border/60 rounded-xl outline-none text-left text-text-muted font-semibold cursor-not-allowed opacity-70" 
										dir="ltr" 
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Password section removed as per user request to remove unused/non-API compliant fields */}

					<div className="flex justify-end mt-4">
						<button type="submit" className="h-14 px-8 bg-primary hover:bg-primary-hover text-white font-extrabold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
							{isRtl ? "حفظ التغييرات" : "Save Changes"}
						</button>
					</div>
				</form>
			</div>

			{/* Danger Zone: Delete Account */}
			<div className="bg-surface rounded-2xl border border-danger/30 p-6 md:p-8 mt-4">
				<h3 className="text-lg font-bold text-danger mb-2 flex items-center gap-2">
					<AlertCircle className="w-5 h-5" />
					{isRtl ? "منطقة الخطر" : "Danger Zone"}
				</h3>
				<p className="text-sm font-semibold text-text-muted mb-6">
					{isRtl 
						? "بمجرد حذف حسابك، لا يمكنك التراجع عن هذا الإجراء. يرجى التأكد." 
						: "Once you delete your account, there is no going back. Please be certain."}
				</p>
				
				{!showDeleteConfirm ? (
					<button 
						onClick={() => setShowDeleteConfirm(true)}
						className="h-12 px-6 bg-danger/10 text-danger hover:bg-danger hover:text-white border border-danger/30 font-bold rounded-xl transition-colors cursor-pointer"
					>
						{isRtl ? "حذف الحساب" : "Delete Account"}
					</button>
				) : (
					<div className="p-4 bg-danger/5 border border-danger/20 rounded-xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-300">
						<p className="text-sm font-bold text-danger">
							{isRtl ? "هل أنت متأكد تماماً من رغبتك في حذف الحساب؟" : "Are you absolutely sure you want to delete your account?"}
						</p>
						<div className="flex items-center gap-3">
							<button 
								onClick={handleDeleteAccount}
								disabled={isDeleting}
								className="h-10 px-4 bg-danger text-white font-bold rounded-lg hover:bg-danger-hover transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
							>
								{isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
								{isRtl ? "نعم، احذف حسابي" : "Yes, delete my account"}
							</button>
							<button 
								onClick={() => setShowDeleteConfirm(false)}
								disabled={isDeleting}
								className="h-10 px-4 bg-surface-2 text-text font-bold rounded-lg hover:bg-surface-3 transition-colors cursor-pointer"
							>
								{isRtl ? "إلغاء" : "Cancel"}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Settings;
