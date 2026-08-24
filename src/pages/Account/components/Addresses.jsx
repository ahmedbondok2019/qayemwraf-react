import React, { useState, useEffect } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { MapPin, Plus, Edit2, Trash2, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserAddresses, useCreateAddress, useUpdateAddress, useDeleteAddress } from "@/hooks/queries/useUserAddresses";
import { useCountries, useGovernorates, useCities } from "@/hooks/queries/useLocations";

export const Addresses = () => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	const { data: apiAddresses = [], isLoading } = useUserAddresses();
	const createAddress = useCreateAddress();
	const updateAddress = useUpdateAddress();
	const deleteAddress = useDeleteAddress();

	// State for addresses
	const [addresses, setAddresses] = useState([]);

	useEffect(() => {
		if (apiAddresses.length > 0) {
			const formatted = apiAddresses.map(addr => ({
				id: addr.id,
				title: { 
					en: addr.name || "Shipping Address", 
					ar: addr.name || "عنوان الشحن" 
				},
				details: { 
					en: `${addr.address || ""}, ${addr.city?.name || ""}, ${addr.governorate?.name || ""}, ${addr.country?.name || ""}`,
					ar: `${addr.address || ""}, ${addr.city?.name || ""}, ${addr.governorate?.name || ""}, ${addr.country?.name || ""}`
				},
				phone: addr.phone || "",
				isDefault: !!addr.is_main,
				raw: addr
			}));
			setAddresses(formatted);
		} else {
			setAddresses([]);
		}
	}, [apiAddresses]);

	// Modal State
	const [isOpen, setIsOpen] = useState(false);
	const [editingAddress, setEditingAddress] = useState(null);

	// Form State
	const [title, setTitle] = useState("");
	const [details, setDetails] = useState("");
	const [phone, setPhone] = useState("");
	const [isDefault, setIsDefault] = useState(false);
	
	const [countryId, setCountryId] = useState("");
	const [governorateId, setGovernorateId] = useState("");
	const [cityId, setCityId] = useState("");

	// Location options
	const { data: countriesData } = useCountries();
	const countries = countriesData?.data || (Array.isArray(countriesData) ? countriesData : []);

	const { data: govData } = useGovernorates(countryId);
	const governorates = govData?.data || (Array.isArray(govData) ? govData : []);

	const { data: citiesData } = useCities(governorateId);
	const cities = citiesData?.data || (Array.isArray(citiesData) ? citiesData : []);


	// Open Modal for Create
	const handleOpenCreate = () => {
		setEditingAddress(null);
		setTitle("");
		setDetails("");
		setPhone("");
		setIsDefault(false);
		setCountryId("");
		setGovernorateId("");
		setCityId("");
		setIsOpen(true);
	};

	// Open Modal for Edit
	const handleOpenEdit = (address) => {
		setEditingAddress(address);
		setTitle(address.raw?.name || address.title[language] || "");
		setDetails(address.raw?.address || address.details[language] || "");
		setPhone(address.phone || "");
		setIsDefault(address.isDefault);
		setCountryId(address.raw?.country?.id || address.raw?.country_id || "");
		setGovernorateId(address.raw?.governorate?.id || address.raw?.governorate_id || "");
		setCityId(address.raw?.city?.id || address.raw?.city_id || "");
		setIsOpen(true);
	};

	// Close Modal
	const handleClose = () => {
		setIsOpen(false);
	};

	// Submit Form
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title.trim() || !details.trim() || !phone.trim() || !countryId || !governorateId || !cityId) return;

		const payload = {
			name: title.trim(),
			phone: phone.trim(),
			address: details.trim(),
			country_id: Number(countryId),
			governorate_id: Number(governorateId),
			city_id: Number(cityId),
			is_main: isDefault ? 1 : 0
		};

		try {
			if (editingAddress) {
				await updateAddress.mutateAsync({ id: editingAddress.id, ...payload });
			} else {
				await createAddress.mutateAsync(payload);
			}
			setIsOpen(false);
		} catch (error) {
			console.error("Failed to save address:", error);
		}
	};

	// Delete Address
	const handleDelete = async (id) => {
		try {
			await deleteAddress.mutateAsync(id);
		} catch (error) {
			console.error("Failed to delete address:", error);
		}
	};

	if (isLoading) {
		return (
			<div className="flex flex-col gap-6 p-6 bg-surface rounded-2xl border border-border/50 items-center justify-center min-h-[200px]">
				<div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
				<span className="text-sm font-semibold text-text-secondary">
					{isRtl ? "جاري تحميل العناوين..." : "Loading addresses..."}
				</span>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
			
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-extrabold text-text">
					{isRtl ? "عناويني" : "My Addresses"}
				</h2>
				<button 
					onClick={handleOpenCreate}
					className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-colors text-sm shadow-sm shadow-primary/20 cursor-pointer"
				>
					<Plus className="w-4 h-4" />
					<span>{isRtl ? "إضافة عنوان جديد" : "Add New Address"}</span>
				</button>
			</div>

			{addresses.length === 0 ? (
				<div className="bg-surface rounded-2xl border border-border/50 p-8 text-center flex flex-col items-center justify-center gap-3">
					<MapPin className="w-10 h-10 text-text-muted opacity-30" />
					<span className="font-bold text-text-secondary">
						{isRtl ? "لا توجد عناوين مسجلة بعد" : "No saved addresses yet"}
					</span>
					<button
						onClick={handleOpenCreate}
						className="text-sm font-semibold text-primary hover:underline"
					>
						{isRtl ? "أضف عنوانك الأول الآن" : "Add your first address now"}
					</button>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{addresses.map(address => (
						<div key={address.id} className={`bg-surface rounded-2xl border p-5 flex flex-col gap-4 relative transition-colors ${address.isDefault ? 'border-primary' : 'border-border/50 hover:border-primary/30'}`}>
							
							{address.isDefault && (
								<span className={cn(
									"absolute top-4 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-md uppercase tracking-wider",
									isRtl ? "left-4" : "right-4"
								)}>
									{isRtl ? "الافتراضي" : "Default"}
								</span>
							)}

							<div className="flex items-start gap-3">
								<div className="w-10 h-10 bg-surface-2 rounded-xl flex items-center justify-center text-text-secondary shrink-0">
									<MapPin className="w-5 h-5" />
								</div>
								<div className="flex flex-col gap-1 min-w-0 pr-12 rtl:pl-12">
									<span className="font-bold text-text text-base truncate">{address.title[language] || address.title.en}</span>
									<p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
										{address.details[language] || address.details.en}
									</p>
									<span className="text-xs font-semibold text-text-muted mt-1" dir="ltr">
										{address.phone}
									</span>
								</div>
							</div>

							<div className="flex items-center gap-2 mt-auto pt-4 border-t border-border/40">
								<button 
									onClick={() => handleOpenEdit(address)}
									className="flex items-center gap-1.5 px-3 py-1.5 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors text-xs font-bold cursor-pointer"
								>
									<Edit2 className="w-3.5 h-3.5" />
									{isRtl ? "تعديل" : "Edit"}
								</button>
								<button 
									onClick={() => handleDelete(address.id)}
									className="flex items-center gap-1.5 px-3 py-1.5 text-text-secondary hover:text-danger hover:bg-danger/10 rounded-lg transition-colors text-xs font-bold cursor-pointer"
								>
									<Trash2 className="w-3.5 h-3.5" />
									{isRtl ? "حذف" : "Delete"}
								</button>
							</div>

						</div>
					))}
				</div>
			)}

			{/* Form Modal */}
			{isOpen && (
				<div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
					{/* Backdrop */}
					<div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={handleClose} />

					{/* Modal Box */}
					<div className="bg-surface border border-border/80 rounded-2xl max-w-md w-full shadow-2xl z-10 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="flex items-center justify-between p-4 border-b border-border bg-surface-2/35">
							<span className="font-extrabold text-text">
								{editingAddress 
									? (isRtl ? "تعديل العنوان" : "Edit Address") 
									: (isRtl ? "إضافة عنوان جديد" : "Add New Address")}
							</span>
							<button 
								onClick={handleClose}
								className="p-1.5 rounded-lg text-text-muted hover:text-text hover:bg-surface-2 transition-all cursor-pointer"
							>
								<X className="w-4 h-4" />
							</button>
						</div>

						<form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
							{/* Title Input */}
							<div className="flex flex-col gap-1.5">
								<label className="text-xs font-bold text-text-secondary">
									{isRtl ? "اسم العنوان (مثال: المنزل، العمل)" : "Address Title (e.g. Home, Office)"}
								</label>
								<input 
									type="text"
									required
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									placeholder={isRtl ? "أدخل اسم العنوان" : "Enter address title"}
									className="w-full bg-surface-2 border border-border/80 rounded-xl px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
								/>
							</div>

							{/* Details Input */}
							<div className="flex flex-col gap-1.5">
								<label className="text-xs font-bold text-text-secondary">
									{isRtl ? "العنوان بالتفصيل" : "Detailed Address"}
								</label>
								<textarea 
									required
									rows={3}
									value={details}
									onChange={(e) => setDetails(e.target.value)}
									placeholder={isRtl ? "الشارع، رقم المبنى، الحي، المدينة" : "Street, Building, Area, City"}
									className="w-full bg-surface-2 border border-border/80 rounded-xl px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
								/>
							</div>

							{/* Country Selection */}
							<div className="flex flex-col gap-1.5">
								<label className="text-xs font-bold text-text-secondary">{isRtl ? "البلد" : "Country"}</label>
								<select 
									required 
									value={countryId}
									onChange={e => {
										setCountryId(e.target.value);
										setGovernorateId("");
										setCityId("");
									}}
									className="w-full bg-surface-2 border border-border/80 rounded-xl px-3.5 py-2.5 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
								>
									<option value="">{isRtl ? "اختر البلد" : "Select Country"}</option>
									{countries.map(c => (
										<option key={c.id} value={c.id}>{c.name}</option>
									))}
								</select>
							</div>

							{/* Governorate Selection */}
							<div className="flex flex-col gap-1.5">
								<label className="text-xs font-bold text-text-secondary">{isRtl ? "المحافظة" : "Governorate"}</label>
								<select 
									required 
									value={governorateId}
									disabled={!countryId}
									onChange={e => {
										setGovernorateId(e.target.value);
										setCityId("");
									}}
									className="w-full bg-surface-2 border border-border/80 rounded-xl px-3.5 py-2.5 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
								>
									<option value="">{isRtl ? "اختر المحافظة" : "Select Governorate"}</option>
									{governorates.map(g => (
										<option key={g.id} value={g.id}>{g.name}</option>
									))}
								</select>
							</div>

							{/* City Selection */}
							<div className="flex flex-col gap-1.5">
								<label className="text-xs font-bold text-text-secondary">{isRtl ? "المنطقة / الحي" : "Area / District"}</label>
								<select 
									required 
									value={cityId}
									disabled={!governorateId}
									onChange={e => setCityId(e.target.value)}
									className="w-full bg-surface-2 border border-border/80 rounded-xl px-3.5 py-2.5 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
								>
									<option value="">{isRtl ? "اختر المنطقة" : "Select Area"}</option>
									{cities.map(c => (
										<option key={c.id} value={c.id}>{c.name}</option>
									))}
								</select>
							</div>

							{/* Phone Input */}
							<div className="flex flex-col gap-1.5">
								<label className="text-xs font-bold text-text-secondary">
									{isRtl ? "رقم الهاتف" : "Phone Number"}
								</label>
								<input 
									type="tel"
									required
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									placeholder="+20 100 123 4567"
									className="w-full bg-surface-2 border border-border/80 rounded-xl px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-start"
									dir="ltr"
								/>
							</div>

							{/* Default Toggle Checkbox */}
							<label className="flex items-center gap-2.5 mt-1 select-none cursor-pointer">
								<div className="relative flex items-center justify-center">
									<input 
										type="checkbox"
										checked={isDefault}
										onChange={(e) => setIsDefault(e.target.checked)}
										className="sr-only peer"
									/>
									<div className="w-5 h-5 rounded-[6px] border border-border/80 bg-surface-2 peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
										{isDefault && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
									</div>
								</div>
								<span className="text-xs font-semibold text-text-secondary">
									{isRtl ? "تعيين كعنوان افتراضي للشحن" : "Set as default shipping address"}
								</span>
							</label>

							{/* Actions Row */}
							<div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
								<button 
									type="button"
									onClick={handleClose}
									className="flex-1 py-2.5 rounded-xl border border-border/80 hover:bg-surface-2 text-text-secondary text-sm font-bold transition-all cursor-pointer"
								>
									{isRtl ? "إلغاء" : "Cancel"}
								</button>
								<button 
									type="submit"
									className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-sm shadow-primary/15 transition-all cursor-pointer"
								>
									{isRtl ? "حفظ" : "Save"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Addresses;
