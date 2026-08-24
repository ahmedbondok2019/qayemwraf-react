import React from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { THEMES } from "@/constants/theme";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ThemeSwitcher Component
 * Cycles between Light → Dark → System.
 * Persists choice in localStorage via ThemeProvider.
 * Supports RTL/LTR and Light/Dark.
 */
export const ThemeSwitcher = ({ variant = "default", className }) => {
	const { theme, toggleTheme } = useTheme();

	const themeConfig = {
		[THEMES.LIGHT]: { icon: Sun, label: "Light" },
		[THEMES.DARK]: { icon: Moon, label: "Dark" },
		[THEMES.SYSTEM]: { icon: Monitor, label: "System" },
	};

	const current = themeConfig[theme] || themeConfig[THEMES.SYSTEM];
	const Icon = current.icon;

	return (
		<button
			onClick={toggleTheme}
			className={cn(
				"inline-flex items-center justify-center transition-colors duration-150 cursor-pointer select-none rounded-md focus-visible:ring-2 focus-visible:ring-ring/50 outline-none",
				variant === "announcement"
					? "text-white/90 hover:text-white p-1.5"
					: "text-text-secondary hover:text-primary p-1.5 hover:bg-surface-2",
				className
			)}
			aria-label={`Toggle theme. Current: ${current.label}`}
			title={current.label}
		>
			<Icon className="w-4 h-4" />
		</button>
	);
};

export default ThemeSwitcher;
