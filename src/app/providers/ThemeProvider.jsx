import { createContext, useContext, useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/constants/storage";
import { THEMES } from "@/constants/theme";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(
		() => localStorage.getItem(STORAGE_KEYS.THEME) || THEMES.SYSTEM
	);

	useEffect(() => {
		const root = window.document.documentElement;
		
		const applyTheme = (themeValue) => {
			root.classList.remove(THEMES.LIGHT, THEMES.DARK);
			if (themeValue === THEMES.SYSTEM) {
				const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
					? THEMES.DARK
					: THEMES.LIGHT;
				root.classList.add(systemTheme);
			} else {
				root.classList.add(themeValue);
			}
		};

		applyTheme(theme);
		localStorage.setItem(STORAGE_KEYS.THEME, theme);

		// Listen to system preference changes if 'system' is chosen
		if (theme === THEMES.SYSTEM) {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			const handleChange = (e) => {
				root.classList.remove(THEMES.LIGHT, THEMES.DARK);
				root.classList.add(e.matches ? THEMES.DARK : THEMES.LIGHT);
			};

			mediaQuery.addEventListener("change", handleChange);
			return () => mediaQuery.removeEventListener("change", handleChange);
		}
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => {
			if (prev === THEMES.SYSTEM) return THEMES.DARK;
			if (prev === THEMES.DARK) return THEMES.LIGHT;
			return THEMES.SYSTEM;
		});
	};

	return (
		<ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

export default ThemeProvider;
