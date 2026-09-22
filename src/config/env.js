export const env = {
	apiUrl: import.meta.env.VITE_API_URL || "https://admin.qayemwraf.com/api/v1",
	nodeEnv: import.meta.env.MODE || "development",
};

export default env;
