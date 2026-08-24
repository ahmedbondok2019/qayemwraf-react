import React, { useState, useEffect } from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { MapPin, PlusCircle, Edit2, Trash2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCountries, useGovernorates, useCities } from "@/hooks/queries/useLocations";
import { useUserAddresses, useCreateAddress, useUpdateAddress, useDeleteAddress } from "@/hooks/queries/useUserAddresses";

export const ShippingAddress = ({ onNext }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	// Fetch user's saved addresses dynamically from the API
	const { data: apiAddresses = [], isLoading: isLoadingAddresses } = useUserAddresses();
	const createAddressMutation = useCreateAddress();
	const updateAddressMutation = useUpdateAddress();
	const deleteAddressMutation = useDeleteAddress();

	const [addresses, setAddresses] = useState([]);
	const [selectedAddressId, setSelectedAddressId] = useState(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingAddressId, setEditingAddressId] = useState(null);

	// Fetch countries, governorates, and cities dynamically for the form
	const { data: countriesData } = useCountries();
	const countries = countriesData?.data || (Array.isArray(countriesData) ? countriesData : []);

	// Form input states
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [countryId, setCountryId] = useState("");
	const [governorateId, setGovernorateId] = useState("");
	const [cityId, setCityId] = useState("");
	const [street, setStreet] = useState("");

	// Load governorates and cities dynamically based on selected IDs
	const { data: govData } = useGovernorates(countryId);
	const governorates = govData?.data || (Array.isArray(govData) ? govData : []);

	const { data: citiesData } = useCities(governorateId);
	const cities = citiesData?.data || (Array.isArray(citiesData) ? citiesData : []);

	// Sync local addresses with API addresses on load
	useEffect(() => {
		if (apiAddresses.length > 0) {
			setAddresses(apiAddresses);
			// Auto select default main address if not set
			if (!selectedAddressId) {
				const defaultAddr = apiAddresses.find(addr => addr.is_main) || apiAddresses[0];
				setSelectedAddressId(defaultAddr.id);
			}
		} else {
			setAddresses([]);
			setSelectedAddressId(null);
		}
	}, [apiAddresses]);

	const handleSaveAddress = async (formData) => {
		try {
			if (editingAddressId) {
				// Edit Mode
				await updateAddressMutation.mutateAsync({ id: editingAddressId, ...formData });
			} else {
				// Add Mode
				const res = await createAddressMutation.mutateAsync(formData);
				const newId = res?.data?.id || res?.id;
				if (newId) setSelectedAddressId(newId);
			}
			// Close Form
			setIsFormOpen(false);
			setEditingAddressId(null);
		} catch (error) {
			console.error("Failed to save address:", error);
		}
	};

	const handleDeleteAddress = async (id, e) => {
		e.stopPropagation(); // Prevent selecting the deleted card
		try {
			await deleteAddressMutation.mutateAsync(id);
			if (selectedAddressId === id) {
				setSelectedAddressId(null);
			}
		} catch (error) {
			console.error("Failed to delete address:", error);
		}
	};

	const handleEditAddress = (address, e) => {
		e.stopPropagation(); // Prevent selection toggle
		setEditingAddressId(address.id);
		setName(address.name || "");
		setPhone(address.phone || "");
		setCountryId(address.country?.id || address.country_id || "");
		setGovernorateId(address.governorate?.id || address.governorate_id || "");
		setCityId(address.city?.id || address.city_id || "");
		setStreet(address.address || address.street || "");
		setIsFormOpen(true);
	};

	const handleAddNewClick = () => {
		setEditingAddressId(null);
		setName("");
		setPhone("");
		setCountryId("");
		setGovernorateId("");
		setCityId("");
		setStreet("");
		setIsFormOpen(true);
	};

	const handleCountryChange = (id) => {
		setCountryId(id);
		setGovernorateId("");
		setCityId("");
	};

	const handleGovernorateChange = (id) => {
		setGovernorateId(id);
		setCityId("");
	};

	const handleContinue = () => {
		const activeAddress = addresses.find(addr => addr.id === selectedAddressId);
		if (!activeAddress) return;
		onNext({
			id: activeAddress.id,
			name: activeAddress.name,
			phone: activeAddress.phone,
			country: activeAddress.country?.name || activeAddress.country || "",
			governorate: activeAddress.governorate?.name || activeAddress.governorate || "",
			district: activeAddress.city?.name || activeAddress.city || "",
			street: activeAddress.street || activeAddress.address || "",
			country_id: activeAddress.country?.id || activeAddress.country_id,
			governorate_id: activeAddress.governorate?.id || activeAddress.governorate_id,
			city_id: activeAddress.city?.id || activeAddress.city_id
		});
	};

	if (isLoadingAddresses) {
		return (
			<div className="flex flex-col gap-6 p-6 bg-surface rounded-2xl border border-border/50 items-center justify-center min-h-[200px]">
				<div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
				<span className="text-sm font-semibold text-text-secondary">
					{isRtl ? "جاري تحميل عناوين الشحن..." : "Loading shipping addresses..."}
				</span>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 p-6 bg-surface rounded-2xl border border-border/50 animate-in fade-in duration-300">
			
			{!isFormOpen ? (
				<div className="flex flex-col gap-6">
					<h3 className="text-sm font-extrabold text-text mb-1">
						{isRtl ? "بيانات عنوان الشحن" : "Shipping Address Details"}
					</h3>

					{/* Address Card Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Add New Address Card */}
						<div 
							onClick={handleAddNewClick}
							className="bg-surface/50 rounded-2xl border-2 border-dashed border-border/60 hover:border-primary/60 hover:bg-primary/5 p-5 flex flex-col items-center justify-center gap-3 cursor-pointer min-h-[160px] transition-all"
						>
							<PlusCircle className="w-8 h-8 text-text-muted hover:text-primary transition-colors" />
							<span className="font-bold text-sm text-text-secondary">
								{isRtl ? "إضافة عنوان جديد" : "Add New Address"}
							</span>
						</div>

						{addresses.map(address => {
							const isSelected = selectedAddressId === address.id;
							return (
								<div 
									key={address.id} 
									onClick={() => setSelectedAddressId(address.id)}
									className={cn(
										"relative bg-surface rounded-2xl border-2 p-5 flex flex-col gap-3 cursor-pointer transition-all min-h-[160px]",
										isSelected ? "border-primary bg-primary/5" : "border-border/50 bg-surface-2 hover:border-primary/30"
									)}
								>
									{/* Selection Badge */}
									{isSelected && (
										<span className={cn(
											"absolute top-4 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-md uppercase tracking-wider",
											isRtl ? "left-4" : "right-4"
										)}>
											{isRtl ? "محدد" : "Selected"}
										</span>
									)}

									<div className="flex items-start gap-3">
										<div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", isSelected ? "bg-primary/20 text-primary" : "bg-surface text-text-secondary")}>
											<MapPin className="w-5 h-5" />
										</div>
										<div className="flex flex-col gap-1 min-w-0 pr-12 rtl:pl-12">
											<span className="font-bold text-text text-base truncate">{address.name}</span>
											<p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
												{address.address || `${address.street || ""}, ${address.city?.name || address.city || ""}, ${address.governorate?.name || address.governorate || ""}`}
											</p>
											<span className="text-xs font-semibold text-text-muted mt-1" dir="ltr">
												{address.phone}
											</span>
										</div>
									</div>

									<div className="flex items-center gap-2 mt-auto pt-4 border-t border-border/40">
										<button 
											onClick={(e) => handleEditAddress(address, e)}
											className="flex items-center gap-1.5 px-3 py-1.5 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors text-xs font-bold cursor-pointer"
										>
											<Edit2 className="w-3.5 h-3.5" />
											{isRtl ? "تعديل" : "Edit"}
										</button>
										<button 
											onClick={(e) => handleDeleteAddress(address.id, e)}
											className="flex items-center gap-1.5 px-3 py-1.5 text-text-secondary hover:text-danger hover:bg-danger/10 rounded-lg transition-colors text-xs font-bold cursor-pointer"
										>
											<Trash2 className="w-3.5 h-3.5" />
											{isRtl ? "حذف" : "Delete"}
										</button>
									</div>
								</div>
							);
						})}
					</div>

					<button 
						onClick={handleContinue}
						disabled={!selectedAddressId}
						className="mt-4 h-14 bg-primary text-white font-extrabold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm cursor-pointer"
					>
						{isRtl ? "المتابعة لطريقة التوصيل" : "Continue to Delivery"}
					</button>
				</div>
			) : (
				<form 
					className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300" 
					onSubmit={(e) => { 
						e.preventDefault(); 
						const selectedCountryObj = countries.find(c => String(c.id) === String(countryId));
						const selectedGovObj = governorates.find(g => String(g.id) === String(governorateId));
						const selectedCityObj = cities.find(c => String(c.id) === String(cityId));
						
						const addressDetails = `${street}, ${selectedCityObj?.name || ""}, ${selectedGovObj?.name || ""}`;

						handleSaveAddress({
							name,
							phone,
							address: addressDetails,
							country: selectedCountryObj ? { id: selectedCountryObj.id, name: selectedCountryObj.name } : null,
							governorate: selectedGovObj ? { id: selectedGovObj.id, name: selectedGovObj.name } : null,
							city: selectedCityObj ? { id: selectedCityObj.id, name: selectedCityObj.name } : null,
							street,
							country_id: countryId,
							governorate_id: governorateId,
							city_id: cityId
						});
					}}
				>
					<div className="flex items-center gap-3 mb-2">
						<button 
							type="button" 
							onClick={() => setIsFormOpen(false)}
							className="p-1.5 hover:bg-surface-2 rounded-xl transition-colors cursor-pointer"
						>
							<ArrowLeft className="w-5 h-5" />
						</button>
						<h3 className="text-sm font-extrabold text-text">
							{editingAddressId 
								? (isRtl ? "تعديل عنوان الشحن" : "Edit Shipping Address") 
								: (isRtl ? "بيانات عنوان الشحن الجديد" : "New Shipping Address Details")}
						</h3>
					</div>

					{/* Name & Phone */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="flex flex-col gap-2">
							<label className="text-xs font-bold text-text-secondary">{isRtl ? "الاسم بالكامل" : "Full Name"}</label>
							<input 
								required 
								type="text" 
								value={name}
								onChange={e => setName(e.target.value)}
								placeholder={isRtl ? "مثال: أحمد محمد" : "e.g. John Doe"}
								className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-semibold" 
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label className="text-xs font-bold text-text-secondary">{isRtl ? "رقم الهاتف" : "Phone Number"}</label>
							<input 
								required 
								type="tel" 
								value={phone}
								onChange={e => setPhone(e.target.value)}
								placeholder="0100 123 4567"
								className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-semibold text-left" 
								dir="ltr" 
							/>
						</div>
					</div>

					{/* Dynamic Country, Governorate, City Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{/* Country */}
						<div className="flex flex-col gap-2">
							<label className="text-xs font-bold text-text-secondary">{isRtl ? "البلد" : "Country"}</label>
							<select 
								required 
								value={countryId}
								onChange={e => handleCountryChange(e.target.value)}
								className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-semibold cursor-pointer"
							>
								<option value="">{isRtl ? "اختر البلد" : "Select Country"}</option>
								{countries.map(c => (
									<option key={c.id} value={c.id}>{c.name}</option>
								))}
							</select>
						</div>

						{/* Governorate */}
						<div className="flex flex-col gap-2">
							<label className="text-xs font-bold text-text-secondary">{isRtl ? "المحافظة" : "Governorate"}</label>
							<select 
								required 
								value={governorateId}
								disabled={!countryId}
								onChange={e => handleGovernorateChange(e.target.value)}
								className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
							>
								<option value="">{isRtl ? "اختر المحافظة" : "Select Governorate"}</option>
								{governorates.map(g => (
									<option key={g.id} value={g.id}>{g.name}</option>
								))}
							</select>
						</div>

						{/* City / Area / District */}
						<div className="flex flex-col gap-2">
							<label className="text-xs font-bold text-text-secondary">{isRtl ? "المنطقة / الحي" : "Area / District"}</label>
							<select 
								required 
								value={cityId}
								disabled={!governorateId}
								onChange={e => setCityId(e.target.value)}
								className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
							>
								<option value="">{isRtl ? "اختر المنطقة" : "Select Area"}</option>
								{cities.map(c => (
									<option key={c.id} value={c.id}>{c.name}</option>
								))}
							</select>
						</div>
					</div>

					{/* Street & Details */}
					<div className="flex flex-col gap-2">
						<label className="text-xs font-bold text-text-secondary">{isRtl ? "عنوان الشارع بالتفصيل" : "Street Address"}</label>
						<input 
							required 
							type="text" 
							value={street}
							onChange={e => setStreet(e.target.value)}
							placeholder={isRtl ? "اسم الشارع، رقم العمارة، رقم الشقة" : "Street name, building number, apartment"} 
							className="h-12 px-4 bg-surface-2 border border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-semibold" 
						/>
					</div>

					<div className="flex gap-4 mt-2">
						<button 
							type="button" 
							onClick={() => setIsFormOpen(false)}
							className="flex-1 h-14 border border-border/60 text-text font-bold rounded-xl hover:bg-surface-2 transition-colors cursor-pointer"
						>
							{isRtl ? "إلغاء" : "Cancel"}
						</button>
						<button 
							type="submit" 
							className="flex-1 h-14 bg-primary text-white font-extrabold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-[0.98] transition-all text-sm cursor-pointer"
						>
							{isRtl ? "حفظ العنوان" : "Save Address"}
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default ShippingAddress;
