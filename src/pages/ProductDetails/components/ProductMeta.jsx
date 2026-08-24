import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const ProductMeta = ({ sku, categories }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";
	const [copied, setCopied] = React.useState(false);

	const handleCopyLink = () => {
		navigator.clipboard.writeText(window.location.href);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="flex flex-col gap-4 py-4 mt-6 border-t border-border/60">
			
			{/* SKU & Categories */}
			<div className="flex flex-col gap-2">
				{sku && (
					<div className="flex items-center gap-2 text-sm">
						<span className="font-bold text-text">{isRtl ? "رمز المنتج (SKU):" : "SKU:"}</span>
						<span className="text-text-secondary">{sku}</span>
					</div>
				)}
				
				{categories && categories.length > 0 && (
					<div className="flex items-center gap-2 text-sm">
						<span className="font-bold text-text">{isRtl ? "الأقسام:" : "Categories:"}</span>
						<div className="flex flex-wrap gap-2">
							{categories.map((cat, idx) => (
								<React.Fragment key={cat.id}>
									<a href={`/categories/${cat.id}`} className="text-primary hover:underline">
										{cat.label[language]}
									</a>
									{idx < categories.length - 1 && <span className="text-border">,</span>}
								</React.Fragment>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Social Share */}
			<div className="flex items-center gap-3 mt-2">
				<span className="text-sm font-bold text-text">{isRtl ? "مشاركة:" : "Share:"}</span>
				<div className="flex items-center gap-2">
					<button className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center text-text-secondary hover:bg-[#1877F2] hover:text-white transition-colors" aria-label="Share on Facebook">
						<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
							<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
						</svg>
					</button>
					<button className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center text-text-secondary hover:bg-[#1DA1F2] hover:text-white transition-colors" aria-label="Share on Twitter">
						<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
							<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
						</svg>
					</button>
					<button 
						onClick={handleCopyLink}
						className={cn(
							"w-8 h-8 rounded-full flex items-center justify-center transition-colors",
							copied ? "bg-success text-white" : "bg-surface-2 text-text-secondary hover:bg-primary hover:text-white"
						)}
						aria-label="Copy Link"
						title={isRtl ? "نسخ الرابط" : "Copy Link"}
					>
						{copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
					</button>
				</div>
			</div>

		</div>
	);
};

export default ProductMeta;
