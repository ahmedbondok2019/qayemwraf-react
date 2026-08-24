import ReduxProvider from "./ReduxProvider";
import QueryProvider from "./QueryProvider";
import ThemeProvider from "./ThemeProvider";
import I18nProvider from "./I18nProvider";

export const AppProviders = ({ children }) => {
	return (
		<ReduxProvider>
			<QueryProvider>
				<ThemeProvider>
					<I18nProvider>
						{children}
					</I18nProvider>
				</ThemeProvider>
			</QueryProvider>
		</ReduxProvider>
	);
};

export default AppProviders;
