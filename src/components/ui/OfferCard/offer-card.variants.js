import { cva } from "class-variance-authority";

/**
 * OfferCard CVA Variant configurations
 * Strictly utilizes design tokens (bg-surface, text-text, border-border, etc.)
 */
export const offerCardVariants = cva(
	"group relative flex flex-col w-full h-full rounded-3xl overflow-hidden transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none",
	{
		variants: {
			variant: {
				default:
					"bg-surface border border-border/70 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-primary/50 dark:hover:border-primary/50 hover:-translate-y-1.5",
				featured:
					"bg-surface border-2 border-primary/60 shadow-md hover:shadow-2xl hover:border-primary hover:-translate-y-1.5 ring-1 ring-primary/20",
				minimal:
					"bg-surface/70 backdrop-blur-sm border border-border/50 hover:bg-surface hover:shadow-lg hover:-translate-y-1",
			},
			size: {
				default: "p-0",
				compact: "p-0 text-sm",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export const badgeVariants = cva(
	"inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm",
	{
		variants: {
			type: {
				flash: "bg-danger text-white shadow-danger/25 animate-pulse",
				special: "bg-primary text-primary-foreground shadow-primary/20",
				neutral:
					"bg-background/90 dark:bg-slate-900/90 text-text-secondary backdrop-blur-sm border border-border/60",
			},
		},
		defaultVariants: {
			type: "special",
		},
	}
);
