import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/react-query/queryClient";

export const QueryProvider = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
};

export default QueryProvider;

