export const env = {
	apiUrl: import.meta.env.VITE_API_URL || "https://api.eg-medical.com",
	nodeEnv: import.meta.env.MODE || "development",
};

export default env;
