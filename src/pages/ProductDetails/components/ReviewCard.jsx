import React from "react";
import { useLanguage } from "@/app/providers/I18nProvider";
import { Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const ReviewCard = ({ review }) => {
	const { language } = useLanguage();
	const isRtl = language === "ar";

	return (
		<div className="p-6 bg-surface rounded-2xl border border-border/50 hover:shadow-sm transition-shadow">
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
						{review.user?.[0]?.toUpperCase()}
					</div>
					<div>
						<h4 className="font-bold text-text flex items-center gap-2">
							{review.user}
							{review.verified && (
								<CheckCircle2 className="w-4 h-4 text-success" />
							)}
						</h4>
						<span className="text-xs text-text-muted">{review.date}</span>
					</div>
				</div>
				<div className="flex items-center">
					{Array.from({ length: 5 }).map((_, i) => (
						<Star 
							key={i} 
							className={cn(
								"w-4 h-4", 
								i < review.rating 
									? "fill-warning text-warning" 
									: "fill-border text-border"
							)} 
						/>
					))}
				</div>
			</div>
			
			{review.title && (
				<h5 className="font-bold text-text mb-2">{review.title[language] || review.title}</h5>
			)}
			
			<p className="text-text-secondary text-sm leading-relaxed">
				{review.comment[language] || review.comment}
			</p>
		</div>
	);
};

export default ReviewCard;
