import React, { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { useLanguage } from "@/app/providers/I18nProvider";
import LocalizedLink from "@/components/ui/LocalizedLink";
import { Section } from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
	{ id: "bp", name: { en: "Blood Pressure", ar: "جهاز ضغط الدم" }, query: "blood pressure" },
	{ id: "sugar", name: { en: "Sugar", ar: "قياس السكر" }, query: "sugar" },
	{ id: "wheelchair", name: { en: "Wheelchair", ar: "كرسي متحرك" }, query: "wheelchair" },
	{ id: "oxygen", name: { en: "Oxygen", ar: "أكسجين" }, query: "oxygen" },
	{ id: "mask", name: { en: "Face Masks", ar: "كمامات طبية" }, query: "mask" },
];

export const SmartFinder = () => {
	const { language } = useLanguage();
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();
	const isRtl = language === "ar";

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/${language}/products?q=${encodeURIComponent(searchQuery.trim())}`);
		}
	};

	return (
		<Section spacing="lg" className="bg-background relative overflow-hidden">
			{/* Apple-like subtle gradient background */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

			<Container>
				<div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-10">
					{/* Title */}
					<h2 className="text-4xl md:text-5xl font-extrabold text-text-heading tracking-tight mb-8">
						{isRtl ? "عن ماذا تبحث اليوم؟" : "What are you looking for?"}
					</h2>

					{/* Search Input Box */}
					<form
						onSubmit={handleSearch}
						className="w-full relative group transition-all duration-500 ease-out"
					>
						<div className="absolute inset-y-0 flex items-center px-6 pointer-events-none text-text-muted group-focus-within:text-primary transition-colors duration-300">
							<Search className="w-6 h-6" />
						</div>

						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder={isRtl ? "ابحث عن الأجهزة الطبية، المستلزمات..." : "Search for medical devices, consumables..."}
							className={cn(
								"w-full h-16 md:h-20 bg-surface-2/50 hover:bg-surface-2 focus:bg-surface text-lg md:text-xl text-text rounded-[2rem] outline-none shadow-sm hover:shadow-md focus:shadow-xl focus:ring-4 focus:ring-primary/10 border border-border transition-all duration-300 placeholder:text-text-muted/60 font-medium",
								isRtl ? "pr-16 pl-6 text-right" : "pl-16 pr-6 text-left"
							)}
						/>

						<button
							type="submit"
							className={cn(
								"absolute inset-y-2 flex items-center justify-center px-6 bg-primary text-white rounded-full font-bold hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm",
								isRtl ? "left-2" : "right-2"
							)}
						>
							{isRtl ? "بحث" : "Search"}
						</button>
					</form>

					{/* Suggestions */}
					<div className="mt-8 flex flex-col items-center w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
						<div className="flex items-center gap-2 text-sm font-semibold text-text-secondary mb-4">
							<Sparkles className="w-4 h-4 text-amber-500" />
							<span>{isRtl ? "اقتراحات سريعة" : "Quick suggestions"}</span>
						</div>

						<div className="flex flex-wrap justify-center gap-3">
							{SUGGESTIONS.map((suggestion) => (
								<LocalizedLink
									key={suggestion.id}
									to={`/products?q=${suggestion.query}`}
									className="px-5 py-2.5 rounded-full bg-surface border border-border text-text-secondary font-medium text-[15px] hover:border-primary/50 hover:text-primary hover:bg-primary/5 hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
								>
									{suggestion.name[language]}
								</LocalizedLink>
							))}
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default SmartFinder;

